

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import MainContainer from '../../components/MainContainer';
import { Colors } from '../../utilities/colors';
import CustomTextInput from '../../components/CustomTextInput';
import HorizontalDashComponent from '../../components/HorizontalDashComponent';
import CustomButton from '../../components/CustomButton';
// import Logo from "../../assets/svg/Logo.svg";
import Logo from "../../assets/logo.png"
import { Formik } from 'formik';
import { LoginSchema } from '../../utilities/schemas/authentication';
import { useLoginUserMutation } from '../../redux/features/auth/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/features/auth/authSlice';
import ROUTES from '../../Navigation/routes';
import StatusModal from '../../components/StatusModal';

const LoginScreen = ({ navigation }) => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: "" });
  const handleCloseModal = () => {
    setModalAlertVisible(false);
  };

  const { full_name, phone, token, id } = useSelector(state => state.userAuth);
  console.log(full_name, phone, id, token)

  const handleSignIn = async (values) => {
    try {
      console.log("Attempting to log in with values:", values);
      const response = await loginUser(values).unwrap();
      console.log("Login response:", response);

      if (response?.message === "login successful") {
        console.log("tokenssss", response.token)
        const user = {
          token: response.token,
          phone: response.user.phone_number,
          email: response.user.email,
          full_name: response.user.name,
          id: response.user.id,
        };

        console.log("User object:", user);

        dispatch(updateUser(user));
        await AsyncStorage.setItem('token', response.token);
        setModalContent({
          icon: 'checkmark-circle-outline',
          message: 'You have successfully logged in!',
          buttonColor: Colors.Orange,
          iconColor: Colors.Orange
        });
        setModalAlertVisible(true);

        setTimeout(() => {
          // navigation.navigate(ROUTES.MAIN);
          navigation.navigate(ROUTES.MAIN)
      }, 1000);
      } else {
        setModalContent({
          icon: 'close-circle-outline',
          message: 'We noticed that your username and password dont match.',
          buttonColor: Colors.Orange,
          iconColor: Colors.Orange
        });
        setModalAlertVisible(true);
      }
    } catch (error) {
      console.error("Login error", error);
      setModalContent({
        icon: 'close-circle-outline',
        message: error?.data?.message || error || 'An unexpected error occurred',
        buttonColor: Colors.Orange,
        iconColor: Colors.Orange
      });
      setModalAlertVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <MainContainer>
        {/* <View style={styles.Logo}>
          <Logo width={100} height={100} />
        </View> */}

        <View style={styles.Logo}>
          <Image 
            source={Logo} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.Heading}>Welcome Back</Text>

        <Formik
          validationSchema={LoginSchema}
          validateOnMount={false}
          validateOnChange={true}
          validateOnBlur={true}
          initialValues={{ login: '', password: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log("Form values", values);
            await handleSignIn(values);
            setSubmitting(false);
          }}
        >
          {({ values, isValid, errors, handleChange, handleSubmit, isSubmitting }) => (
            <>
              <CustomTextInput
                label="Phone Number"
                type="number"
                value={values.login}
                isInvalid={!!errors.login}
                onChangeText={handleChange('login')}
                error={errors.login}
              />
              <CustomTextInput
                label="Password"
                type="password"
                value={values.password}
                isInvalid={!!errors.password}
                onChangeText={handleChange('password')}
                error={errors.password}
              />

              <View style={styles.bottomContainer}>
                <CustomButton
                  title={isLoading ? 'Processing...' : 'Sign In'}
                  backgroundColor={Colors.Orange}
                  borderColor={Colors.Orange}
                  color={Colors.White}
                  onPress={handleSubmit}
                  isLoading={isLoading}
                // isDisabled={!isValid}
                />
                <HorizontalDashComponent text="Or" />
                <CustomButton
                  title="Create An Account"
                  backgroundColor={Colors.White}
                  borderColor={Colors.Orange}
                  color={Colors.Orange}
                  onPress={() => navigation.navigate(ROUTES.SIGN_UP_SCREEN)}
                />

                {/* <View style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPasswordText}>Forget Password?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate(ROUTES.RESET_PASSWORD)}>
                    <Text style={[styles.forgotPasswordText, { color: Colors.Orange }]}> Reset Password</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </>
          )}
        </Formik>
        <StatusModal
          visible={modalAlertVisible}
          onClose={handleCloseModal}
          icon={modalContent.icon}
          message={modalContent.message}
          buttonColor={modalContent.buttonColor}
          iconColor={modalContent.iconColor}
        />
      </MainContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  // Logo: {
  //   alignSelf: "center",
  //   marginVertical: 20,
  // },
   Logo: {
    alignSelf: "center",
    marginVertical: 20,
  },
  logoImage: {
    width: 120,          
    height: 120,          
  },
  Heading: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "Poppins",
    color: Colors.Black_00,
  },
  bottomContainer: {
    marginTop: 50,
    backgroundColor: Colors.White,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.Black,
    marginRight: 5,
  },
});

export default LoginScreen;








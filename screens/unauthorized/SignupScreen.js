
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import MainContainer from '../../components/MainContainer';
import { Colors } from '../../utilities/colors';
import CustomTextInput from '../../components/CustomTextInput';
import HorizontalDashComponent from '../../components/HorizontalDashComponent';
import CustomButton from '../../components/CustomButton';
import ROUTES from '../../Navigation/routes';
import { Formik } from 'formik';
import { useLoginUserMutation, useSignUpMutation } from '../../redux/features/auth/authApi';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/features/auth/authSlice';
import { LoginSchema } from '../../utilities/schemas/authentication';
import StatusModal from '../../components/StatusModal';

const SignupScreen = ({ navigation }) => {
  const [signupUser, { isLoading }] = useSignUpMutation();
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: "" });
  const handleCloseModal = () => {
    setModalAlertVisible(false);
  };

  const SignupSchema = Yup.object().shape({
    full_name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSignUp = async (values) => {
    const user = {
      email: values.email,
      full_name: values.full_name,
      phone_number: values.phone,
      password: values.password,
    };

    try {
      const response = await signupUser(user).unwrap();
      if (response?.message === 'User Created') {
        setModalContent({
          icon: 'checkmark-circle-outline',
          message: 'You have successfully signed up.',
          buttonColor: Colors.Orange,
          iconColor: Colors.Orange
      });
      setModalAlertVisible(true);
        navigation.navigate(ROUTES.LOGIN_SCREEN);
      } else {
        setModalContent({
          icon: 'close-circle-outline',
          message: 'An error occurred during signup. Please try again.',
          buttonColor: Colors.Orange,
          iconColor:Colors.Orange
        });
        setModalAlertVisible(true);
      }
    } catch (error) {
      console.error('Signup error', error);
      setModalContent({
        icon: 'close-circle-outline',
        message: error?.data?.message || 'An unexpected error occurred',
        buttonColor: Colors.Orange,
        iconColor:Colors.Orange
      });
      setModalAlertVisible(true);
    } finally {
      setSubmitting(false);
    }
  };





  return (
    <MainContainer>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.Heading}>Create an account</Text>

        <Formik
          initialValues={{ full_name: '', email: '', phone: '', password: '' }}
          validationSchema={SignupSchema}
          validateOnMount={false}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={handleSignUp}
        // onSubmit={async (values, { setSubmitting }) => {
        //   await handleSignUp(values);
        //   setSubmitting(false);
        // }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting, isValid }) => (
            <>
              <CustomTextInput
                label="Full name"
                type="name"
                value={values.full_name}
                isInvalid={!!errors.full_name}
                onChangeText={handleChange('full_name')}
                error={errors.full_name}
              />
              <CustomTextInput
                label="Email"
                type="email"
                value={values.email}
                isInvalid={!!errors.email}
                onChangeText={handleChange('email')}
                error={errors.email}
              />
              <CustomTextInput
                label="Phone Number"
                type="number"
                value={values.phone}
                isInvalid={!!errors.phone}
                onChangeText={handleChange('phone')}
                // onChangeFormattedText={handleChange('phone')}
                error={errors.phone}
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
                  title={isLoading ? 'Creating Account...' : 'Create an Account'}
                  backgroundColor={Colors.Orange}
                  borderColor={Colors.Orange}
                  color={Colors.White}
                  onPress={handleSubmit}
                  isLoading={isLoading}
                />
                <HorizontalDashComponent text="Or" />
                <CustomButton
                  title="Sign In"
                  backgroundColor={Colors.White}
                  borderColor={Colors.Orange}
                  color={Colors.Orange}
                  onPress={() => navigation.navigate(ROUTES.LOGIN_SCREEN)}
                />
              </View>
            </>
          )}
        </Formik>

      </ScrollView>

      <StatusModal
        visible={modalAlertVisible}
        onClose={handleCloseModal}
        icon={modalContent.icon}
        message={modalContent.message}
        buttonColor={modalContent.buttonColor}
        iconColor={modalContent.iconColor}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  heading: {
    color: Colors.Black_00,
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 20,
    paddingTop: 40,
  },
  Heading: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "Poppins",
    color: Colors.Black_00,
    paddingBottom: 20,
    paddingTop: 40,
  },
  bottomContainer: {
    marginTop: 70,
    backgroundColor: Colors.White,
  },
});

export default SignupScreen;

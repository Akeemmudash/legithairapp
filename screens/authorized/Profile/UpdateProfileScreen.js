
import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import MainContainer from '../../../components/MainContainer';
import Back from '../../../components/Back';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import { Colors } from '../../../utilities/colors';
import { useUpdateProfileMutation } from '../../../redux/features/profile/profileApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../redux/features/auth/authSlice';
import StatusModal from '../../../components/StatusModal';
import { useTranslate } from '../../../utilities/hooks/useTranslate';

const UpdateProfileScreen = ({ navigation }) => {
    const { full_name, phone, email } = useSelector(state => state.userAuth);
    const dispatch = useDispatch()
    const [name, setName] = useState(full_name);
    const [phone_number, setPhoneNumber] = useState(phone);
    const [Email, setEmail] = useState(email);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const texts = [
        "Update Your Profile",
        "Update Profile",
        "Updating...",
        "Proceed"
      ];
    
      const translate = useTranslate(texts);
    
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: "" });
  const handleCloseModal = () => {
      setModalAlertVisible(false);
    };

    useEffect(() => {
        setName(full_name);
        setPhoneNumber(phone);
        setEmail(email);
    }, [full_name, phone, email]);

    const handleUpdateProfile = async () => {
        try {
            const result = await updateProfile({ name, phone_number, email: Email }).unwrap();
            setModalContent({
                icon: 'checkmark-circle-outline',
                message: 'Profile updated successfully.',
                buttonColor: Colors.Orange,
                iconColor: Colors.Orange
            });
            setModalAlertVisible(true);
            if (result?.message === "success") {
                const user = {
                    phone: phone_number,
                    email: email,
                    full_name: name,
                };


                dispatch(updateUser(user));
            } else {
                setModalContent({
                    icon: 'close-circle-outline',
                    message: 'We noticed that your username and password dont match.',
                    buttonColor: Colors.Orange,
                    iconColor:Colors.Orange
                  });
                  setModalAlertVisible(true);
            }
        } catch (error) {
            setModalContent({
                icon: 'close-circle-outline',
                message: error.data?.message || "An error occurred while updating the profile.",
                buttonColor: Colors.Orange,
                iconColor:Colors.Orange
              });
              setModalAlertVisible(true);
        }
    };

    return (
        <MainContainer>
            <Back title={translate("Update Profile")} />
            <View>
                <Text style={styles.Heading}>{translate("Update Your Profile")}</Text>

                <CustomTextInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                />
                <CustomTextInput
                    label="Phone"
                    value={phone_number}
                    onChangeText={setPhoneNumber}
                />
                <CustomTextInput
                    label="Email"
                    value={Email}
                    onChangeText={setEmail}
                />

                <CustomButton
                    title={isLoading ? "Updating..." : "Proceed"}
                    backgroundColor={Colors.Orange}
                    borderColor={Colors.Orange}
                    color={Colors.White}
                    onPress={handleUpdateProfile}
                    disabled={isLoading}
                />
            </View>
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

export default UpdateProfileScreen;

const styles = StyleSheet.create({
    Heading: {
        color: Colors.Black_00,
        fontSize: 24,
        fontWeight: "600",
        paddingBottom: 0,
        fontFamily: "Poppins"
    },
    Sub: {
        color: Colors.Gray,
        fontSize: 14,
        fontWeight: "400",
        paddingBottom: 30,
    },
});


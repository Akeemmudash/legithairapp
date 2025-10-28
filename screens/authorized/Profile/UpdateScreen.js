

import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import MainContainer from '../../../components/MainContainer';
import Back from '../../../components/Back';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import { Colors } from '../../../utilities/colors';
import { useUpdatePasswordMutation } from '../../../redux/features/profile/profileApi';
import { useSelector } from 'react-redux';
import StatusModal from '../../../components/StatusModal';
import { useTranslate } from '../../../utilities/hooks/useTranslate';

const UpdateScreen = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
    const { full_name, phone, email } = useSelector(state => state.userAuth);
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ icon: '', message: '', buttonColor: '', iconColor: '' });

    const texts = [
        "Create New Password",
        "Please enter your old password to complete this request for password update.",
        "Old Password",
        "New Password",
        "Confirm Password",
        'New Password and Confirm Password do not match.',
        'Password updated successfully!',
        "An error occurred while updating the password."
    ];

    const translate = useTranslate(texts);

    const handleCloseModal = () => {
        setModalAlertVisible(false);
    };

    const handleUpdatePassword = async () => {
        if (password !== confirmPassword) {
            setModalContent({
                icon: 'close-circle-outline',
                message: translate('New Password and Confirm Password do not match.'),
                buttonColor: Colors.Orange,
                iconColor: Colors.Orange
            });
            setModalAlertVisible(true);
            return;
        }

        try {
            const result = await updatePassword({ oldpassword: oldPassword, newpassword: password }).unwrap();
            setModalContent({
                icon: 'checkmark-circle-outline',
                message: translate('Password updated successfully!'),
                buttonColor: Colors.Orange,
                iconColor: Colors.Orange
            });
            setModalAlertVisible(true);
            navigation.goBack();
        } catch (error) {
            setModalContent({
                icon: 'close-circle-outline',
                message: error.data?.message || translate("An error occurred while updating the password."),
                buttonColor: Colors.Orange,
                iconColor: Colors.Orange
            });
            setModalAlertVisible(true);
            Alert.alert("Error", error.data?.message || "An error occurred while updating the password.");
        }
    };

    // Function to check if all fields are filled
    const isButtonDisabled = !oldPassword || !password || !confirmPassword || isLoading;

    return (
        <MainContainer>
            <Back title={"Change Password"} />
            <View>
                <Text style={styles.Heading}>{translate("Create New Password")}</Text>
                <Text style={styles.Sub}>{translate("Please enter your old password to complete this request for password update.")}</Text>
                <CustomTextInput
                    label={translate("Old Password")}
                    type="password"
                    value={oldPassword}
                    onChangeText={setOldPassword}
                />
                <CustomTextInput
                    label={translate("New Password")}
                    type="password"
                    value={password}
                    onChangeText={setPassword}
                />
                <CustomTextInput
                    label={translate("Confirm Password")}
                    type="password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <CustomButton
                    title={isLoading ? "Updating..." : "Proceed"}
                    backgroundColor={Colors.Orange}
                    borderColor={Colors.Orange}
                    color={Colors.White}
                    onPress={handleUpdatePassword}
                    disabled={isButtonDisabled} // Disable button if any field is empty or if loading
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
}

export default UpdateScreen;

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
        fontFamily: "Poppins"
    },
});


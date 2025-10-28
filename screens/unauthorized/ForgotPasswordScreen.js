import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '../../components/MainContainer'
import { Colors } from '../../utilities/colors'
import CustomButton from '../../components/CustomButton'
import ROUTES from '../../Navigation/routes'
import CustomTextInput from '../../components/CustomTextInput';
import Back from '../../components/Back'

const ForgotPasswordScreen = ({ navigation }) => {


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    return (
        <MainContainer>
            <Back title={"Forgot Password"}/>
            <View>
                <Text style={styles.Heading}>Create New Password</Text>
                <Text style={styles.Sub}>Please type the ForgotPasswordScreen code sent to phone number</Text>

                <CustomTextInput
                    label="New Password"
                    type="password"
                    value={password}
                    onChangeText={setPassword}
                />
                <CustomTextInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                

                <CustomButton
                    title={"Proceed"}
                    backgroundColor={Colors.Orange}
                    borderColor={Colors.Orange}
                    color={Colors.White}
                    onPress={() => navigation.navigate(ROUTES.SIGN_UP_SCREEN)}
                />

            </View>




        </MainContainer>
    )
}

export default ForgotPasswordScreen


const styles = StyleSheet.create({
    Logo: {
        alignSelf: "center",
        alignContent: "center",
        margin: 20
    },

    Heading: {
        color: Colors.Black_00,
        fontSize: 24,
        fontWeight: "600",
        paddingBottom: 0
    },
    Sub: {
        color: Colors.Gray,
        fontSize: 14,
        fontWeight: "400",
        paddingBottom: 30

    },
})
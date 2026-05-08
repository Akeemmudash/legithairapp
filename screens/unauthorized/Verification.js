import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '../../components/MainContainer'
import { Colors } from '../../utilities/colors'
import { OtpInput } from "react-native-otp-entry";
import CustomButton from '../../components/CustomButton'
import ROUTES from '../../Navigation/routes'
import Logo from "../../assets/svg/Logo.svg"
import Back from '../../components/Back';

const Verification = ({ navigation }) => {


    const [phone, setPhone] = useState('');


    return (
        <MainContainer>

            <TouchableOpacity style={{ width: 50, height: 50, padding: 10, backgroundColor: Colors.White, elevation: 3, borderRadius: 8 }}>
                <Back />
            </TouchableOpacity>

            <View style={styles.Content}>
                <Text style={styles.Heading}>Verirfication Code</Text>
                <Text style={styles.Sub}>Please type the verification code sent to phone number</Text>

                <OtpInput
                    numberOfDigits={4}
                    focusColor={Colors.Orange}
                    focusStickBlinkingDuration={500}
                    textInputProps={{
                        accessibilityLabel: "One-Time Password",
                    }}
                    theme={{
                        pinCodeContainerStyle: {
                            backgroundColor: Colors.White,
                            borderColor: Colors.Orange,
                            borderWidth: 1,
                            width: 65,
                            height: 65,
                        }
                    }}
                />

                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: Colors.Black, fontFamily: "Poppins"}}>I don’t recevie a code! </Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 14, fontWeight: 500, color: Colors.Orange, fontFamily: "Poppins" }}>Please resend</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: 10 }} />

                <CustomButton
                    title={"Proceed"}
                    backgroundColor={Colors.Orange}
                    borderColor={Colors.Orange}
                    color={Colors.White}
                    onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
                />

            </View>




        </MainContainer>
    )
}

export default Verification


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
    Content: {
        flex: 1,
        justifyContent: 'center',
    },
})
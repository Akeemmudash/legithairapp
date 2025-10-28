import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '../../components/MainContainer'
import { Colors } from '../../utilities/colors'
import CustomTextInput from '../../components/CustomTextInput'
import HorizontalDashComponent from '../../components/HorizontalDashComponent'
import CustomButton from '../../components/CustomButton'
import ROUTES from '../../Navigation/routes'
import Logo from "../../assets/svg/Logo.svg"
import Back from "../../components/Back"

const ResetPassword = ({ navigation }) => {


    const [phone, setPhone] = useState('');


    return (
        <MainContainer>
            <TouchableOpacity style={{ width: 50, height: 50,padding: 10, backgroundColor: Colors.White, elevation: 3, borderRadius: 8 }}>
                <Back />
            </TouchableOpacity>
            <View style={styles.Content}>
                <Text style={styles.Heading}>Reset Pasword</Text>
                <Text style={styles.Sub}>Please enter your email address to request a password reset</Text>

                <CustomTextInput
                    label=" Enter Phone Number"
                    type="phone"
                    value={phone}
                    onChangeText={setPhone}
                />

                <View style={{ padding: 10 }} />

                <CustomButton
                    title={"Send Code"}
                    backgroundColor={Colors.Orange}
                    borderColor={Colors.Orange}
                    color={Colors.White}
                    onPress={() => navigation.navigate(ROUTES.VERIFICATION)}
                />

            </View>




        </MainContainer>
    )
}

export default ResetPassword


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
    Content: {
        flex: 1,
        justifyContent: 'center',
    },
})
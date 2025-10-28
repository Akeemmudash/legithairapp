
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import HorizontalDashComponent from '../../components/HorizontalDashComponent';
import { Colors } from '../../utilities/colors';
import CustomButton from '../../components/CustomButton';
import ROUTES from '../../Navigation/routes';

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/bcg.jpg')}
                style={styles.backgroundImage}
            >
                <LinearGradient
                    colors={['rgba(245, 174, 95, 0.9)', 'rgba(255, 150, 46, 0.5)', 'rgba(255, 150, 46, 0)']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.overlay}
                />
                <View style={styles.content}>
                    <Text style={styles.Text}>Welcome to</Text>
                    <Text style={styles.subText2}>LEGIT HAIR NG</Text>
                    <Text style={styles.subText}>Your favorite hair plug that delivers fast to your door.</Text>
                </View>

                <View style={{ padding: 20 }}>
                    <HorizontalDashComponent text="Proceed with" />
                    <CustomButton
                        title={"Sign In"}
                        backgroundColor={Colors.White}
                        borderColor={Colors.White}
                        color={Colors.Orange}
                        onPress={() => navigation.navigate(ROUTES.LOGIN_SCREEN)}
                    />
                    <CustomButton
                        title={"Sign Up"}
                        backgroundColor={Colors.Orange}
                        borderColor={Colors.Orange}
                        color={Colors.White}
                        onPress={() => navigation.navigate(ROUTES.SIGN_UP_SCREEN)}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        flex: 1,
        padding: 20
    },
    welcomeText: {
        fontSize: 48,
        color: Colors.Black,
        fontWeight: '700',
        paddingTop: 140,
        fontFamily: "Poppins", 
    },
    Text: {
        fontSize: 48,
        color: Colors.Orange,
        fontWeight: '600',
        fontFamily: "Poppins", 
        paddingTop: 140
    },
    subWelcomeText: {
        fontSize: 48,
        color: Colors.Orange,
        fontWeight: '700',
        fontFamily: "Poppins",
    },
    subText: {
        fontSize: 18,
        color: Colors.Black,
        fontWeight: '600',
        fontFamily: "Poppins", 
    },
    subText2: {
        fontSize: 48,
        color: Colors.Orange,
        fontWeight: '600',
        fontFamily: "Poppins", 
    },
    horizontalDash: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
});

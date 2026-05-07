// import React from 'react';
// import { View, Text, TextInput, StyleSheet } from 'react-native';
// import PhoneNumberInput from 'react-native-phone-number-input';
// import { Colors } from '../utilities/colors';

// const CustomTextInput = ({ label, type, value, onChangeText, onChangeFormattedText }) => {
//     const renderInput = () => {
//         switch (type) {
//             case 'email':
//                 return (
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={onChangeText}
//                         value={value}
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                         selectionColor={Colors.Black}
//                     />
//                 );
//             case 'phone':
//                 return (
//                     <PhoneNumberInput
//                         defaultCode="NG"
//                         layout="first"
//                         onChangeFormattedText={onChangeFormattedText}
//                         value={value}
//                         containerStyle={styles.phoneInputContainer}
//                         textContainerStyle={styles.phoneInputTextContainer}
//                         textInputStyle={styles.phoneInputText}
//                         codeTextStyle={styles.phoneInputCodeText}
//                         flagButtonStyle={styles.phoneInputFlagButton}
//                         placeholder=""
//                         textInputProps={{ selectionColor: Colors.Black }}
//                     />
//                 );
//             case 'name':
//                 return (
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={onChangeText}
//                         value={value}
//                         autoCapitalize="words"
//                         selectionColor={Colors.Black}
//                     />
//                 );
//             case 'number':
//                 return (
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={onChangeText}
//                         value={value}
//                         autoCapitalize="number"
//                         selectionColor={Colors.Black}
//                     />
//                 );
//             case 'password':
//                 return (
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={onChangeText}
//                         value={value}
//                         secureTextEntry
//                         selectionColor={Colors.Black}
//                     />
//                 );
//             default:
//                 return (
//                     <TextInput
//                         style={styles.input}
//                         onChangeText={onChangeText}
//                         value={value}
//                         selectionColor={Colors.Black}
//                     />
//                 );
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.label}>{label}</Text>
//             {renderInput()}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginVertical: 10,
//     },
//     label: {
//         fontSize: 12,
//         fontWeight: "400",
//         color: Colors.Gray,
//         marginBottom: 5,
//         fontFamily: "Poppins"
//     },
//     input: {
//         height: 60,
//         borderColor: Colors.Orange,
//         borderWidth: 1,
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         backgroundColor: Colors.White,
//         fontFamily: "Poppins"
//     },
//     phoneInputContainer: {
//         borderColor: Colors.Orange,
//         borderWidth: 1,
//         borderRadius: 5,
//         backgroundColor: Colors.White,
//         width: "100%"
//     },
//     phoneInputTextContainer: {
//         backgroundColor: Colors.White,
//         paddingVertical: 0,
//         paddingHorizontal: 7,
//         borderRadius: 5,
//         width: "100%"
//     },
//     phoneInputText: {
//         height: 60,
//         color: Colors.Black,
//         fontFamily: "Poppins"
//     },
//     phoneInputCodeText: {
//         color: Colors.Black,
//         fontFamily: "Poppins"
//     },
//     phoneInputFlagButton: {
//         paddingHorizontal: 10,
//     },
// });

// export default CustomTextInput;



import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PhoneNumberInput from 'react-native-phone-number-input';
import { Colors } from '../utilities/colors';

const CustomTextInput = ({ label, type, value, onChangeText, onChangeFormattedText, isInvalid, error }) => {
    const inputStyle = [styles.input, isInvalid && styles.inputError];

    const renderInput = () => {
        switch (type) {
            case 'email':
                return (
                    <TextInput
                        style={inputStyle}
                        onChangeText={onChangeText}
                        value={value}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        selectionColor={Colors.Black}
                    />
                );
            case 'phone':
                return (
                    <PhoneNumberInput
                        defaultCode="NG"
                        layout="first"
                        onChangeFormattedText={onChangeFormattedText}
                        value={value}
                        containerStyle={[styles.phoneInputContainer, isInvalid && styles.inputError]}
                        textContainerStyle={styles.phoneInputTextContainer}
                        textInputStyle={styles.phoneInputText}
                        codeTextStyle={styles.phoneInputCodeText}
                        flagButtonStyle={styles.phoneInputFlagButton}
                        placeholder=""
                        textInputProps={{ selectionColor: Colors.Black }}
                    />
                );
            case 'name':
                return (
                    <TextInput
                        style={inputStyle}
                        onChangeText={onChangeText}
                        value={value}
                        autoCapitalize="words"
                        selectionColor={Colors.Black}
                    />
                );
            case 'number':
                return (
                    <TextInput
                        style={inputStyle}
                        onChangeText={onChangeText}
                        value={value}
                        keyboardType="phone-pad"
                        selectionColor={Colors.Black}
                    />
                );
            case 'password':
                return (
                    <TextInput
                        style={inputStyle}
                        onChangeText={onChangeText}
                        value={value}
                        secureTextEntry
                        selectionColor={Colors.Black}
                    />
                );
            default:
                return (
                    <TextInput
                        style={inputStyle}
                        onChangeText={onChangeText}
                        value={value}
                        selectionColor={Colors.Black}
                    />
                );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {renderInput()}
            {isInvalid && error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 12,
        fontWeight: "400",
        color: Colors.Gray,
        marginBottom: 5,
        fontFamily: "Poppins"
    },
    input: {
        height: 60,
        borderColor: Colors.Orange,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.White,
        fontFamily: "Poppins"
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        fontFamily: "Poppins",
    },
    phoneInputContainer: {
        borderColor: Colors.Orange,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: Colors.White,
        width: "100%"
    },
    phoneInputTextContainer: {
        backgroundColor: Colors.White,
        paddingVertical: 0,
        paddingHorizontal: 7,
        borderRadius: 5,
        width: "100%"
    },
    phoneInputText: {
        height: 60,
        color: Colors.Black,
        fontFamily: "Poppins"
    },
    phoneInputCodeText: {
        color: Colors.Black,
        fontFamily: "Poppins"
    },
    phoneInputFlagButton: {
        paddingHorizontal: 10,
    },
});

export default CustomTextInput;


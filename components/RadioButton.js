import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../utilities/colors';

const RadioButton = ({ label, value, selected, onPress }) => {
    return (
        <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
            <View style={[styles.radioButton, selected && styles.radioButtonSelected]} />
            <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
    );
};


export default RadioButton;

const styles= StyleSheet.create({
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.Orange,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        backgroundColor: Colors.Orange,
    },
    radioLabel: {
        fontSize: 12,
        marginLeft: 8,
        color: Colors.Black_00,
        fontWeight: "400",
        fontFamily: "Poppins"
    },
})

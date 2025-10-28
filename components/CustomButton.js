

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../utilities/colors';

const CustomButton = ({ title, onPress, backgroundColor, borderColor, color, disabled }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: backgroundColor, borderColor: borderColor },
                disabled && styles.disabledButton,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.subText, { color: color }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 40,
        borderWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
    subText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Poppins", 
    },
      disabledButton: {
        opacity: 0.6,
    },
});

export default CustomButton;

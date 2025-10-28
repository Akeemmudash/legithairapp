import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../utilities/colors';
const PlaceRadio = ({ selected, onPress }) => {
    return (
        <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
            <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
                {selected && <View style={styles.radioButtonInner} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    radioContainer: {
        marginRight: 10,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.Orange,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    radioButtonSelected: {
        borderColor:Colors.Orange 
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.Orange ,
    },
});

export default PlaceRadio;

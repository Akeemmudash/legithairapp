import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../utilities/colors';


const Back = ({title}) => {

    const navigation = useNavigation()


    return (
        <View style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
           <View style={{ flexDirection: "row", alignItems: "center" }}>
           <Ionicons style={{ marginRight: 10 }} size={25} name='chevron-back-outline' />
           <Text style={{color: Colors.Black_00, fontWeight: "600", fontSize: 14, fontFamily: "Poppins"}}>{title}</Text>
           </View>
            </TouchableOpacity>
        </View>
    )
}

export default Back
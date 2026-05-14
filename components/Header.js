
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Menu from "../assets/svg/Menu.svg";
import { Colors } from '../utilities/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = ({ onPress, Press }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: Colors.White, elevation: 3, borderRadius: 8 }}
        onPress={onPress}
      >
        <Menu />
      </TouchableOpacity>
      <TouchableOpacity onPress={Press} style={{ alignItems: "center" }}>
        <Ionicons name="person-outline" size={40} color={Colors.Orange} style={{ marginRight: 1 }} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;



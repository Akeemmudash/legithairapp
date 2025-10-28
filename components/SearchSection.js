

import { View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../utilities/colors';

const SearchSection = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleChangeText = (text) => {
        setSearchText(text);
        onSearch(text);
    };

    return (
        <View style={{ paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Colors.Orange, borderRadius: 40, padding: 7.5, backgroundColor: Colors.White, flex: 1, marginRight: 10 }}>
                <Ionicons name="search" size={25} color={Colors.Orange} style={{ marginLeft: 10, fontWeight: "bold", fontFamily: "Poppins" }} />
                <TextInput
                    placeholder="Find for food or restaurant..."
                    value={searchText}
                    onChangeText={handleChangeText}
                    placeholderTextColor={Colors.Ash}
                    style={{ flex: 1, color: Colors.Black, paddingVertical: 5, marginLeft: 10, fontFamily: "Poppins" }}
                />
            </View>
        </View>
    );
}

export default SearchSection;




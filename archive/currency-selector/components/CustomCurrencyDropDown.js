import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Dimensions, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../utilities/colors';

const { width } = Dimensions.get('window');

const CustomCurrencyDropDown = ({ label, options, selectedValue, onSelect }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelect = (value) => {
        onSelect(value);
        setIsVisible(false);
    };

    const filteredOptions = options.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setIsVisible(true)}
            >
                <Text style={styles.selectedValue}>{selectedValue || label}</Text>
                <Ionicons name="chevron-down" size={20} color={Colors.Gray} />
            </TouchableOpacity>
            {isVisible && (
                <Modal
                    transparent
                    animationType="slide"
                    visible={isVisible}
                    onRequestClose={() => setIsVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        onPress={() => setIsVisible(false)}
                    />
                    <View style={styles.modalContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        // backgroundColor: Colors.White,
        // elevation: 3,
        // borderRadius: 8, 
    },
    selectedValue: {
        fontSize: 16,
        color: Colors.Black,
        fontFamily: "Poppins"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        position: 'absolute',
        top: '30%',
        left: '5%',
        right: '5%',
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: Colors.Orange,
        borderWidth: 1,
        elevation: 5,
        maxHeight: 300,
    },
    searchInput: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.Gray,
        padding: 10,
        fontSize: 16,
        color: Colors.Black,
        fontFamily: "Poppins"
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Gray,
    },
    optionText: {
        fontSize: 16,
        color: Colors.Black,
        fontFamily: "Poppins"
    },
});

export default CustomCurrencyDropDown;

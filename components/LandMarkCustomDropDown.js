import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../utilities/colors';

const { width } = Dimensions.get('window');

const LandMarkCustomDropdown = ({ label, options, selectedValue, onSelect }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleSelect = (item) => {
        onSelect(item); // Pass the entire item object
        setIsVisible(false);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setIsVisible(true)}
            >
                <Text style={styles.selectedValue}>
                    {selectedValue ? `${selectedValue.landmark_name} - ${formatPrice(selectedValue.landmark_price)}` : label}
                </Text>
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
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.landmark_name}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.optionText}>
                                        {item.landmark_name} - {formatPrice(item.landmark_price)}
                                    </Text>
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
        borderWidth: 1,
        borderColor: Colors.Orange,
        borderRadius: 4,
        padding: 10,
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
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.Orange,

    },
    optionText: {
        fontSize: 16,
        color: Colors.Black,
        fontFamily: "Poppins"
    },
});

export default LandMarkCustomDropdown;


// import React, { useState } from 'react';
// import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { Colors } from '../utilities/colors';

// const { width } = Dimensions.get('window');

// const LandMarkCustomDropdown = ({ label, options, selectedValue, onValueChange }) => {
//     const [isVisible, setIsVisible] = useState(false);

//     const handleSelect = (item) => {
//         onValueChange(item); // Pass the entire item object
//         setIsVisible(false);
//     };

//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
//     };

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity
//                 style={styles.dropdown}
//                 onPress={() => setIsVisible(true)}
//             >
//                 <Text style={styles.selectedValue}>
//                     {selectedValue ? `${selectedValue.landmark_name} - ${formatPrice(selectedValue.landmark_price)}` : label}
//                 </Text>
//                 <Ionicons name="chevron-down" size={20} color={Colors.Gray} />
//             </TouchableOpacity>
//             {isVisible && (
//                 <Modal
//                     transparent
//                     animationType="slide"
//                     visible={isVisible}
//                     onRequestClose={() => setIsVisible(false)}
//                 >
//                     <TouchableOpacity
//                         style={styles.modalOverlay}
//                         onPress={() => setIsVisible(false)}
//                     />
//                     <View style={styles.modalContainer}>
//                         <FlatList
//                             data={options}
//                             keyExtractor={(item) => item.landmark_name}// Ensure the key is unique and a string
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity
//                                     style={styles.option}
//                                     onPress={() => handleSelect(item)}
//                                 >
//                                     <Text style={styles.optionText}>
//                                         {item.landmark_name} - {item.landmark_price}
//                                     </Text>
//                                 </TouchableOpacity>
//                             )}
//                         />
//                     </View>
//                 </Modal>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginVertical: 10,
//     },
//     dropdown: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         borderWidth: 1,
//         borderColor: Colors.Orange,
//         borderRadius: 4,
//         padding: 10,
//     },
//     selectedValue: {
//         fontSize: 16,
//         color: Colors.Black,
//         fontFamily: "Poppins"
//     },
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     modalContainer: {
//         position: 'absolute',
//         top: '30%',
//         left: '5%',
//         right: '5%',
//         backgroundColor: 'white',
//         borderRadius: 8,
//         borderColor: Colors.Orange,
//         borderWidth: 1,
//         elevation: 5,
//         maxHeight: 300,
//     },
//     option: {
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: Colors.Orange,

//     },
//     optionText: {
//         fontSize: 16,
//         color: Colors.Black,
//         fontFamily: "Poppins"
//     },
// });

// export default LandMarkCustomDropdown;

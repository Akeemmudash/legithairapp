
import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../utilities/colors';

// import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
// import { Colors } from "../utilities/colors";

// const StatusModal = ({ visible, onClose, icon, message, iconColor, buttonColor, }) => {
//     return (
//         <Modal
//             visible={visible}
//             transparent={true}
//             animationType="fade" 
//             onRequestClose={onClose}
//         >
//             <TouchableWithoutFeedback onPress={onClose}>
//                 <View style={styles.modalBackground}>
//                     <TouchableWithoutFeedback>
//                         <View style={[styles.modalContainer, { backgroundColor: Colors.White }]}>
//                             <Ionicons
//                                 name={icon}
//                                 size={50}
//                                 color={iconColor}
//                                 style={styles.modalIcon}
//                             />
//                             <Text style={styles.modalMessage}>{message}</Text>
//                             <Pressable
//                                 style={[styles.modalButton, { backgroundColor: buttonColor }]}
//                                 onPress={onClose}
//                             >
//                                 <Text style={[styles.modalButtonText, { color: Colors.White }]}>Okay</Text>
//                             </Pressable>
//                         </View>
//                     </TouchableWithoutFeedback>
//                 </View>
//             </TouchableWithoutFeedback>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     modalBackground: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
//     },
//     modalContainer: {
//         width: '80%', // Adjust width as needed
//         maxWidth: 300, // Maximum width of the modal
//         padding: 20,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     modalIcon: {
//         marginBottom: 20,
//     },
//     modalMessage: {
//         fontSize: 18,
//         color: Colors.Orange,
//         marginBottom: 20,
//         textAlign: 'center',
//         width: "70%",
//         fontFamily: "Poppins"
//     },
//     modalButton: {
//         paddingVertical: 5,
//         paddingHorizontal: 50,
//         borderRadius: 50,
//     },
//     modalButtonText: {
//         fontSize: 16,
//         fontWeight: '600',
//         fontFamily: "Poppins"
//     },
// });

// export default StatusModal;


const StatusModal = ({ visible, onClose, icon, message, iconColor, buttonColor }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade" 
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalContainer, { backgroundColor: Colors.White }]}>
                            <Ionicons
                                name={icon}
                                size={50}
                                color={iconColor}
                                style={styles.modalIcon}
                            />
                            {/* Ensure message is a string */}
                            <Text style={styles.modalMessage}>{typeof message === 'string' ? message : 'Unexpected message'}</Text>
                            <Pressable
                                style={[styles.modalButton, { backgroundColor: buttonColor }]}
                                onPress={onClose}
                            >
                                <Text style={[styles.modalButtonText, { color: Colors.White }]}>Okay</Text>
                            </Pressable>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '80%', // Adjust width as needed
        maxWidth: 300, // Maximum width of the modal
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalIcon: {
        marginBottom: 20,
    },
    modalMessage: {
        fontSize: 18,
        color: Colors.Orange,
        marginBottom: 20,
        textAlign: 'center',
        width: "70%",
        fontFamily: "Poppins"
    },
    modalButton: {
        paddingVertical: 5,
        paddingHorizontal: 50,
        borderRadius: 50,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "Poppins"
    },
});

export default StatusModal;

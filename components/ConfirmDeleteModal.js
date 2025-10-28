import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../utilities/colors';
import { useTranslate } from '../utilities/hooks/useTranslate';

const ConfirmDeleteModal = ({ visible, onClose, onConfirm }) => {

    const texts = [
        "Confirm Deletion",
        "Are you sure you want to delete your account?",
        "Cancel",
        "Yes, Delete"
      ];
    
      const translate = useTranslate(texts);
    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{translate("Confirm Deletion")}</Text>
                    <Text style={styles.modalMessage}>{translate("Are you sure you want to delete your account?")}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <TouchableOpacity style={[styles.button, { marginRight: 10 }]} activeOpacity={0.6} onPress={onClose} >
                            <Text style={{ fontFamily: "Poppins", fontSize: 15, color: Colors.White, textAlign: "center" }}>{translate("Cancel")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonCancel, { marginLeft: 10 }]} activeOpacity={0.6} onPress={onConfirm}>
                            <Text style={{ fontFamily: "Poppins", fontSize: 15, color: Colors.Orange, textAlign: "center" }}>{translate("Yes, Delete")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        fontFamily: "Poppins"
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        fontFamily: "Poppins"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        // paddingHorizontal: 10,
        width: "45%",
        height: 30,
        backgroundColor: Colors.Orange,
        borderRadius: 20,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 5
      },
      buttonCancel: {
        // paddingHorizontal: 10,
        width: "45%",
        height: 30,
        borderColor: Colors.Orange,
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 5
      },
});

export default ConfirmDeleteModal;

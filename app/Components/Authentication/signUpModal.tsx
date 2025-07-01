import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SignUpModalProps {
    visible: boolean;
    onClose: () => void;
    message: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
    visible,
    onClose,
    message,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#fff",
        paddingVertical: 24,
        paddingHorizontal: 32,
        borderRadius: 8,
        minWidth: 300,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    message: {
        marginBottom: 16,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default SignUpModal;

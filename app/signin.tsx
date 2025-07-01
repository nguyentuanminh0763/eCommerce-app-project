import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import SignUpModal from "./Components/Authentication/signUpModal";

type Props = {};

const SignInScreen = (props: Props) => {
<<<<<<< HEAD
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState({
        isShown: false,
        message: "",
        onclose: () => {},
    });
=======
  console.log('SignInScreen');
  
  return (
    <View style={styles.container}>
      <Text>SignIn Screen</Text>
      {/* <Link href={"/(tabs)"} asChild> */}
        <TouchableOpacity onPress={() => {
          router.dismissAll();
          router.push('/(tabs)');
        }}>
          <Text>Go to App Home Screen</Text>
        </TouchableOpacity>
      {/* </Link> */}
    </View>
  )
}
>>>>>>> feat/WelcomeScreen

    const handleLogin = () => {
        setShowModal({
            isShown: true,
            message: "Login successful!",
            onclose: () => {
                setShowModal({
                    isShown: false,
                    message: "",
                    onclose: () => {},
                });
                router.push("/(tabs)");
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {showModal.isShown && (
                <SignUpModal
                    onClose={showModal.onclose}
                    message={showModal.message}
                    visible={showModal.isShown}
                />
            )}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 32,
    },
    input: {
        width: "100%",
        maxWidth: 350,
        height: 48,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        width: "100%",
        maxWidth: 350,
        backgroundColor: "#007AFF",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

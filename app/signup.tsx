import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import SignUpModal from "./Components/Authentication/signUpModal";
import SocialButton from "./Components/partial/SocialButton";

type Props = {};

const SignUpScreen = (props: Props) => {
    const [showModal, setShowModal] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const handleSignUp = () => {
        if (password === confirmPassword) {
            setShowModal(true);
        } else {
            alert("Passwords do not match");
        }
    };
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "sign up",
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.back();
                            }}
                        >
                            <Ionicons
                                name="close"
                                size={24}
                                color={Colors.black}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        marginBottom: 20,
                    }}
                >
                    Sign Up Screen
                </Text>
                <TextInput
                    placeholderTextColor={Colors.gray}
                    placeholder="Email"
                    style={{
                        width: "80%",
                        borderWidth: 1,
                        borderColor: Colors.gray,
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 5,
                    }}
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                />
                <TextInput
                    placeholderTextColor={Colors.gray}
                    placeholder="Password"
                    secureTextEntry
                    style={{
                        width: "80%",
                        borderWidth: 1,
                        borderColor: Colors.gray,
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 5,
                    }}
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                />
                <TextInput
                    onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                    placeholderTextColor={Colors.gray}
                    placeholder="Confirm Password"
                    secureTextEntry
                    style={{
                        width: "80%",
                        borderWidth: 1,
                        borderColor: Colors.gray,
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 5,
                    }}
                />

                <TouchableOpacity
                    onPress={() => handleSignUp()}
                    style={{
                        backgroundColor: Colors.primary,
                        padding: 15,
                        borderRadius: 5,
                        width: "80%",
                        alignItems: "center",
                        marginTop: 10,
                    }}
                >
                    <Text style={{ color: Colors.white }}>
                        Create an account
                    </Text>
                </TouchableOpacity>
                {showModal && (
                    <SignUpModal
                        visible={showModal}
                        onClose={() => {
                            router.push("/signin");
                            setShowModal(false);
                        }}
                        message="Register successfully! Please check your email to verify your account."
                    />
                )}
                <View>
                    <Text style={{ marginTop: 20 }}>
                        Already have an account?{" "}
                        <Text
                            onPress={() => {
                                router.push("/signin");
                            }}
                            style={{ color: Colors.primary }}
                        >
                            Log in
                        </Text>
                    </Text>
                </View>
                <SocialButton />
            </View>
        </>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

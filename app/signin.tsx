import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUpModal from "./Components/Authentication/signUpModal";

type Props = {};

const SignInScreen = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState({
    isShown: false,
    message: "",
    onclose: () => {},
  });

const handleLogin = async () => {
  try {
    // 1. Lấy mảng users
    const res = await fetch("http://localhost:8000/users");
    if (!res.ok) throw new Error("Không lấy được danh sách users");
    const users: Array<{
      id: number;
      email: string;
      password: string;
      role: string;
      // ... các trường khác
    }> = await res.json();

    // 2. Tìm user khớp email + password
    const matched = users.find(u =>
      u.email === email.trim() && u.password === password
    );

    if (!matched) {
      // không tìm thấy
      setShowModal({
        isShown: true,
        message: "Email hoặc mật khẩu không đúng",
        onclose: () =>
          setShowModal({ isShown: false, message: "", onclose: () => {} }),
      });
      return;
    }

    // 3. Lưu thông tin và chuyển hướng
    await AsyncStorage.setItem("currentUser", JSON.stringify(matched));
    setShowModal({
      isShown: true,
      message: "Đăng nhập thành công!",
      onclose: () => {
        setShowModal({ isShown: false, message: "", onclose: () => {} });
        if (matched.role === "admin") {
          router.replace("/(admin_tabs)");
        } else {
          router.replace("/(tabs)");
        }
      },
    });
  } catch (err: any) {
    setShowModal({
      isShown: true,
      message: err.message || "Có lỗi xảy ra",
      onclose: () =>
        setShowModal({ isShown: false, message: "", onclose: () => {} }),
    });
  }
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

// ...styles unchanged
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

import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import {
    Ionicons,
    MaterialIcons,
    FontAwesome5,
    Feather,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../Components/CartContext";

const ProfileScreen = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    });
    const { logout } = useCart();

    useEffect(() => {
        fetch("http://localhost:8000/users")
            .then((res) => res.json())
            .then(async (data) => {
                const userString = await AsyncStorage.getItem("currentUser");
                const currentUser = userString ? JSON.parse(userString) : null;
                if (currentUser && Array.isArray(data)) {
                    const foundUser = data.find((u) => u.id === currentUser.id);
                    setUser(foundUser);
                    setForm({
                        name: foundUser.name,
                        email: foundUser.email,
                        address: foundUser.address,
                        phone: foundUser.phone,
                    });
                }
            });
    }, []);

    if (!user) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#888" />
            </View>
        );
    }

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleEditToggle = () => {
        if (editMode) {
            setUser({ ...user, ...form });
        }
        setEditMode(!editMode);
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: user.profilePicture }}
                    style={styles.avatar}
                />
                {editMode ? (
                    <>
                        <TextInput
                            style={styles.nameInput}
                            value={form.name}
                            onChangeText={(text) => handleChange("name", text)}
                            autoFocus
                        />
                        <TextInput
                            style={styles.infoInput}
                            value={form.email}
                            onChangeText={(text) => handleChange("email", text)}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.infoInput}
                            value={form.phone}
                            onChangeText={(text) => handleChange("phone", text)}
                            placeholder="Phone"
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={styles.infoInput}
                            value={form.address}
                            onChangeText={(text) =>
                                handleChange("address", text)
                            }
                            placeholder="Address"
                        />
                    </>
                ) : (
                    <>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.info}>{user.email}</Text>
                        <Text style={styles.info}>{user.phone}</Text>
                        <Text style={styles.info}>{user.address}</Text>
                    </>
                )}
            </View>
            <View style={styles.menu}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push("/YourOrder")}
                >
                    <Ionicons
                        name="cart-outline"
                        size={20}
                        color="#555"
                        style={styles.menuIcon}
                    />
                    <Text style={styles.menuLabel}>Your Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push("/WishList")}
                >
                    <Ionicons
                        name="heart-outline"
                        size={20}
                        color="#555"
                        style={styles.menuIcon}
                    />
                    <Text style={styles.menuLabel}>Your Wishlist</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                    <MaterialIcons
                        name="payment"
                        size={20}
                        color="#555"
                        style={styles.menuIcon}
                    />
                    <Text style={styles.menuLabel}>Payment History</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                    <FontAwesome5
                        name="gift"
                        size={18}
                        color="#555"
                        style={styles.menuIcon}
                    />
                    <Text style={styles.menuLabel}>Reward Points</Text>
                </TouchableOpacity>

                {/* ✅ Sửa phần này để mở CustomerSupport */}
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push("/CustomerSupport")}
                >
                    <Feather
                        name="headphones"
                        size={20}
                        color="#555"
                        style={styles.menuIcon}
                    />
                    <Text style={styles.menuLabel}>Customer Support</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handleEditToggle}
                >
                    <Feather
                        name="edit-2"
                        size={20}
                        color="#555"
                        style={styles.menuIcon}
                    />
                    <Text style={styles.menuLabel}>
                        {editMode ? "Save Profile" : "Edit Profile"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
                    <Feather
                        name="settings"
                        size={20}
                        color="#555"
                        style={styles.menuIcon}
                    />
                    <Text style={styles.menuLabel}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => logout()}
                >
                    <MaterialIcons
                        name="logout"
                        size={20}
                        color="#555"
                        style={styles.menuIcon}
                    />
                    <Text style={styles.menuLabel}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        paddingBottom: 16,
        backgroundColor: "#F7F7F7",
        alignItems: "center",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "600",
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        backgroundColor: "#eee",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 2,
    },
    info: {
        fontSize: 14,
        color: "#555",
        marginBottom: 2,
    },
    nameInput: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#222",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        minWidth: 120,
        textAlign: "center",
        marginBottom: 2,
    },
    infoInput: {
        fontSize: 14,
        color: "#222",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        minWidth: 120,
        textAlign: "center",
        marginBottom: 2,
        paddingVertical: 2,
    },
    menu: {
        marginHorizontal: 16,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    menuIcon: {
        marginRight: 14,
    },
    menuLabel: {
        fontSize: 16,
        color: "#222",
    },
});

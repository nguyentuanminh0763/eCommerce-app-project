import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Notification = {
    id: string;
    title: string;
    message: string;
    time: string;
};

const notifications: Notification[] = [
    {
        id: "1",
        title: "Order Placed",
        message: "Your order has been successfully placed.",
        time: "3 hours ago",
    },
    {
        id: "2",
        title: "Payment Received",
        message: "Your payment has been successfully received.",
        time: "4 hours ago",
    },
    {
        id: "3",
        title: "Order Delivered",
        message: "Your order has been successfully delivered.",
        time: "2 days ago",
    },
    {
        id: "4",
        title: "Order Cancelled",
        message: "Your order has been successfully cancelled.",
        time: "5 days ago",
    },
];

const NotificationsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notification</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 10 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Ionicons
                            name="notifications-outline"
                            size={22}
                            color="#888"
                            style={{ marginRight: 10 }}
                        />
                        <View style={{ flex: 1 }}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                            <Text style={styles.message}>{item.message}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        paddingTop: 40,
    },
    header: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 10,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 16,
        marginBottom: 12,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
    },
    title: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#222",
        flex: 1,
    },
    time: {
        fontSize: 13,
        color: "#888",
        marginLeft: 10,
    },
    message: {
        color: "#555",
        fontSize: 13,
        marginTop: 2,
    },
});

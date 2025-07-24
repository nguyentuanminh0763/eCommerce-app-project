import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../Components/CartContext";

// Define the types based on the payload
type Product = {
    id: string;
    title: string;
    price: number;
    description: string;
    images: string[];
};

type Notification = {
    product: Product[];
    timestamp: string;
    title: string;
    userName: string;
};

const NotificationsScreen = () => {
    const { notiList } = useCart();

    const formatTime = (timestamp: string) => {
        const date = new Date(parseInt(timestamp));
        return date.toLocaleString(); // Or any other format
    };

    const renderNotificationItem = ({ item }: { item: Notification }) => (
        <View style={styles.card}>
            <Ionicons
                name="notifications-outline"
                size={22}
                color="#888"
                style={{ marginRight: 10, marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
                <View style={styles.row}>
                    <Text style={styles.title}>
                        {item.title} from {item.userName}
                    </Text>
                    <Text style={styles.time}>
                        {formatTime(item.timestamp)}
                    </Text>
                </View>
                {item.product.map((p) => (
                    <View key={p.id} style={styles.productContainer}>
                        <Image
                            source={{ uri: p.images[0] }}
                            style={styles.productImage}
                        />
                        <View style={styles.productDetails}>
                            <Text style={styles.productTitle}>{p.title}</Text>
                            <Text style={styles.productPrice}>${p.price}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notifications</Text>
            {notiList && notiList.length > 0 ? (
                <FlatList
                    data={notiList}
                    keyExtractor={(item) => item.timestamp}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    renderItem={renderNotificationItem}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No notifications yet.</Text>
                </View>
            )}
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
        marginBottom: 8,
    },
    title: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#222",
        flex: 1,
    },
    time: {
        fontSize: 12,
        color: "#888",
        marginLeft: 10,
    },
    productContainer: {
        flexDirection: "row",
        marginTop: 8,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: "center",
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "500",
    },
    productPrice: {
        fontSize: 13,
        color: "#555",
        marginTop: 2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
    },
});

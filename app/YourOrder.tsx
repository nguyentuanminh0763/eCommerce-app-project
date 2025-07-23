import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useCart } from "./Components/CartContext";
import { Colors } from "@/constants/Colors";

const YourOrder = () => {
    const { checkoutHistory } = useCart();

    console.log(checkoutHistory);

    if (!checkoutHistory || checkoutHistory.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>No payment history found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment History</Text>
            <FlatList
                data={checkoutHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.historyItem}>
                        <Text style={styles.dateText}>
                            Date:{" "}
                            {new Date(item.date).toLocaleDateString("en-GB")}
                        </Text>
                        <Text style={styles.locationText}>
                            Address: {item.location}
                        </Text>
                        <Text style={styles.phoneText}>
                            Phone: {item.phoneNumber}
                        </Text>
                        <Text style={styles.totalText}>
                            Total: {item.total.toLocaleString("en-US")} $
                        </Text>
                        <Text style={styles.itemsTitle}>Purchased Items:</Text>
                        {item.items.map((product) => (
                            <View key={product.id} style={styles.productItem}>
                                <Text style={styles.productTitle}>
                                    {product.title} (x{product.quantity})
                                </Text>
                                <Text style={styles.productPrice}>
                                    {(
                                        product.price * product.quantity
                                    ).toLocaleString("en-US")}{" "}
                                    $
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

export default YourOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.black,
        marginBottom: 24,
        textAlign: "center",
    },
    emptyText: {
        textAlign: "center",
        marginTop: 60,
        fontSize: 18,
        color: Colors.gray,
    },
    historyItem: {
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    dateText: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 6,
    },
    locationText: {
        fontSize: 15,
        color: Colors.gray,
        marginBottom: 4,
    },
    phoneText: {
        fontSize: 15,
        color: Colors.gray,
        marginBottom: 8,
    },
    totalText: {
        fontSize: 17,
        fontWeight: "700",
        color: "green",
        marginBottom: 10,
    },
    itemsTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: Colors.black,
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray,
        paddingTop: 10,
        marginBottom: 6,
    },
    productItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 8,
        paddingVertical: 4,
    },
    productTitle: {
        color: Colors.gray,
        fontSize: 14,
    },
    productPrice: {
        fontSize: 14,
        color: Colors.primary,
    },
});

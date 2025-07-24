import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useCart } from "./Components/CartContext";
import { ProductType } from "@/types/type";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const WishList = () => {
    const { wishListItems, removeItemFromWishList } = useCart();

    const renderItem = ({ item }: { item: ProductType }) => (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ flex: 1, flexDirection: "row", height: "auto" }}
                onPress={() => router.push(`/product/${item.id}`)}
            >
                <Image
                    source={{ uri: item.images[0] }}
                    style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemPrice}>
                        ${item.price.toFixed(2)}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => removeItemFromWishList(item.id)}
                    style={styles.removeButton}
                >
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {wishListItems.length > 0 ? (
                <FlatList
                    data={wishListItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Your wishlist is empty.
                    </Text>
                </View>
            )}
        </View>
    );
};

export default WishList;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.black,
    },
    itemPrice: {
        fontSize: 14,
        color: Colors.gray,
        marginTop: 6,
    },
    removeButton: {
        height: "50%",
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: Colors.primary,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    removeButtonText: {
        color: Colors.white,
        fontWeight: "600",
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
    },
    emptyText: {
        fontSize: 18,
        color: Colors.gray,
        textAlign: "center",
    },
});

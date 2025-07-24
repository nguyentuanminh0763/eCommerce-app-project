import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { ProductType } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useCart } from "@/app/Components/CartContext";
import Animated, { FadeInUp, FadeOut, ZoomIn } from "react-native-reanimated";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000); // 2s ẩn toast
    }
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </Pressable>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Content */}
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Animated.Image
            source={{ uri: product.images?.[0] || "https://via.placeholder.com/400" }}
            style={styles.image}
            entering={ZoomIn.duration(500)}
          />
          <Animated.View entering={FadeInUp.delay(200).duration(500)}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </Animated.View>
        </ScrollView>

        {/* Add to Cart */}
        <View style={styles.footer}>
          <Pressable style={styles.cartButton} onPress={handleAddToCart}>
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </Pressable>
        </View>

        {/* Toast */}
        {showToast && (
          <Animated.View
            style={styles.toast}
            entering={FadeInUp.duration(300)}
            exiting={FadeOut.duration(300)}
          >
            <Text style={styles.toastText}>Added to cart successfully!</Text>
          </Animated.View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { fontSize: 18, fontWeight: "500", color: Colors.gray },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: Colors.black },
  container: { padding: 20 },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 5, color: Colors.black },
  price: { fontSize: 20, fontWeight: "600", color: Colors.primary, marginBottom: 15 },
  description: { fontSize: 16, lineHeight: 22, color: Colors.gray },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  toast: {
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});

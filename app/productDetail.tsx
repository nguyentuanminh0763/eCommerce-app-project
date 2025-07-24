import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ProductType } from "@/types/type";
import { getProductById } from "@/app/services/products";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const productId = Number(id);
  const router = useRouter();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getProductById(productId);
      setProduct(data);
      setLoading(false);
    })();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Product not found!</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Ảnh sản phẩm */}
      <Image source={{ uri: product.images[0] }} style={styles.image} />

      {/* Tiêu đề và giá */}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>

      {/* Mô tả sản phẩm */}
      <Text style={styles.description}>{product.description}</Text>

      {/* Danh mục */}
      <Text style={styles.category}>Category: {product.category?.name}</Text>

      {/* Nút thêm giỏ hàng */}
      <Button title="Add to Cart" onPress={() => alert("Added to cart!")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  image: { width: "100%", height: 250, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  price: { fontSize: 18, color: "#e63946", marginBottom: 10 },
  description: { fontSize: 16, color: "#333", marginBottom: 20 },
  category: { fontSize: 16, fontStyle: "italic", color: "#555", marginBottom: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  notFound: { fontSize: 18, color: "red" },
});

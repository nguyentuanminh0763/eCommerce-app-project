import React, { useState, memo, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ProductType } from "@/types/type";
import { useCart } from "./CartContext";
import SignUpModal from "./Authentication/signUpModal";

type Props = {
  item: ProductType;
  index: number;
};

const width = Dimensions.get("window").width - 40;

const ProductItem = ({ item, index }: Props) => {
  const router = useRouter();
  const { addToCart, addWishListItem } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [showCartBtn, setShowCartBtn] = useState(Platform.OS !== "web");

  // Điều hướng đến ProductDetail
  const handlePress = useCallback(() => {
    if (item.id) {
      router.push(`/product/${item.id}`);
    }
  }, [item.id, router]);

  const handleMouseEnter = () => {
    if (Platform.OS === "web") setShowCartBtn(true);
  };
  const handleMouseLeave = () => {
    if (Platform.OS === "web") setShowCartBtn(false);
  };

  return (
    <View
      {...(Platform.OS === "web"
        ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
        : {})}
    >
      {/* Nhấn vào toàn bộ card sẽ điều hướng */}
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animated.View
          style={styles.container}
          entering={FadeInDown.delay(300 + index * 100).duration(500)}
        >
          {/* Hình sản phẩm */}
          <View style={{ position: "relative" }}>
            <Image
              source={{
                uri: item.images?.[0] || "https://via.placeholder.com/200",
              }}
              style={styles.productImage}
            />
            {showCartBtn && (
              <Pressable
                style={styles.cartButton}
                onPress={(e) => {
                  e.stopPropagation(); // Ngăn event lan tới card
                  addToCart(item);
                  setShowModal(true);
                }}
              >
                <Ionicons name="cart-outline" size={22} color="black" />
              </Pressable>
            )}
          </View>

          {/* Wishlist */}
          <Pressable
            style={styles.bookmarkButton}
            onPress={(e) => {
              e.stopPropagation();
              addWishListItem(item);
            }}
          >
            <Ionicons name="heart-outline" size={22} color="black" />
          </Pressable>

          {/* Thông tin sản phẩm */}
          <View style={styles.productInfo}>
            <Text style={styles.price}>${item.price}</Text>
            <View style={styles.ratingWrapper}>
              <Ionicons name="star" size={20} color="#D4AF37" />
              <Text style={styles.rating}>4.7</Text>
            </View>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        </Animated.View>
      </TouchableOpacity>

      {/* Modal khi thêm giỏ hàng */}
      {showModal && (
        <SignUpModal
          visible={showModal}
          message="Successfully added to cart"
          onClose={() => setShowModal(false)}
        />
      )}
    </View>
  );
};

export default memo(ProductItem);

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  bookmarkButton: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 5,
    borderRadius: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black,
    letterSpacing: 1.1,
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rating: {
    fontSize: 14,
    color: Colors.gray,
  },
  cartButton: {
    position: "absolute",
    left: 20,
    bottom: 30,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 7,
    borderRadius: 30,
    zIndex: 2,
  },
});

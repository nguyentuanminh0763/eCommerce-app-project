import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/app/Components/Header";
import { Stack } from "expo-router";
import { useCart } from "../Components/CartContext";

const CartScreen = () => {
  const { cartItems, handleCheckout, removeFromCart, clearCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
const [deposit, setDeposit] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmCheckout = () => {
    setModalVisible(true);
  };

  const handleFinalCheckout = () => {
    console.log({
        name,
        location,
        phoneNumber,
        deposit,
        total,
    });
    handleCheckout(location, phoneNumber);
    setModalVisible(false);
};


  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.images[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.price}>
          ${item.price} x {item.quantity}
        </Text>
        <Text style={styles.subtotal}>
          Subtotal: ${item.price * item.quantity}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        style={styles.removeBtn}
      >
        <Ionicons name="trash" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalAmount}>${total}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
                <Text style={{ color: "white" }}>Clear Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={handleConfirmCheckout}
              >
                <Text style={{ color: "white" }}>Đặt trước</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Modal Checkout */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Thông tin đặt trước</Text>

            <TextInput
              placeholder="Họ và tên"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Địa chỉ"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />
            <TextInput
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="Số tiền cọc"
              value={deposit}
              onChangeText={setDeposit}
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Hủy</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleFinalCheckout}
              >
                <Text style={styles.textStyle}>Xác nhận</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: Colors.black,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.gray,
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: Colors.black,
  },
  price: {
    fontSize: 15,
    color: Colors.primary,
    marginBottom: 2,
  },
  subtotal: {
    fontSize: 14,
    color: Colors.gray,
  },
  removeBtn: {
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 8,
  },
  separator: {
    height: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: Colors.background,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.black,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  clearBtn: {
    flex: 1,
    backgroundColor: "#888",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#ccc",
  },
  buttonConfirm: {
    backgroundColor: "#572fff",
  },
  textStyle: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

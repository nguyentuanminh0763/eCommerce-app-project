import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import { ProductType } from '@/types/type';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/app/Components/Header';
import { Stack } from 'expo-router';
import { useCart } from '../Components/CartContext';

const CartScreen = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        header: () => <Header />
      }} />
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.images[0] }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.price}>${item.price} x {item.quantity}</Text>
                <Text style={styles.subtotal}>Subtotal: ${item.price * item.quantity}</Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>${total}</Text>
        </View>
      </View>
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: Colors.black,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '600',
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
  separator: {
    height: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: Colors.background,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
});
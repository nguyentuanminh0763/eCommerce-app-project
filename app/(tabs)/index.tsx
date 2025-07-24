import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductType } from '@/types/type';
import { FlatList } from 'react-native';
import Header from '@/app/Components/Header';
import { Stack } from 'expo-router';
import ProductItem from '../Components/ProducItem';

type Props = {}

const HomeScreen = (props: Props) => {
  console.log("HomeScreen");

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
        fetch("http://192.168.100.78:8000/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        header: () => <Header />
      }} />
      <View style={styles.container}>
        <Text>For You</Text>
        <FlatList
          data={products}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 20
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({index, item }) => (
            <ProductItem key={index} item={item} index={index} />
          )}
        />
      </View>
    </>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: '100%',
  },

})
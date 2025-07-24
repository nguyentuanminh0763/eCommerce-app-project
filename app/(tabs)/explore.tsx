import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import axios from 'axios';

const ExploreScreen = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products');

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.images[0] }} style={styles.image} resizeMode="cover" />
      
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm địa điểm..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ExploreScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingTop: StatusBar.currentHeight || 40,
  },

  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  searchInput: {
    height: 35,
  marginHorizontal: 30,
  paddingLeft: 18,
  paddingRight: 18,
  backgroundColor: '#ffffff',
  borderRadius: 25,
  borderWidth: 0.5,
  borderColor: '#d0d0d0',
  fontSize: 16,
  color: '#333',
  marginBottom: 20,
  marginTop:15,

  // Hiệu ứng đổ bóng mềm mại
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 3,
  },

  listContent: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 16, // cách lề 2 bên
  },

  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },

  textWrapper: {
    padding: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
});

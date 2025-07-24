import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import Header from '@/app/Components/Header';

// Cho emulator Android sử dụng địa chỉ để kết nối tới máy chủ localhost của dev machine
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const SERVER = `http://${HOST}:8000`;

type Category = { id: number; name: string; image: string };
type Product = {
  id?: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
};

export default function AdminProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState<Product>({ title: '', price: 0, description: '', images: [], categoryId: 1 });

  const fetchData = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        axios.get<Product[]>(`${SERVER}/products`),
        axios.get<Category[]>(`${SERVER}/categories`),
      ]);
      setProducts(pRes.data);
      setCategories(cRes.data);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Không lấy được dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (item?: Product) => {
    if (item) setCurrent(item);
    else setCurrent({ title: '', price: 0, description: '', images: [], categoryId: categories[0]?.id || 1 });
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permission denied');
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.cancelled) setCurrent(prev => ({ ...prev, images: [...prev.images, result.uri] }));
  };

  const handleSave = async () => {
    try {
      if (current.id) await axios.put(`${SERVER}/products/${current.id}`, current);
      else await axios.post(`${SERVER}/products`, current);
      Alert.alert('Thành công');
      closeModal();
      fetchData();
    } catch (e: any) {
      Alert.alert('Lỗi', e.message);
    }
  };

  const handleDelete = async (id?: number) => {
  if (!id) return;
  try {
    await axios.delete(`${SERVER}/products/${id}`);
    setProducts(prev => prev.filter(p => p.id !== id));
  } catch (e: any) {
    Alert.alert('Lỗi', e.message || 'Không thể xóa sản phẩm');
  }
};


  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>${item.price}</Text>
      <Text>Category: {categories.find(c => c.id === item.categoryId)?.name}</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.btnEdit} onPress={() => openModal(item)}><Text style={styles.btnText}>Edit</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={() => handleDelete(item.id)}><Text style={styles.btnText}>Delete</Text></TouchableOpacity>
      </View>
    </View>
  );

  if (loading) return <View style={styles.center}><ActivityIndicator size='large' /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ header: () => <Header /> }} />
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Danh sách sản phẩm</Text>
        <TouchableOpacity style={styles.btnAdd} onPress={() => openModal()}><Text style={styles.btnText}>Thêm</Text></TouchableOpacity>
      </View>
      <FlatList data={products} keyExtractor={item => item.id!.toString()} renderItem={renderItem} contentContainerStyle={styles.list} />

      <Modal visible={modalVisible} transparent animationType='slide' onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <ScrollView style={styles.modalView}>
            <Text style={styles.modalTitle}>{current.id ? 'Edit Product' : 'Add Product'}</Text>
            <TextInput style={styles.input} placeholder='Title' value={current.title} onChangeText={text => setCurrent({ ...current, title: text })} />
            <TextInput style={styles.input} placeholder='Price' keyboardType='numeric' value={current.price.toString()} onChangeText={text => setCurrent({ ...current, price: Number(text) })} />
            <TextInput style={[styles.input, { height: 80 }]} placeholder='Description' multiline value={current.description} onChangeText={text => setCurrent({ ...current, description: text })} />
            <Text style={styles.label}>Category:</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={current.categoryId} onValueChange={val => setCurrent({ ...current, categoryId: val })}>
                {categories.map(cat => <Picker.Item key={cat.id} label={cat.name} value={cat.id} />)}
              </Picker>
            </View>
            <Text style={styles.label}>Images:</Text>
            <View style={styles.imageRow}>
              {current.images.map((uri, idx) => <Image key={idx} source={{ uri }} style={styles.thumbnail} />)}
              <TouchableOpacity style={styles.btnAddImage} onPress={pickImage}><Text style={styles.btnText}>+</Text></TouchableOpacity>
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={closeModal}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSave}><Text style={styles.btnText}>Save</Text></TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  heading: { fontSize: 20, fontWeight: 'bold' },
  btnAdd: { backgroundColor: '#28a745', padding: 8, borderRadius: 4 },
  btnText: { color: '#fff', fontWeight: '600' },
  list: { paddingHorizontal: 16 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, elevation: 2 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  btnEdit: { backgroundColor: '#ffc107', padding: 6, borderRadius: 4 },
  btnDelete: { backgroundColor: '#dc3545', padding: 6, borderRadius: 4 },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalView: { backgroundColor: '#fff', borderRadius: 8, padding: 16, width: '90%', maxHeight: '90%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  label: { marginBottom: 4, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12, backgroundColor: '#fff' },
  pickerWrapper: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 12 },
  imageRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  thumbnail: { width: 50, height: 50, marginRight: 8, borderRadius: 4 },
  btnAddImage: { width: 50, height: 50, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  button: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6 },
  buttonClose: { backgroundColor: '#6c757d' },
  buttonSave: { backgroundColor: '#007bff' }
});

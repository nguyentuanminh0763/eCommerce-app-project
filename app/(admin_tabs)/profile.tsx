import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Cho emulator Android
import { Platform } from 'react-native';
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const SERVER = `http://${HOST}:8000`;

type User = {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  profilePicture: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('currentUser');
        if (raw) {
          const u: User = JSON.parse(raw);
          setUser(u);
          setForm({ name: u.name, email: u.email, address: u.address, phone: u.phone });
        }
      } catch (e: any) {
        Alert.alert('Error', e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = () => {
    if (editMode && user) {
      // Save to server
      axios.put(`${SERVER}/users/${user.id}`, { ...user, ...form })
        .then(res => {
          setUser(res.data);
          AsyncStorage.setItem('currentUser', JSON.stringify(res.data));
          Alert.alert('Thành công', 'Cập nhật thông tin thành công');
        })
        .catch(err => Alert.alert('Lỗi', err.message));
    }
    setEditMode(prev => !prev);
  };

  if (loading) return (
    <View style={styles.center}><ActivityIndicator size="large" /></View>
  );

  if (!user) return (
    <View style={styles.center}><Text>Không tìm thấy thông tin người dùng.</Text></View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
        {editMode ? (
          <TextInput style={styles.nameInput} value={form.name} onChangeText={text => handleChange('name', text)} />
        ) : (
          <Text style={styles.name}>{user.name}</Text>
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={form.email} editable={false} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Phone</Text>
        {editMode ? (
          <TextInput style={styles.input} value={form.phone} onChangeText={text => handleChange('phone', text)} keyboardType="phone-pad" />
        ) : (
          <Text style={styles.value}>{user.phone}</Text>
        )}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Address</Text>
        {editMode ? (
          <TextInput style={styles.input} value={form.address} onChangeText={text => handleChange('address', text)} />
        ) : (
          <Text style={styles.value}>{user.address}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleToggle}>
        <Text style={styles.buttonText}>{editMode ? 'Save Profile' : 'Edit Profile'}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7' },
  content: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  avatarContainer: { alignItems: 'center', marginVertical: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12, backgroundColor: '#eee' },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  nameInput: { fontSize: 22, textAlign: 'center', borderBottomWidth: 1, borderColor: '#ccc', padding: 4, marginBottom: 8 },
  field: { marginVertical: 8 },
  label: { fontSize: 14, color: '#555', marginBottom: 4 },
  value: { fontSize: 16, color: '#222' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, backgroundColor: '#fff' },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 16 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginVertical: 4 },
  menuLabel: { marginLeft: 12, fontSize: 16, color: '#222' },
});

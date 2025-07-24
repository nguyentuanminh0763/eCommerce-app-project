import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  address: string;
  phone: string;
};

const SERVER = 'http://localhost:8000';

export default function AdminUsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<User[]>(`${SERVER}/users`);
        setUsers(res.data);
      } catch (e: any) {
        setError(e.message || 'Không lấy được danh sách users');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{item.id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{item.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{item.email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Role:</Text>
        <Text style={styles.value}>{item.role}</Text>
      </View>
      <TouchableOpacity style={styles.detailButton}>
        <Text style={styles.detailButtonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(u) => u.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
  list: { padding: 16 },
  separator: { height: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  row: { flexDirection: 'row', marginBottom: 4 },
  label: { fontWeight: '600', width: 60 },
  value: { flex: 1 },
  detailButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  detailButtonText: { color: '#fff', fontSize: 14 },
});

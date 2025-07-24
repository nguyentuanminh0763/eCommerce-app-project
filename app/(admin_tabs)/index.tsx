import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import Header from '@/app/Components/Header';

const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const SERVER = `http://${HOST}:8000`;

type DashboardStats = {
  totalUsers: number;
  totalProducts: number;
  todayOrders: number;
};

export default function DashboardScreen() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Fetch all data for dashboard
        const [uRes, pRes, oRes] = await Promise.all([
          axios.get(`${SERVER}/users`),
          axios.get(`${SERVER}/products`),
          axios.get(`${SERVER}/orders?date=today`), // giả định orders endpoint hỗ trợ filter
        ]);
        setStats({
          totalUsers: uRes.data.length,
          totalProducts: pRes.data.length,
          todayOrders: oRes.data.length,
        });
      } catch (e: any) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.center}>
        <Text>Không thể tải dữ liệu dashboard.</Text>
      </View>
    );
  }

  // Simple bar chart representation
  const maxCount = Math.max(stats.totalUsers, stats.totalProducts, stats.todayOrders);
  const barWidth = (count: number) => `${(count / maxCount) * 100}%`;

  return (
    <>
    <Stack.Screen options={{ header: () => <Header /> }} />
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Dashboard</Text>

      <View style={styles.statBox}>
        <Ionicons name="people-circle" size={32} color="#4caf50" />
        <Text style={styles.statLabel}>Users</Text>
        <Text style={styles.statValue}>{stats.totalUsers}</Text>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: barWidth(stats.totalUsers) }]} />
        </View>
      </View>

      <View style={styles.statBox}>
        <Ionicons name="pricetag" size={32} color="#2196f3" />
        <Text style={styles.statLabel}>Products</Text>
        <Text style={styles.statValue}>{stats.totalProducts}</Text>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: barWidth(stats.totalProducts) }]} />
        </View>
      </View>

      <View style={styles.statBox}>
        <Ionicons name="cart" size={32} color="#ff9800" />
        <Text style={styles.statLabel}>Today's Orders</Text>
        <Text style={styles.statValue}>{stats.todayOrders}</Text>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: barWidth(stats.todayOrders) }]} />
        </View>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('user')}>
        <Ionicons name="people-outline" size={20} color="#555" />
        <Text style={styles.menuLabel}>Manage Users</Text>
      </TouchableOpacity>
    </ScrollView></>

     
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  statBox: { marginBottom: 24 },
  statLabel: { fontSize: 18, marginTop: 4 },
  statValue: { fontSize: 20, fontWeight: 'bold', marginVertical: 4 },
  barBackground: { height: 10, backgroundColor: '#eee', borderRadius: 5 },
  barFill: { height: 10, backgroundColor: '#4caf50', borderRadius: 5 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#f7f7f7', borderRadius: 8, marginVertical: 8 },
  menuLabel: { marginLeft: 12, fontSize: 16 },
});

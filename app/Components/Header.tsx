import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

type Props = {}

const Header = (props: Props) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Logo */}
            <Image source={require('@/assets/images/logoo.jpg')} style={styles.logo} />

            {/* Search bar */}
            <Link href="/explore" asChild>
                <TouchableOpacity style={styles.searchBar}>
                    <Text style={styles.searchText}>Search</Text>
                    <Ionicons name="search-outline" size={20} color={Colors.gray} />
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingBottom: 10,
        gap: 15
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    searchBar: {
        flex: 1,
        backgroundColor: Colors.background,
        borderRadius: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchText: {
        color: Colors.gray,
    }
})

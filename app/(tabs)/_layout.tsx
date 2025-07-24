import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../Components/CartContext";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import CustomerSupportScreen from "../CustomerSupport";

export default function TabLayout() {
    const { getItemCount } = useCart();
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="search-outline"
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: "Notification",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="notifications-outline"
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarBadge:
                        getItemCount() > 0 ? getItemCount() : undefined,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={22} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="person-outline"
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

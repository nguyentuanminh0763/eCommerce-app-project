import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { CartProvider } from "./Components/CartContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <CartProvider>
            <Stack initialRouteName="index">
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="signin"
                    options={{ presentation: "modal" }}
                />
                <Stack.Screen
                    name="signup"
                    options={{ presentation: "modal" }}
                />
                <Stack.Screen
                    name="WishList"
                    options={{ presentation: "modal" }}
                />
                <Stack.Screen
                    name="PaymentHistory"
                    options={{ presentation: "modal" }}
                />
            </Stack>
        </CartProvider>
    );
}

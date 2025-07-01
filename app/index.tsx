import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Google from '@/assets/images/google-logo.svg';
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

type Props = {};

const WelcomeScreen = (props: Props) => {
  console.log("WelcomeScreen");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground source={require('@/assets/images/ecommerce-splash.jpg')}
        style={{ flex: 1 }} resizeMode="cover">
        <View style={styles.container}>
          <LinearGradient colors={["transparent", "rgba(225, 225, 225, 0.9)", "rgba(225, 225, 225, 1)"]} style={styles.background}>
            <View style={styles.wrapper}>
              <Animated.Text style={styles.title} entering={FadeInRight.duration(300).delay(300)}>F Shop</Animated.Text>
              <Animated.Text style={styles.description} entering={FadeInRight.duration(300).delay(300)}>One Stop Solution for your shopping needs</Animated.Text>

              <View style={styles.socialLoginWrapper}>
                <Animated.View entering={FadeInDown.duration(300).delay(300)}>
                  <Link href={"/signup"} asChild>
                    <TouchableOpacity style={styles.button}>
                      <Ionicons
                        name="mail-outline"
                        size={20}
                        color={Colors.black} />
                      <Text style={styles.buttonText}>Continue with Email</Text>
                    </TouchableOpacity>
                  </Link>
                </Animated.View>

                <Animated.View entering={FadeInDown.duration(300).delay(300)}>
                <Link href={"/signup"} asChild>
                  <TouchableOpacity style={styles.button}>
                    <Google width={20} height={20} />
                    <Text style={styles.buttonText}>Continue with Google</Text>
                  </TouchableOpacity>
                </Link>
                </Animated.View>

                <Animated.View entering={FadeInDown.duration(300).delay(300)}>
                <Link href={"/signup"} asChild>
                  <TouchableOpacity style={styles.button}>
                    <Ionicons
                      name="logo-facebook"
                      size={20}
                      color={Colors.black} />
                    <Text style={styles.buttonText}>Continue with Facebook</Text>
                  </TouchableOpacity>
                </Link>
                </Animated.View>  
              </View>

              <Animated.View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, justifyContent: 'center' }} entering={FadeInDown.duration(300).delay(300)}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.black }}>Already have an account? </Text>
                <Link href={"/signin"} asChild>
                  <TouchableOpacity>
                    <Text style={styles.signInText}>SignIn</Text>
                  </TouchableOpacity>
                </Link>
              </Animated.View>
            </View>
          </LinearGradient>

        </View>
      </ImageBackground>

    </>


  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  wrapper: {
    paddingBottom: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 2.4,
    marginBottom: 5
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    letterSpacing: 1.2,
    marginBottom: 20,
    lineHeight: 30,
  },
  socialLoginWrapper: {
    alignSelf: 'stretch',
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  signInText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  }
});

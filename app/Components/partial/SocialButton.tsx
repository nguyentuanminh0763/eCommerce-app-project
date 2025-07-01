import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import Google from "@/assets/images/google-logo.svg";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

const SocialButton = () => {
    return (
        <>
            <View style={styles.wrapper}>
                <Animated.Text
                    style={styles.title}
                    entering={FadeInRight.duration(300).delay(300)}
                >
                    F Shop
                </Animated.Text>
                <Animated.Text
                    style={styles.description}
                    entering={FadeInRight.duration(300).delay(300)}
                >
                    One Stop Solution for your shopping needs
                </Animated.Text>

                <View style={styles.socialLoginWrapper}>
                    <Animated.View
                        entering={FadeInDown.duration(300).delay(300)}
                    >
                        <Link href={"/signup"} asChild>
                            <TouchableOpacity style={styles.button}>
                                <Ionicons
                                    name="mail-outline"
                                    size={20}
                                    color={Colors.black}
                                />
                                <Text style={styles.buttonText}>
                                    Continue with Email
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.duration(300).delay(300)}
                    >
                        <Link href={"/signup"} asChild>
                            <TouchableOpacity style={styles.button}>
                                <Google width={20} height={20} />
                                <Text style={styles.buttonText}>
                                    Continue with Google
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </Animated.View>

                    <Animated.View
                        entering={FadeInDown.duration(300).delay(300)}
                    >
                        <Link href={"/signup"} asChild>
                            <TouchableOpacity style={styles.button}>
                                <Ionicons
                                    name="logo-facebook"
                                    size={20}
                                    color={Colors.black}
                                />
                                <Text style={styles.buttonText}>
                                    Continue with Facebook
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </Animated.View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingBottom: 50,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.primary,
        letterSpacing: 2.4,
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: Colors.gray,
        letterSpacing: 1.2,
        marginBottom: 20,
        lineHeight: 30,
    },
    socialLoginWrapper: {
        alignSelf: "stretch",
    },
    button: {
        flexDirection: "row",
        padding: 10,
        borderColor: Colors.gray,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        marginBottom: 15,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.black,
    },
    signInText: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.primary,
    },
});

export default SocialButton;

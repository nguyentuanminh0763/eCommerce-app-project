import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ProductType } from '@/types/type';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useCart } from './CartContext';


type Props = {
    item: ProductType;
    index: number;
}

const width = Dimensions.get('window').width - 40;

const ProductItem = ({ item, index }: Props) => {
    const insets = useSafeAreaInsets();
    const { addToCart } = useCart();
    const [showCartBtn, setShowCartBtn] = React.useState(Platform.OS !== 'web');

    // Nếu là web, hover mới hiện nút
    const handleMouseEnter = () => {
        if (Platform.OS === 'web') setShowCartBtn(true);
    };
    const handleMouseLeave = () => {
        if (Platform.OS === 'web') setShowCartBtn(false);
    };

    if (Platform.OS === 'web') {
        return (
            <View {...({ onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave } as any)}>
                <Animated.View
                    style={styles.container}
                    entering={FadeInDown.delay(300 + index * 100).duration(500)}
                >
                    <View style={{position: 'relative'}}>

                    <Image source={{ uri: item.images[0] }} style={styles.productImage} />
                    {showCartBtn && (
                        <TouchableOpacity
                            style={styles.cartButton}
                            onPress={() => addToCart(item)}
                        >
                            <Ionicons name="cart-outline" size={22} color="black" />
                        </TouchableOpacity>
                    )}
                    </View>
                    <TouchableOpacity
                        style={styles.bookmarkButton}
                    >
                        <Ionicons name="heart-outline" size={22} color="black" />
                    </TouchableOpacity>
                    
                    <View
                        style={styles.productInfo}
                    >
                        <Text style={styles.price}>${item.price}</Text>
                        <View style={styles.ratingWrapper}>
                            <Ionicons name="star" size={20} color={'#D4AF37'} />
                            <Text style={styles.rating}>4.7</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                </Animated.View>
            </View>
        );
    }
    // mobile: không cần onMouseEnter/onMouseLeave
    return (
        <Animated.View
            style={styles.container}
            entering={FadeInDown.delay(300 + index * 100).duration(500)}
        >
            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            <TouchableOpacity
                style={styles.bookmarkButton}
            >
                <Ionicons name="heart-outline" size={22} color="black" />
            </TouchableOpacity>
            {showCartBtn && (
                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => addToCart(item)}
                >
                    <Ionicons name="cart-outline" size={22} color="black" />
                </TouchableOpacity>
            )}
            <View
                style={styles.productInfo}
            >
                <Text style={styles.price}>${item.price}</Text>
                <View style={styles.ratingWrapper}>
                    <Ionicons name="star" size={20} color={'#D4AF37'} />
                    <Text style={styles.rating}>4.7</Text>
                </View>
            </View>
            <Text style={styles.title}>{item.title}</Text>
        </Animated.View>
    );
}

export default ProductItem;

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 10,
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 10,
    },
    bookmarkButton: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        padding: 5,
        borderRadius: 30,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
        letterSpacing: 1.1,
    },
    productInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.primary,
    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    rating: {
        fontSize: 14,
        color: Colors.gray,
    },
    cartButton: {
        position: 'absolute',
        left: 20,
        bottom: 30,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 7,
        borderRadius: 30,
        zIndex: 2,
    },
})
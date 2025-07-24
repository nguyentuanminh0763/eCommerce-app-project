import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductType } from "@/types/type";

export type CartItem = ProductType & { quantity: number };

export type HistoryEntry = {
    items: CartItem[];
    total: number;
    date: string;
    location: string;
    phoneNumber: string;
};

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: ProductType) => void;
    removeFromCart: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    clearCart: () => void;
    getItemCount: () => number;
    addWishListItem: (product: ProductType) => void;
    wishListItems: ProductType[];
    removeItemFromWishList: (productId: number) => void;
    handleCheckout: (location: string, phoneNumber: string) => void;
    checkoutHistory: HistoryEntry[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [wishListItems, setWishListItems] = useState<ProductType[]>([]);
    const [checkoutHistory, setCheckoutHistory] = useState<HistoryEntry[]>([]);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = (product: ProductType) => {
        setCartItems((prev) => {
            const found = prev.find((item) => item.id === product.id);
            if (found) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // Giảm số lượng sản phẩm (nếu số lượng > 1)
    const decreaseQuantity = (productId: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Xóa sản phẩm khỏi giỏ
    const removeFromCart = (productId: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    // Xóa toàn bộ giỏ
    const clearCart = () => {
        setCartItems([]);
    };

    // Đếm số lượng sản phẩm
    const getItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Thêm sản phẩm vào wishlist
    const addWishListItem = (product: ProductType) => {
        setWishListItems((prev) => {
            if (prev.some((item) => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    // Xóa sản phẩm khỏi wishlist
    const removeItemFromWishList = (productId: number) => {
        setWishListItems((prev) => prev.filter((item) => item.id !== productId));
    };

    // Thanh toán
    const handleCheckout = (location: string, phoneNumber: string) => {
        if (cartItems.length === 0) return;

        const total = cartItems.reduce(
            (accumulator, currentValue) =>
                accumulator + currentValue.price * currentValue.quantity,
            0
        );

        const newHistoryEntry: HistoryEntry = {
            items: cartItems,
            total: total,
            date: new Date().toISOString(),
            location: location,
            phoneNumber: phoneNumber,
        };

        setCheckoutHistory((prevHistory) => [...prevHistory, newHistoryEntry]);
        setCartItems([]); // Xóa giỏ hàng sau khi thanh toán
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                decreaseQuantity,
                clearCart,
                getItemCount,
                wishListItems,
                addWishListItem,
                removeItemFromWishList,
                handleCheckout,
                checkoutHistory,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

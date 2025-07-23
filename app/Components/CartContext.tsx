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
    getItemCount: () => number;
    addWishListItem: (product: ProductType) => void;
    wishListItems: ProductType[];
    removeItemFromWishList: (productId: number) => void;
    handleCheckout: (locaiton: string, phoneNumber: string) => void;
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

    const removeFromCart = (productId: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const getItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const addWishListItem = (product: ProductType) => {
        setWishListItems([...wishListItems, product]);
    };

    const removeItemFromWishList = (productId: number) => {
        setWishListItems((prev) => prev.filter((item) => item.id != productId));
    };

    const handleCheckout = (location: string, phoneNumber: string) => {
        if (cartItems.length === 0) {
            return;
        }
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
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                getItemCount,
                wishListItems,
                addWishListItem,
                handleCheckout,
                removeItemFromWishList,
                checkoutHistory,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

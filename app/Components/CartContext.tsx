import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductType } from "@/types/type";

export type CartItem = ProductType & { quantity: number };

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: ProductType) => void;
    removeFromCart: (productId: number) => void;
    getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, getItemCount }}
        >
            {children}
        </CartContext.Provider>
    );
};

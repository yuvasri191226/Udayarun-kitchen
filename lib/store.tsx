"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Dish } from "@/data/dishes";

export interface CartItem extends Dish {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (dish: Dish) => void;
  decrementItem: (dishId: string) => void;
  removeItem: (dishId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartDrawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const addItem = (dish: Dish) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  // Reduce quantity by one; drop the line entirely at zero.
  const decrementItem = (dishId: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === dishId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (dishId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== dishId));
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsCartDrawerOpen(true);
  const closeCart = () => setIsCartDrawerOpen(false);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        decrementItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        isCartDrawerOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};


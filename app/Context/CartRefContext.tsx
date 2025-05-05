"use client";
import { createContext, useContext, useRef } from "react";

const CartRefContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export const CartRefProvider = ({ children }: { children: React.ReactNode }) => {
  const cartRef = useRef<HTMLDivElement>(null);
  return (
    <CartRefContext.Provider value={cartRef}>
      {children}
    </CartRefContext.Provider>
  );
};

export const useCartRef = () => useContext(CartRefContext);

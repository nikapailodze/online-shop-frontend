"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { API_BASE_URL, withAuthHeaders } from "../lib/api";
import { authEventName, getStoredToken } from "../lib/auth";

export type CartItem = {
  id: number;
  productId: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  color?: string;
  size?: string;
};

type AddToCartPayload = {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  quantity?: number;
  color?: string | null;
  size?: string | null;
};

type CartContextValue = {
  items: CartItem[];
  isCartOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (payload: AddToCartPayload) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<{ orderId: number; totalPrice: number }>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = "cartItems";

const parseStoredCart = (raw: string | null): CartItem[] => {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => ({
        id: Number(item?.id) || Date.now(),
        productId: Number(item?.productId) || 0,
        name: String(item?.name || "Item"),
        description: String(item?.description || ""),
        price: Number(item?.price) || 0,
        quantity: Math.max(1, Number(item?.quantity) || 1),
        imageUrl: item?.imageUrl ? String(item.imageUrl) : undefined,
        color: item?.color ? String(item.color) : undefined,
        size: item?.size ? String(item.size) : undefined,
      }))
      .filter((item) => item.productId > 0);
  } catch {
    return [];
  }
};

const loadCart = () => {
  if (typeof window === "undefined") return [];
  return parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY));
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setToken(getStoredToken());
    setItems(loadCart());

    const handleStorageChange = () => {
      setToken(getStoredToken());
      setItems(loadCart());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(authEventName, handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(authEventName, handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const checkoutFetch = useCallback(
    async (body: Record<string, unknown>) => {
      if (!token) {
        throw new Error("Please sign in before checking out.");
      }

      const headers = new Headers({
        "Content-Type": "application/json",
      });

      const authHeaders = withAuthHeaders(token);
      Object.entries(authHeaders).forEach(([key, value]) => {
        if (value) headers.set(key, value);
      });

      const response = await fetch(`${API_BASE_URL}/api/Orders/checkout`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message ?? "Something went wrong.");
      }

      return response;
    },
    [token]
  );

  const refreshCart = useCallback(async () => {
    setItems(loadCart());
  }, []);

  const addToCart = useCallback(async (payload: AddToCartPayload) => {
    setError(null);
    setItems((prev) => {
      const quantity = payload.quantity ?? 1;
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === payload.productId &&
          (item.color ?? null) === (payload.color ?? null) &&
          (item.size ?? null) === (payload.size ?? null)
      );

      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          id: Date.now() + Math.floor(Math.random() * 1000),
          productId: payload.productId,
          name: payload.name,
          description: payload.description ?? "",
          price: payload.price,
          quantity,
          imageUrl: payload.imageUrl,
          color: payload.color ?? undefined,
          size: payload.size ?? undefined,
        },
      ];
    });
    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback(async (cartItemId: number, quantity: number) => {
    setError(null);
    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  }, []);

  const removeItem = useCallback(async (cartItemId: number) => {
    setError(null);
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  }, []);

  const clearCart = useCallback(async () => {
    setError(null);
    setItems([]);
  }, []);

  const checkout = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await checkoutFetch({
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
      });

      const body = await response.json();
      setItems([]);
      return { orderId: body.orderId, totalPrice: body.totalPrice };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to place the order.";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [checkoutFetch, items]);

  const value = useMemo(
    () => ({
      items,
      isCartOpen,
      isLoading,
      error,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      toggleCart: () => setIsCartOpen((prev) => !prev),
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      checkout,
      refreshCart,
    }),
    [
      addToCart,
      checkout,
      clearCart,
      error,
      isCartOpen,
      isLoading,
      items,
      refreshCart,
      removeItem,
      updateQuantity,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

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

type CartItemDto = {
  cartItemId?: number;
  id?: number;
  productId: number;
  productName?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  imageUrl?: string;
  image?: string;
  color?: string;
  size?: string;
};

type CartContextValue = {
  items: CartItem[];
  isCartOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (payload: {
    productId: number;
    quantity?: number;
    color?: string | null;
    size?: string | null;
  }) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<{ orderId: number; totalPrice: number }>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedToken = getStoredToken();
    setToken(storedToken);

    const handleStorageChange = () => {
      setToken(getStoredToken());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(authEventName, handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(authEventName, handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (!token) {
      setItems([]);
    }
  }, [token]);

  const mapCartItem = useCallback((dto: CartItemDto): CartItem => {
    return {
      id: dto.cartItemId ?? dto.id ?? 0,
      productId: dto.productId,
      name: dto.productName ?? dto.name ?? "Item",
      description: dto.description ?? "",
      price: dto.price ?? 0,
      quantity: dto.quantity ?? 1,
      imageUrl: dto.imageUrl ?? dto.image,
      color: dto.color ?? undefined,
      size: dto.size ?? undefined,
    };
  }, []);

  const authFetch = useCallback(
    async (path: string, init?: RequestInit) => {
      if (!token) {
        throw new Error("Please sign in to manage your cart.");
      }

      const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init?.headers ?? {}),
          ...withAuthHeaders(token),
        },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.message ?? "Something went wrong.");
      }

      return response;
    },
    [token]
  );

  const refreshCart = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await authFetch("/api/Cart");
      const body = await response.json();
      const parsed: CartItemDto[] = Array.isArray(body) ? body : [];
      setItems(parsed.map((item) => mapCartItem(item)));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to load cart items.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, mapCartItem, token]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(
    async ({
      productId,
      quantity = 1,
      color,
      size,
    }: {
      productId: number;
      quantity?: number;
      color?: string | null;
      size?: string | null;
    }) => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await authFetch("/api/Cart", {
          method: "POST",
          body: JSON.stringify({
            productId,
            quantity,
            color: color ?? undefined,
            size: size ?? undefined,
          }),
        });

        const body = await response.json();
        const mapped = mapCartItem(body);

        setItems((prev) => {
          const index = prev.findIndex((item) => item.id === mapped.id);
          if (index >= 0) {
            const copy = [...prev];
            copy[index] = mapped;
            return copy;
          }
          return [...prev, mapped];
        });
        setIsCartOpen(true);
      } finally {
        setIsLoading(false);
      }
    },
    [authFetch, mapCartItem]
  );

  const updateQuantity = useCallback(
    async (cartItemId: number, quantity: number) => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await authFetch(`/api/Cart/${cartItemId}`, {
          method: "PATCH",
          body: JSON.stringify({ quantity }),
        });

        const body = await response.json();
        const mapped = mapCartItem(body);

        setItems((prev) =>
          prev.map((item) => (item.id === mapped.id ? mapped : item))
        );
      } finally {
        setIsLoading(false);
      }
    },
    [authFetch, mapCartItem]
  );

  const removeItem = useCallback(
    async (cartItemId: number) => {
      setError(null);
      setIsLoading(true);
      try {
        await authFetch(`/api/Cart/${cartItemId}`, {
          method: "DELETE",
        });

        setItems((prev) => prev.filter((item) => item.id !== cartItemId));
      } finally {
        setIsLoading(false);
      }
    },
    [authFetch]
  );

  const clearCart = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await authFetch("/api/Cart", { method: "DELETE" });
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  const checkout = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await authFetch("/api/Orders/checkout", {
        method: "POST",
      });
      const body = await response.json();
      setItems([]);
      return { orderId: body.orderId, totalPrice: body.totalPrice };
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

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

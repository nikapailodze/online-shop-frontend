"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { API_BASE_URL } from "../lib/api";
import PageLoader from "../Components/PageLoader/PageLoader";
import {
  authEventName,
  clearAuth,
  getStoredToken,
  getStoredUser,
  getUserFromToken,
  StoredUser,
} from "../lib/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [orders, setOrders] = useState<
    { orderId: number; totalPrice: number; createdAtUtc: string; items: { productName: string; quantity: number; unitPrice: number; color?: string; size?: string }[] }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const stored = getStoredUser() ?? getUserFromToken();
      setUser(stored);
      if (!stored) {
        router.push("/login");
      }
    };
    loadUser();

    const loadOrders = async () => {
      const token = getStoredToken();
      if (!token) {
        setIsLoadingOrders(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/Orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Unable to load orders");
        }
        const body = await response.json();
        setOrders(body);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load orders.";
        setError(message);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    loadOrders();
    window.addEventListener(authEventName, loadUser);
    return () => window.removeEventListener(authEventName, loadUser);
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const displayName = user?.Name || "";
  const displaySurname = user?.Surname || "";
  const displayEmail = user?.Email || "";

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Profile</h1>
        {user ? (
          <div className={styles.info}>
            <p>
              <strong>Name:</strong> {displayName} {displaySurname}
            </p>
            <p>
              <strong>Email:</strong> {displayEmail}
            </p>
          </div>
        ) : (
          <p className={styles.info}>No user data found. Please sign in.</p>
        )}

        <div className={styles.ordersSection}>
          <h2 className={styles.subtitle}>Order History</h2>
          {error && <p className={styles.info}>{error}</p>}
          {isLoadingOrders && <PageLoader compact minHeight="220px" />}
          {!isLoadingOrders && !orders.length && !error && (
            <p className={styles.info}>No orders yet.</p>
          )}
          {orders.map((order) => (
            <div key={order.orderId} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <span>Order #{order.orderId}</span>
                <span>
                  {new Date(order.createdAtUtc).toLocaleString()} —{" "}
                  {order.totalPrice.toFixed(2)} GEL
                </span>
              </div>
              <ul className={styles.orderItems}>
                {order.items.map((item, idx) => (
                  <li key={idx} className={styles.orderItem}>
                    <div>{item.productName}</div>
                    <div>
                      x{item.quantity} @ {item.unitPrice.toFixed(2)} GEL
                    </div>
                    <div className={styles.orderMeta}>
                      <span>Color: {item.color ?? "n/a"}</span>
                      <span>Size: {item.size ?? "n/a"}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button className={styles.logoutButton} onClick={() => setShowConfirm(true)}>
          Logout
        </button>
      </div>

      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p className={styles.modalText}>Are you sure you want to log out?</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button
                className={styles.modalConfirm}
                onClick={() => {
                  setShowConfirm(false);
                  handleLogout();
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

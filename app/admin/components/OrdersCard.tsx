import styles from "../page.module.css";
import type { Order } from "../types";

type Props = {
  orders: Order[];
};

export default function OrdersCard({ orders }: Props) {
  return (
    <section className={styles.card}>
      <h2>Orders</h2>
      <div className={styles.list}>
        {orders.map((order) => (
          <div key={order.orderId} className={styles.listItem}>
            <strong>Order #{order.orderId}</strong>
            <span>
              {order.customerName} • {order.customerEmail}
            </span>
            <span>
              {new Date(order.createdAtUtc).toLocaleString()} •{" "}
              {order.totalPrice.toFixed(2)} GEL
            </span>
            <span>{order.items.length} items</span>
            <div className={styles.subList}>
              {order.items.map((item) => (
                <div key={item.orderItemId} className={styles.subListItem}>
                  <span>
                    {item.productName} x{item.quantity}
                  </span>
                  <span>{item.unitPrice.toFixed(2)} GEL</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {orders.length === 0 ? <p>No orders yet.</p> : null}
      </div>
    </section>
  );
}

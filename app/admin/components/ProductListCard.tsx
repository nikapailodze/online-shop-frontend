import styles from "../page.module.css";
import type { Product } from "../types";

type Props = {
  products: Product[];
  deletingProductId: number | null;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
};

export default function ProductListCard({
  products,
  deletingProductId,
  onEdit,
  onDelete,
}: Props) {
  return (
    <section className={styles.card}>
      <h2>Products</h2>
      <div className={styles.list}>
        {products.map((product) => (
          <div key={product.id} className={styles.listItem}>
            <strong>{product.name}</strong>
            <span>{product.price.toFixed(2)} GEL</span>
            <span>{product.description}</span>
            <div className={styles.actions}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => onDelete(product.id)}
                disabled={deletingProductId === product.id}
              >
                {deletingProductId === product.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

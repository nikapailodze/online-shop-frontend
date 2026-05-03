"use client";

import Image from "next/image";
import styles from "../page.module.css";
import { fileToOptimizedDataUrl } from "../helpers";
import type { ProductFormState } from "../types";

type Props = {
  editingProductId: number | null;
  productForm: ProductFormState;
  setProductForm: React.Dispatch<React.SetStateAction<ProductFormState>>;
  productError: string | null;
  productImageError: string | null;
  isProductImageProcessing: boolean;
  isSubmittingProduct: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  setIsProductImageProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setProductImageError: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function ProductEditorCard({
  editingProductId,
  productForm,
  setProductForm,
  productError,
  productImageError,
  isProductImageProcessing,
  isSubmittingProduct,
  onSubmit,
  onCancel,
  setIsProductImageProcessing,
  setProductImageError,
}: Props) {
  return (
    <div className={styles.card}>
      <h2>{editingProductId !== null ? "Edit product" : "Create product"}</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          placeholder="Name"
          required
          value={productForm.name}
          onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))}
        />
        <textarea
          className={styles.textarea}
          placeholder="Description"
          required
          value={productForm.description}
          onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))}
        />
        <input
          className={styles.input}
          placeholder="Price"
          type="number"
          step="0.01"
          min="0"
          required
          value={productForm.price}
          onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))}
        />
        <input
          className={styles.input}
          placeholder="Sizes: S,M,L"
          value={productForm.sizes}
          onChange={(event) => setProductForm((current) => ({ ...current, sizes: event.target.value }))}
        />
        <input
          className={styles.input}
          placeholder="Colors: black,white"
          value={productForm.colors}
          onChange={(event) => setProductForm((current) => ({ ...current, colors: event.target.value }))}
        />
        <label className={styles.upload}>
          <span>Upload product image</span>
          <input
            type="file"
            accept="image/*"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              setProductImageError(null);

              if (!file) {
                setProductForm((current) => ({ ...current, imageUrl: "" }));
                return;
              }

              setIsProductImageProcessing(true);
              try {
                const dataUrl = await fileToOptimizedDataUrl(file);
                setProductForm((current) => ({ ...current, imageUrl: dataUrl }));
              } catch {
                setProductForm((current) => ({ ...current, imageUrl: "" }));
                setProductImageError("Unable to process that image. Try a JPG or PNG file.");
              } finally {
                setIsProductImageProcessing(false);
              }
            }}
          />
        </label>
        {isProductImageProcessing ? <p className={styles.info}>Processing image...</p> : null}
        {productImageError ? <p className={styles.error}>{productImageError}</p> : null}
        {productError ? <p className={styles.error}>{productError}</p> : null}
        {productForm.imageUrl ? (
          <Image
            src={productForm.imageUrl}
            alt="Product preview"
            width={240}
            height={240}
            unoptimized
            style={{
              width: "100%",
              maxWidth: "240px",
              height: "auto",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        ) : null}
        <button
          className={styles.button}
          type="submit"
          disabled={isProductImageProcessing || isSubmittingProduct}
        >
          {isSubmittingProduct
            ? editingProductId !== null
              ? "Saving..."
              : "Creating..."
            : editingProductId !== null
              ? "Save product"
              : "Create product"}
        </button>
        {editingProductId !== null ? (
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={onCancel}
            disabled={isSubmittingProduct}
          >
            Cancel
          </button>
        ) : null}
      </form>
    </div>
  );
}

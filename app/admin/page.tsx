"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { toApiUrl } from "../lib/api";
import { getStoredUser, getUserFromToken, isAdminUser } from "../lib/auth";
import { authHeaders } from "./helpers";
import BlogEditorCard from "./components/BlogEditorCard";
import BlogListCard from "./components/BlogListCard";
import CalculatorEditorCard from "./components/CalculatorEditorCard";
import CalculatorListCard from "./components/CalculatorListCard";
import ConsultationsCard from "./components/ConsultationsCard";
import OrdersCard from "./components/OrdersCard";
import ProductEditorCard from "./components/ProductEditorCard";
import ProductListCard from "./components/ProductListCard";
import {
  createEmptyCalculatorField,
  type Blog,
  type BlogFormState,
  type Calculator,
  type CalculatorField,
  type CalculatorFormState,
  type Consultation,
  type Order,
  type Product,
  type ProductFormState,
} from "./types";

export default function AdminPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingCalculatorId, setEditingCalculatorId] = useState<number | null>(null);
  const [isProductImageProcessing, setIsProductImageProcessing] = useState(false);
  const [productImageError, setProductImageError] = useState<string | null>(null);
  const [productError, setProductError] = useState<string | null>(null);
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
  const [calculatorError, setCalculatorError] = useState<string | null>(null);
  const [isSubmittingCalculator, setIsSubmittingCalculator] = useState(false);
  const [deletingCalculatorId, setDeletingCalculatorId] = useState<number | null>(null);

  const [blogForm, setBlogForm] = useState<BlogFormState>({
    title: "",
    excerpt: "",
    category: "Endocrinology",
    author: "",
    readTime: "5 min",
    content: "",
    tags: "",
    status: "published",
    featured: false,
    coverImage: "",
  });

  const [productForm, setProductForm] = useState<ProductFormState>({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    sizes: "S,M,L,XL",
    colors: "black,white",
  });

  const [calculatorForm, setCalculatorForm] = useState<CalculatorFormState>({
    title: "",
    slug: "",
    short: "",
    category: "General",
    description: "",
    resultLabel: "Result",
    status: "published",
    formula: "",
    fields: [createEmptyCalculatorField()],
  });

  const adminUser = useMemo(() => getStoredUser() ?? getUserFromToken(), []);

  useEffect(() => {
    if (!isAdminUser(adminUser)) {
      router.push("/login");
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          consultationResponse,
          blogResponse,
          productResponse,
          calculatorResponse,
          orderResponse,
        ] = await Promise.all([
          fetch(toApiUrl("/api/Consultations/admin/all"), {
            headers: authHeaders(),
          }),
          fetch(toApiUrl("/api/Blogs/admin/all"), {
            headers: authHeaders(),
          }),
          fetch(toApiUrl("/api/Products")),
          fetch(toApiUrl("/api/Calculators/admin/all"), {
            headers: authHeaders(),
          }),
          fetch(toApiUrl("/api/Orders/admin/all"), {
            headers: authHeaders(),
          }),
        ]);

        if (
          !consultationResponse.ok ||
          !blogResponse.ok ||
          !productResponse.ok ||
          !calculatorResponse.ok ||
          !orderResponse.ok
        ) {
          throw new Error("Unable to load admin data.");
        }

        const [
          consultationBody,
          blogBody,
          productBody,
          calculatorBody,
          orderBody,
        ] =
          await Promise.all([
            consultationResponse.json(),
            blogResponse.json(),
            productResponse.json(),
            calculatorResponse.json(),
            orderResponse.json(),
          ]);

        setConsultations(Array.isArray(consultationBody) ? consultationBody : []);
        setBlogs(Array.isArray(blogBody) ? blogBody : []);
        setProducts(Array.isArray(productBody) ? productBody : []);
        setCalculators(Array.isArray(calculatorBody) ? calculatorBody : []);
        setOrders(Array.isArray(orderBody) ? orderBody : []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [adminUser, router]);

  const resetBlogForm = useCallback(() => {
    setEditingBlogId(null);
    setBlogForm({
      title: "",
      excerpt: "",
      category: "Endocrinology",
      author: adminUser?.Name ? `${adminUser.Name} ${adminUser.Surname ?? ""}`.trim() : "",
      readTime: "5 min",
      content: "",
      tags: "",
      status: "published",
      featured: false,
      coverImage: "",
    });
  }, [adminUser?.Name, adminUser?.Surname]);

  useEffect(() => {
    resetBlogForm();
  }, [adminUser?.Email, resetBlogForm]);

  const resetProductForm = useCallback(() => {
    setEditingProductId(null);
    setProductError(null);
    setProductImageError(null);
    setProductForm({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      sizes: "S,M,L,XL",
      colors: "black,white",
    });
  }, []);

  const resetCalculatorForm = useCallback(() => {
    setEditingCalculatorId(null);
    setCalculatorError(null);
    setCalculatorForm({
      title: "",
      slug: "",
      short: "",
      category: "General",
      description: "",
      resultLabel: "Result",
      status: "published",
      formula: "",
      fields: [createEmptyCalculatorField()],
    });
  }, []);

  const refreshCalculators = useCallback(async () => {
    const response = await fetch(toApiUrl("/api/Calculators/admin/all"), {
      headers: authHeaders(),
    });
    const body = await response.json().catch(() => []);
    setCalculators(Array.isArray(body) ? body : []);
  }, []);

  const handleCalculatorFieldChange = useCallback(
    (
      index: number,
      key:
        | "name"
        | "label"
        | "type"
        | "unit"
        | "placeholder"
        | "defaultValue"
        | "options",
      value: string,
    ) => {
      setCalculatorForm((current) => ({
        ...current,
        fields: current.fields.map((field, fieldIndex) =>
          fieldIndex === index
            ? {
                ...field,
                ...(key === "options"
                  ? {
                      options: value
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((line) => {
                          const [label, rawValue] = line.split("=");
                          return {
                            label: (label || "").trim(),
                            value: (rawValue || "").trim(),
                          };
                        }),
                    }
                  : key === "type"
                    ? {
                        type: value as CalculatorField["type"],
                        options:
                          value === "select"
                            ? field.options
                            : [],
                        defaultValue:
                          value === "boolean" && field.defaultValue === ""
                            ? "0"
                            : field.defaultValue,
                      }
                    : { [key]: value }),
              }
            : field,
        ),
      }));
    },
    [],
  );

  const addCalculatorField = useCallback(() => {
    setCalculatorForm((current) => ({
      ...current,
      fields: [...current.fields, createEmptyCalculatorField()],
    }));
  }, []);

  const removeCalculatorField = useCallback((index: number) => {
    setCalculatorForm((current) => ({
      ...current,
      fields:
        current.fields.length === 1
          ? [createEmptyCalculatorField()]
          : current.fields.filter((_, fieldIndex) => fieldIndex !== index),
    }));
  }, []);

  const startEditCalculator = useCallback((calculator: Calculator) => {
    setEditingCalculatorId(calculator.id);
    setCalculatorError(null);
    setCalculatorForm({
      title: calculator.title,
      slug: calculator.slug,
      short: calculator.short,
      category: calculator.category,
      description: calculator.description ?? "",
      resultLabel: calculator.resultLabel,
      status: calculator.status,
      formula: calculator.formula,
      fields:
        calculator.fields.length > 0
          ? calculator.fields.map((field) => ({
              name: field.name,
              label: field.label,
              unit: field.unit ?? "",
              placeholder: field.placeholder ?? "",
              defaultValue:
                field.defaultValue == null ? "" : String(field.defaultValue),
              type: field.type ?? "number",
              options: Array.isArray(field.options)
                ? field.options.map((option) => ({
                    label: option.label,
                    value: String(option.value),
                  }))
                : [],
            }))
          : [createEmptyCalculatorField()],
    });
  }, []);

  const handleCalculatorSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCalculatorError(null);
    setIsSubmittingCalculator(true);

    try {
      const response = await fetch(
        editingCalculatorId !== null
          ? toApiUrl(`/api/Calculators/admin/${editingCalculatorId}`)
          : toApiUrl("/api/Calculators/admin"),
        {
          method: editingCalculatorId !== null ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
          },
          body: JSON.stringify({
            title: calculatorForm.title,
            slug: calculatorForm.slug,
            short: calculatorForm.short,
            category: calculatorForm.category,
            description: calculatorForm.description,
            resultLabel: calculatorForm.resultLabel,
            status: calculatorForm.status,
            formula: calculatorForm.formula,
            fields: calculatorForm.fields.map((field) => ({
              name: field.name.trim(),
              label: field.label.trim(),
              type: field.type,
              unit: field.unit.trim(),
              placeholder: field.placeholder.trim(),
              defaultValue:
                field.defaultValue.trim() === ""
                  ? null
                  : Number(field.defaultValue),
              options:
                field.type === "select"
                  ? field.options
                      .map((option) => ({
                        label: option.label.trim(),
                        value: Number(option.value),
                      }))
                      .filter(
                        (option) =>
                          option.label &&
                          Number.isFinite(option.value),
                      )
                  : [],
            })),
          }),
        },
      );

      const body = await response.json().catch(() => null);
      if (!response.ok) {
        const message = Array.isArray(body?.message)
          ? body.message.join(", ")
          : body?.message ?? "Unable to save calculator.";
        setCalculatorError(message);
        return;
      }

      await refreshCalculators();
      resetCalculatorForm();
    } catch (submitError) {
      setCalculatorError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save calculator.",
      );
    } finally {
      setIsSubmittingCalculator(false);
    }
  };

  const handleDeleteCalculator = async (calculatorId: number) => {
    setCalculatorError(null);
    setDeletingCalculatorId(calculatorId);

    try {
      const response = await fetch(toApiUrl(`/api/Calculators/admin/${calculatorId}`), {
        method: "DELETE",
        headers: authHeaders(),
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        const message = Array.isArray(body?.message)
          ? body.message.join(", ")
          : body?.message ?? "Unable to delete calculator.";
        setCalculatorError(message);
        return;
      }

      setCalculators((current) =>
        current.filter((calculator) => calculator.id !== calculatorId),
      );
      if (editingCalculatorId === calculatorId) {
        resetCalculatorForm();
      }
    } catch (deleteError) {
      setCalculatorError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete calculator.",
      );
    } finally {
      setDeletingCalculatorId(null);
    }
  };

  const handleBlogSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const endpoint = editingBlogId
      ? toApiUrl(`/api/Blogs/admin/${editingBlogId}`)
      : toApiUrl("/api/Blogs/admin");
    const method = editingBlogId ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({
        ...blogForm,
        tags: blogForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    });

    const body = await response.json().catch(() => null);
    if (!response.ok) {
      setError(body?.message ?? "Unable to save blog.");
      return;
    }

    const refresh = await fetch(toApiUrl("/api/Blogs/admin/all"), {
      headers: authHeaders(),
    });
    setBlogs(await refresh.json());
    resetBlogForm();
  };

  const startEditBlog = useCallback((blog: Blog) => {
    setEditingBlogId(blog.id);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime,
      content: blog.content,
      tags: blog.tags.join(", "),
      status: blog.status,
      featured: Boolean(blog.featured),
      coverImage: blog.coverImage ?? "",
    });
  }, []);

  const handleProductSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setProductError(null);
    setProductImageError(null);

    if (isProductImageProcessing) {
      setProductError("Image upload is still processing. Wait a moment and submit again.");
      return;
    }

    if (!productForm.imageUrl) {
      setProductError("Upload a product image before creating the product.");
      return;
    }

    setIsSubmittingProduct(true);

    try {
      const isEditingProduct = editingProductId !== null;
      const response = await fetch(
        isEditingProduct
          ? toApiUrl(`/api/Products/admin/${editingProductId}`)
          : toApiUrl("/api/Products/admin"),
        {
          method: isEditingProduct ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
          },
          body: JSON.stringify({
            name: productForm.name,
            description: productForm.description,
            price: Number(productForm.price),
            imageUrl: productForm.imageUrl,
            sizes: productForm.sizes.split(",").map((value) => value.trim()).filter(Boolean),
            colors: productForm.colors.split(",").map((value) => value.trim()).filter(Boolean),
          }),
        },
      );

      const body = await response.json().catch(() => null);
      if (!response.ok) {
        const message = Array.isArray(body?.message)
          ? body.message.join(", ")
          : body?.message ?? `Unable to ${isEditingProduct ? "update" : "create"} product.`;
        setProductError(message);
        return;
      }

      const refreshedProducts = await fetch(toApiUrl("/api/Products"));
      setProducts(await refreshedProducts.json());
      resetProductForm();
    } catch (submitError) {
      setProductError(
        submitError instanceof Error
          ? submitError.message
          : `Unable to ${editingProductId !== null ? "update" : "create"} product.`,
      );
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  const startEditProduct = useCallback((product: Product) => {
    setEditingProductId(product.id);
    setProductError(null);
    setProductImageError(null);
    setProductForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      imageUrl: product.imageUrl,
      sizes: product.sizes.join(","),
      colors: product.colors.join(","),
    });
  }, []);

  const handleDeleteProduct = async (productId: number) => {
    setProductError(null);
    setDeletingProductId(productId);

    try {
      const response = await fetch(toApiUrl(`/api/Products/admin/${productId}`), {
        method: "DELETE",
        headers: authHeaders(),
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        const message = Array.isArray(body?.message)
          ? body.message.join(", ")
          : body?.message ?? "Unable to delete product.";
        setProductError(message);
        return;
      }

      setProducts((current) => current.filter((product) => product.id !== productId));
      if (editingProductId === productId) {
        resetProductForm();
      }
    } catch (deleteError) {
      setProductError(
        deleteError instanceof Error ? deleteError.message : "Unable to delete product.",
      );
    } finally {
      setDeletingProductId(null);
    }
  };

  if (!isAdminUser(adminUser)) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Admin</p>
          <h1 className={styles.title}>Dashboard</h1>
        </div>
        <Link className={styles.link} href="/blogs">
          View blogs
        </Link>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}
      {loading ? <p className={styles.card}>Loading admin data...</p> : null}

      {!loading && (
        <>
          <section className={styles.grid}>
            <ConsultationsCard consultations={consultations} />
            <OrdersCard orders={orders} />
            <BlogEditorCard
              editingBlogId={editingBlogId}
              blogForm={blogForm}
              setBlogForm={setBlogForm}
              onSubmit={handleBlogSubmit}
              onCancel={resetBlogForm}
            />
          </section>

          <section className={styles.grid}>
            <BlogListCard blogs={blogs} onEdit={startEditBlog} />
            <ProductEditorCard
              editingProductId={editingProductId}
              productForm={productForm}
              setProductForm={setProductForm}
              productError={productError}
              productImageError={productImageError}
              isProductImageProcessing={isProductImageProcessing}
              isSubmittingProduct={isSubmittingProduct}
              onSubmit={handleProductSubmit}
              onCancel={resetProductForm}
              setIsProductImageProcessing={setIsProductImageProcessing}
              setProductImageError={setProductImageError}
            />
          </section>

          <ProductListCard
            products={products}
            deletingProductId={deletingProductId}
            onEdit={startEditProduct}
            onDelete={handleDeleteProduct}
          />

          <section className={styles.grid}>
            <CalculatorEditorCard
              editingCalculatorId={editingCalculatorId}
              calculatorForm={calculatorForm}
              calculatorError={calculatorError}
              isSubmittingCalculator={isSubmittingCalculator}
              onSubmit={handleCalculatorSubmit}
              onCancel={resetCalculatorForm}
              setCalculatorForm={setCalculatorForm}
              onFieldChange={handleCalculatorFieldChange}
              onAddField={addCalculatorField}
              onRemoveField={removeCalculatorField}
            />
            <CalculatorListCard
              calculators={calculators}
              deletingCalculatorId={deletingCalculatorId}
              onEdit={startEditCalculator}
              onDelete={handleDeleteCalculator}
            />
          </section>
        </>
      )}
    </div>
  );
}

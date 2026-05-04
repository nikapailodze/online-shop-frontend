"use client";

import Image from "next/image";
import styles from "./page.module.css";
import SizeSelector from "./Components/SizeSelector/SizeSelector";
import ColorSelector from "./Components/ColorsSelector/ColorsSelector";
import InformationCard from "./Components/InformationCard/InformationCard";
import { use, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useCartRef } from "@/app/Context/CartRefContext";
import { useCart } from "@/app/Context/CartContext";
import { API_BASE_URL } from "@/app/lib/api";
import PageLoader from "@/app/Components/PageLoader/PageLoader";

export type ColorOption = string;

interface Product {
  id: number;
  imageUrl: string;
  price: number;
  name: string;
  description: string;
  sizes: string[];
  colors: ColorOption[];
}

export default function Home({ params }: { params: Promise<{ id: string }> }) {
  const cartRef = useCartRef();
  const { addToCart } = useCart();
  const imageRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const [showFlyingImage, setShowFlyingImage] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = use(params);
  const productId = Number(id);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setStatus(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/Products/${productId}`);
        if (!response.ok) {
          throw new Error("Unable to load product.");
        }
        const body = await response.json();
        setProduct({
          id: body.id,
          imageUrl: body.imageUrl,
          price: body.price,
          name: body.name,
          description: body.description,
          sizes: body.sizes ?? [],
          colors: body.colors ?? [],
        });
        setSelectedSize(body.sizes?.[0] ?? null);
        setSelectedColor(body.colors?.[0] ?? null);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load product.";
        setStatus({ type: "error", message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize || !selectedColor) {
      setStatus({ type: "error", message: "Please choose a size and color first." });
      return;
    }

    const hasAnimationRefs =
      mainImageRef.current && cartRef?.current && imageRef.current;

    if (hasAnimationRefs) {
      const imgRect = mainImageRef.current!.getBoundingClientRect();
      const cartRect = cartRef!.current!.getBoundingClientRect();

      const flyImage = imageRef.current!;
      flyImage.style.left = `${imgRect.left}px`;
      flyImage.style.top = `${imgRect.top}px`;
      flyImage.style.opacity = "1";
      flyImage.style.width = "200px";

      setShowFlyingImage(true);

      gsap.to(flyImage, {
        duration: 0.8,
        left: cartRect.left,
        top: cartRect.top,
        width: 20,
        onComplete: () => setShowFlyingImage(false),
      });

      gsap.to(flyImage, {
        duration: 0.3,
        opacity: 0,
        delay: 0.5,
      });
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description,
      quantity: 1,
      color: selectedColor,
      size: selectedSize,
    })
      .then(() => setStatus({ type: "success", message: "Added to cart." }))
      .catch((error) => {
        const message =
          error instanceof Error ? error.message : "Unable to add to cart.";
        setStatus({ type: "error", message });
      });
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <PageLoader compact minHeight="320px" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <p className={styles.description}>Product not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {}
      <div
        ref={imageRef}
        style={{
          position: "fixed",
          zIndex: 1000,
          width: 200,
          height: "auto",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        {showFlyingImage && (
          <Image
            src={product.imageUrl}
            width={535}
            height={800}
            alt={product.name}
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </div>

      <section className={styles.mainInfoWrapper}>
        <div className={styles.mainImageWrapper} ref={mainImageRef}>
          <Image
            src={product.imageUrl}
            width={535}
            height={800}
            alt={product.name}
            className={styles.mainImage}
          />
        </div>

        <div className={styles.mainInfoContent}>
          <div className={styles.mainInfo}>
            <div className={styles.titlesWrapper}>
              <h1 className={styles.heading2}>{product.name}</h1>
              <p className={styles.description}>{product.description}</p>
            </div>

            <p className={styles.heading3}>{product.price} GEL</p>

            <div className={styles.slectionWrapper}>
              <div className={styles.sizesWrapper}>
                <h3 className={styles.heading3}>Size</h3>
                <SizeSelector
                  sizes={product.sizes}
                  disabledSizes={[]}
                  selectedSize={selectedSize}
                  onSelect={(size) => setSelectedSize(size)}
                />
              </div>
              <div className={styles.sizesWrapper}>
                <h3 className={styles.heading3}>Color</h3>
                <ColorSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onSelect={(color) => setSelectedColor(color)}
                />
              </div>
            </div>

            <div className={styles.buttonWrapper}>
              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
              {status && (
                <p
                  className={styles.description}
                  style={{ color: status.type === "error" ? "#c0392b" : "#2ecc71" }}
                >
                  {status.message}
                </p>
              )}
            </div>
          </div>

          <div className={styles.informationWrapper}>
            <InformationCard
              title="What's your return policy?"
              description="Items can be exchanged for another product within 14 days."
            />
            <InformationCard
              title="How long does shipping take?"
              description="Shipping is immediate or within 4 days if in stock."
            />
            <InformationCard
              title="How is the product delivered?"
              description="We deliver via courier. Shipping cost varies by location."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

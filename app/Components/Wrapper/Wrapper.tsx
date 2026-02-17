'use client'
import styles from "./Wrapper.module.scss";
import React, { ReactNode } from "react";
import Navigaton from "../Navigaton/Navigaton";
import { CartRefProvider } from "@/app/Context/CartRefContext";
import { CartProvider } from "@/app/Context/CartContext";
import { LanguageProvider } from "@/app/Context/LanguageContext";
import LanguageRuntimeTranslator from "../LanguageRuntimeTranslator/LanguageRuntimeTranslator";
import FooterSection from "../FooterSection/FooterSection";
import { usePathname } from "next/navigation";

interface WrapperProps {
  children: ReactNode;
}
const excludedPaths = ["/login", "/signup"];

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const pathName = usePathname();
  const isExcludedPath = excludedPaths.includes(pathName);
  return (
    <div className={styles.container}>
      <CartRefProvider>
        <CartProvider>
          <LanguageProvider>
            <LanguageRuntimeTranslator />
            {!isExcludedPath && <Navigaton />}
            <div className={styles.wrapper}>{children}</div>
            <FooterSection />
          </LanguageProvider>
        </CartProvider>
      </CartRefProvider>
    </div>
  );
};

export default Wrapper;

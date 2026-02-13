"use client";
import styles from "./Navigaton.module.scss";
import { BsCart4, BsChevronDown, BsGlobe2 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import NavItems from "./Components/NavItems/NavItems";
import { useEffect, useRef, useState } from "react";
import Clock from "./Components/Clock/Clock";
import AsideCart from "../AsideCart/AsideCart";
import { useRouter } from "next/navigation";
import { useCartRef } from "@/app/Context/CartRefContext";
import { useCart } from "@/app/Context/CartContext";
import Image from "next/image";

type LanguageCode = "en" | "ka";

const Navigaton = () => {
  const [showNavItems, setShowNavItems] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const cartRef = useCartRef();
  const { toggleCart, isCartOpen, closeCart } = useCart();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage === "en" || savedLanguage === "ka") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("selectedLanguage", language);
  }, [language]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocumentClick);

    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
    };
  }, []);

  const languageLabel = language === "en" ? "EN" : "GE";

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navContent}>
        <nav className={styles.nav}>
          <div onClick={() => router.push("/")} className={styles.logo}>
            <Image
              src="/Logo/logoName.png"
              alt="Endopail"
              width={140}
              height={32}
              className={styles.logoImage}
              priority
            />
          </div>

          <div className={styles.navItemsRight}>
            <div className={styles.languageMenu} ref={languageMenuRef}>
              <button
                type="button"
                className={styles.languageTrigger}
                onClick={() => setIsLanguageOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={isLanguageOpen}
                aria-label="Select language"
              >
                <BsGlobe2 />
                <span>{languageLabel}</span>
                <BsChevronDown
                  className={`${styles.chevron} ${
                    isLanguageOpen ? styles.chevronOpen : ""
                  }`}
                />
              </button>
              {isLanguageOpen && (
                <div className={styles.languageDropdown} role="menu">
                  <button
                    type="button"
                    className={styles.languageOption}
                    onClick={() => {
                      setLanguage("en");
                      setIsLanguageOpen(false);
                    }}
                    role="menuitem"
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    className={styles.languageOption}
                    onClick={() => {
                      setLanguage("ka");
                      setIsLanguageOpen(false);
                    }}
                    role="menuitem"
                  >
                    GE
                  </button>
                </div>
              )}
            </div>
            <div className={styles.timeWrapper}>
              <Clock />
            </div>
            <div onClick={() => setShowNavItems((prev) => !prev)}>
              <div className={styles.burgerMenu}>
                <RxHamburgerMenu />
              </div>
            </div>
            <div>
              <div
                className={styles.cartIcon}
                onClick={toggleCart}
                ref={cartRef}
              >
                <BsCart4 />
              </div>
            </div>
          </div>
        </nav>

        <AsideCart isOpen={isCartOpen} onClose={closeCart} />
        <NavItems
          isOpen={showNavItems}
          onClose={() => setShowNavItems(false)}
        />
      </div>
    </div>
  );
};

export default Navigaton;

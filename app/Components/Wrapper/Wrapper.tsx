import styles from "./Wrapper.module.scss";
import React, { ReactNode } from "react";
import Navigaton from "../Navigaton/Navigaton";
import { CartRefProvider } from "@/app/Context/CartRefContext";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <CartRefProvider>
        <Navigaton />
        <div className={styles.wrapper}>{children}</div>
      </CartRefProvider>
    </div>
  );
};

export default Wrapper;

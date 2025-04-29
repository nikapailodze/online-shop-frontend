import styles from "./Wrapper.module.scss";
import React, { ReactNode } from "react";
import Navigaton from "../Navigaton/Navigaton";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Navigaton />
      {children}
    </div>
  );
};

export default Wrapper;

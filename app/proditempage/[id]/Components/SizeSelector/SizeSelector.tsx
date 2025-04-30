import { useState } from "react";
import styles from "./SizesSelector.module.scss";

interface SizeSelectorProps {
  sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[];
  disabledSizes?: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[];
}

const SizeSelector = ({ sizes, disabledSizes = [] }: SizeSelectorProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleClick = (size: "XS" | "S" | "M" | "L" | "XL" | "XXL") => {
    if (!disabledSizes.includes(size)) {
      setSelectedSize(size);
    }
  };

  return (
    <div className={styles.sizes}>
      {sizes.map((size) => {
        const isDisabled = disabledSizes.includes(size);
        const isActive = selectedSize === size;

        return (
          <div
            key={size}
            className={`${styles.size} ${isActive ? styles.active : ""} ${isDisabled ? styles.disabled : ""}`}
            onClick={() => handleClick(size)}
          >
            {size}
          </div>
        );
      })}
    </div>
  );
};

export default SizeSelector;

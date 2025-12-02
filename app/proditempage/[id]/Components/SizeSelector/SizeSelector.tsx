import { useEffect, useState } from "react";
import styles from "./SizesSelector.module.scss";

interface SizeSelectorProps {
  sizes: string[];
  disabledSizes?: string[];
  selectedSize?: string | null;
  onSelect?: (size: string) => void;
}

const SizeSelector = ({
  sizes,
  disabledSizes = [],
  selectedSize,
  onSelect,
}: SizeSelectorProps) => {
  const [currentSize, setCurrentSize] = useState<string | null>(selectedSize ?? null);

  useEffect(() => {
    setCurrentSize(selectedSize ?? null);
  }, [selectedSize]);

  const handleClick = (size: string) => {
    if (!disabledSizes.includes(size)) {
      setCurrentSize(size);
      onSelect?.(size);
    }
  };

  const isSelected = (size: string) => currentSize === size;

  return (
    <div className={styles.sizes}>
      {sizes.map((size) => {
        const isDisabled = disabledSizes.includes(size);
        const isActive = isSelected(size);

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

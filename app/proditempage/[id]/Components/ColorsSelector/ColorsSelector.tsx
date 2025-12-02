import { useEffect, useState } from "react";
import styles from "../SizeSelector/SizesSelector.module.scss";

interface ColorSelectorProps {
  colors: string[];
  selectedColor?: string | null;
  onSelect?: (color: string) => void;
}

const ColorSelector = ({ colors, selectedColor, onSelect }: ColorSelectorProps) => {
  const [currentColor, setCurrentColor] = useState<string | null>(selectedColor ?? null);

  useEffect(() => {
    setCurrentColor(selectedColor ?? null);
  }, [selectedColor]);

  const handleClick = (color: string) => {
    setCurrentColor(color);
    onSelect?.(color);
  };

  return (
    <div className={styles.sizes}>
      {colors.map((color) => {
        const isActive = currentColor === color;

        return (
          <div
            key={color}
            className={`${styles.size} ${isActive ? styles.active : ""}`}
            onClick={() => handleClick(color)}
          >
            {color}
          </div>
        );
      })}
    </div>
  );
};

export default ColorSelector;

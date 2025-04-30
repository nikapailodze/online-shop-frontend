import { useState } from "react";
import styles from "../SizeSelector/SizesSelector.module.scss"; // reuse same styles

type ColorOption = "black" | "blue" | "white" | "gray" | "brown";

interface ColorSelectorProps {
  colors: ColorOption[];
}

const ColorSelector = ({ colors }: ColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

  const handleClick = (color: ColorOption) => {
    setSelectedColor(color);
  };

  return (
    <div className={styles.sizes}>
      {colors.map((color) => {
        const isActive = selectedColor === color;

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

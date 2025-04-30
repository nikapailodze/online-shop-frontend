import ShoppingItem from "../ShoppingItem/ShoppingItem";
import styles from "./ProductionSection.module.scss";

interface ProductionSectionProps {
  dropNumber: string;
}
const ProductionSection = ({ dropNumber }: ProductionSectionProps) => (
  <section className={styles.productionSection}>
    <div className={styles.content}>
      <h2 className={styles.productionTitle}>DROP // {dropNumber}</h2>

      <div className={styles.productionItemsWrapper}>
        <ShoppingItem
          imageUrl="/test/manHandUp.avif"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/shopfinalbss-removebg-preview.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/tralaleoShirt.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
      </div>
    </div>
  </section>
);

export default ProductionSection;

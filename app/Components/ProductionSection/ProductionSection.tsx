import ShoppingItem from "../ShoppingItem/ShoppingItem";
import styles from "./ProductionSection.module.scss";


const ProductionSection = () => (
  <section className={styles.productionSection}>
    <div className={styles.content}>
      <h2 className={styles.productionTitle}>Wear Your Hormones Proudly</h2>

      <div className={styles.productionItemsWrapper}>
        <ShoppingItem
          imageUrl="/merch2.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/merch1.png"
          name={"VANTA Coat"}
          price={320}
          description={
            "Extreme warmth meets sculptural form. A cocoon of protection, designed for resilience."
          }
        />
        <ShoppingItem
          imageUrl="/merch3.png"
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

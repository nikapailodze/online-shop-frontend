import Image from "next/image";
import styles from "./PageLoader.module.css";

type PageLoaderProps = {
  compact?: boolean;
  minHeight?: string;
};

const PageLoader = ({ compact = false, minHeight }: PageLoaderProps) => {
  return (
    <div
      className={`${styles.overlay} ${compact ? styles.compact : ""}`}
      style={minHeight ? { minHeight } : undefined}
    >
      <div className={styles.inner}>
        <Image
          src="/gif/endopai-loader.webp"
          alt="Endopai loading"
          width={440}
          height={430}
          unoptimized
          className={`${styles.image} ${compact ? styles.imageCompact : ""}`}
          priority
        />
      </div>
    </div>
  );
};

export default PageLoader;

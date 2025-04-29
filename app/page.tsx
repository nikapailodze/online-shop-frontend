// import Image from "next/image";
import Navigaton from "./Components/Navigaton/Navigaton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigaton/>
    </div>
  );
}

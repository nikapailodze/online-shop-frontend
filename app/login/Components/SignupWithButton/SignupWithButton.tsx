import styles from "./SignupWithButton.module.scss";
import { RiGoogleFill, RiAppleLine, RiFacebookFill } from "react-icons/ri";

interface Props {
  type: "google" | "apple" | "facebook";
}

const SignupWithButton = (props: Props) => {
  return (
    <button
      className={`${styles.btn} ${
        props.type === "google"
          ? styles.google
          : props.type === "apple"
          ? styles.apple
          : styles.facebook
      }`}
    >
      {props.type === "google" && <RiGoogleFill color="white" size={20} />}

      {props.type === "apple" && (
        <div className={styles.iconCircle}>
          <RiAppleLine color="white" size={20} />
        </div>
      )}

      {props.type === "facebook" && (
        <div className={styles.iconCircle}>
          <RiFacebookFill color="white" size={20} />
        </div>
      )}

      <span>
        Sign up with {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
      </span>
    </button>
  );
};

export default SignupWithButton;

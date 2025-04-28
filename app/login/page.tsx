// import Image from "next/image";
"use client";
import styles from "./page.module.css";
import SignupWithButton from "./Components/SignupWithButton/SignupWithButton";
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}
export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className={styles.page}>
      <div className={styles.leftPart}></div>

      <span className={styles.signUpIndicator}>
        Already have an account?{" "}
        <a className={styles.signUpIndicatorAnch} href="">
          Log in
        </a>
      </span>
      <div className={styles.rightPart}>
        <div className={styles.content}>
          <div className={styles.conntentUpper}>
            <h1 className={styles.title}>Sign Up</h1>

            <div className={styles.btnsWrapper}>
              <SignupWithButton type="google" />
              <SignupWithButton type="facebook" />
              <SignupWithButton type="apple" />
            </div>
          </div>

          <div className={styles.orWrapper}>
            <div className={styles.orLine}></div>
            <span className={styles.orText}>OR</span>
            <div className={styles.orLine}></div>
          </div>

          <div className={styles.contentLower}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.labelWrapper}>
                  <label className={styles.label} htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="First Name"
                    className={styles.input}
                  />
                  {errors.firstName && (
                    <span className={styles.error}>
                      {errors.firstName.message as string}
                    </span>
                  )}
                </div>

                <div className={styles.labelWrapper}>
                  <label className={styles.label} htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Last Name"
                    className={styles.input}
                  />
                  {errors.lastName && (
                    <span className={styles.error}>
                      {errors.lastName.message as string}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.labelWrapper}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                  type="email"
                  className={styles.input}
                />
                {errors.email && (
                  <span className={styles.error}>
                    {errors.email.message as string}
                  </span>
                )}
              </div>

              <div className={styles.labelWrapper}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                  type="password"
                  className={styles.input}
                />
                {errors.password && (
                  <span className={styles.error}>
                    {errors.password.message as string}
                  </span>
                )}
              </div>

              <div className={styles.terms}>
                <input
                  {...register("terms", {
                    required: "You must accept the terms and policies",
                  })}
                  type="checkbox"
                  className={styles.checkbox}
                  id="terms"
                />
                <label className={styles.termsText} htmlFor="terms">
                  I agree to the terms and policies
                </label>
                {errors.terms && (
                  <span className={styles.error}>
                    {errors.terms.message as string}
                  </span>
                )}
              </div>

              <button type="submit" className={styles.submitButton}>
                Create an Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

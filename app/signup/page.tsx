"use client";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_BASE_URL } from "../lib/api";
import { clearAuth } from "../lib/auth";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export default function Home() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"error" | "success" | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    setStatusMessage(null);
    setStatusType(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/Auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.firstName,
          surname: data.lastName,
          email: data.email,
          password: data.password,
        }),
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body?.message ?? "Failed to create account");
      }

      clearAuth();
      setStatusMessage("Account created! Redirecting to login...");
      setStatusType("success");
      router.push("/login");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create account.";
      setStatusMessage(message);
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.leftPart}></div>

      <div className={styles.rightPart}>
        <div className={styles.content}>
          <div className={styles.conntentUpper}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Sign Up</h1>
            </div>

          </div>


          <div className={styles.contentLower}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.maininputWrapper}>
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
              </div>
              <div className={styles.lowerInputWrapper}>
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
                {statusMessage && (
                  <p
                    className={`${styles.statusMessage} ${
                      statusType === "error"
                        ? styles.statusError
                        : styles.statusSuccess
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create an Account"}
                </button>
                <span className={styles.signUpIndicator}>
                  Already have an account?
                  <a className={styles.signUpIndicatorAnch} href="login">
                    Log in
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

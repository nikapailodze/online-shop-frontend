"use client";
import styles from "./page.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

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
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setStatusMessage(null);
    setStatusType(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body?.message ?? "Failed to sign in");
      }

      if (!body?.token) {
        throw new Error("Authentication token is missing in the response.");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", body.token);
        if (body?.user) {
          localStorage.setItem("user", JSON.stringify(body.user));
        }
      }

      setStatusMessage("Signed in successfully. Redirecting...");
      setStatusType("success");
      router.push("/shop");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in.";
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
              <span className={styles.signUpIndicator}>
                Don&apos;t have an account?{" "}
                <a className={styles.signUpIndicatorAnch} href="signup">
                  Sign Up
                </a>
              </span>
              <h1 className={styles.title}>Sign In</h1>
            </div>

          </div>



          <div className={styles.contentLower}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.maininputWrapper}>

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
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

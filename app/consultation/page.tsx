"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { API_BASE_URL } from "../lib/api";
import { getStoredToken, getStoredUser, getUserFromToken } from "../lib/auth";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const getTodayIso = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
};

export default function ConsultationPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    idNumber: "",
    reason: "",
    date: "",
    time: "",
  });

  const minDate = useMemo(() => getTodayIso(), []);

  useEffect(() => {
    const stored = getStoredUser() ?? getUserFromToken();
    if (!stored) {
      router.push("/login");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      name: stored.Name ?? prev.name,
      surname: stored.Surname ?? prev.surname,
      email: stored.Email ?? prev.email,
    }));
  }, [router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeSelect = (slot: string) => {
    setFormData((prev) => ({
      ...prev,
      time: slot,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    if (!formData.time) {
      setStatus("error");
      setStatusMessage("Please select a time slot.");
      return;
    }

    const token = getStoredToken();
    if (!token) {
      setStatus("error");
      setStatusMessage("Please sign in again to schedule your consultation.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`${API_BASE_URL}/api/Consultations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phoneNumber: formData.phone,
          idNumber: formData.idNumber || null,
          reason: formData.reason,
          date: formData.date,
          time: formData.time,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to schedule consultation.");
      }

      setStatus("success");
      setStatusMessage("Consultation scheduled! We will email you with the details.");
      setFormData((prev) => ({
        ...prev,
        phone: "",
        idNumber: "",
        reason: "",
      }));
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Schedule online consultation</span>
        <h1 className={styles.title}>Pick a date and time</h1>
        <p className={styles.subtitle}>
          Tell us what you need and our admin will confirm the appointment via email.
        </p>
      </div>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="date">
              Choose a date
            </label>
            <input
              className={styles.input}
              type="date"
              id="date"
              name="date"
              min={minDate}
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Available times</label>
            <div className={styles.timeGrid}>
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`${styles.timeButton} ${
                    formData.time === slot ? styles.timeSelected : ""
                  }`}
                  onClick={() => handleTimeSelect(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="surname">
                Surname
              </label>
              <input
                className={styles.input}
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="phone">
                Phone number
              </label>
              <input
                className={styles.input}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="idNumber">
              ID number (optional)
            </label>
            <input
              className={styles.input}
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="reason">
              Consultation reason
            </label>
            <textarea
              className={styles.textarea}
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          {statusMessage && (
            <div
              className={`${styles.status} ${
                status === "success" ? styles.statusSuccess : styles.statusError
              }`}
            >
              {statusMessage}
            </div>
          )}

          <button className={styles.submit} type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Scheduling..." : "Submit consultation"}
          </button>
        </form>

        <aside className={styles.summary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Your booking</h2>
            <div className={styles.summaryItem}>
              <span>Date</span>
              <strong>{formData.date || "Select a date"}</strong>
            </div>
            <div className={styles.summaryItem}>
              <span>Time</span>
              <strong>{formData.time || "Select a time"}</strong>
            </div>
            <div className={styles.summaryItem}>
              <span>Name</span>
              <strong>
                {formData.name || "Your name"} {formData.surname || ""}
              </strong>
            </div>
            <div className={styles.summaryDivider} />
            <p className={styles.summaryText}>
              We will send the appointment confirmation to {formData.email || "your email"}.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

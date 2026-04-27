"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { API_BASE_URL } from "../lib/api";
import { getStoredToken, getStoredUser, getUserFromToken } from "../lib/auth";
import Image from "next/image";
import { FiUser, FiMail, FiPhone, FiCreditCard, FiCalendar, FiSend } from "react-icons/fi";

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
  const [step, setStep] = useState<1 | 2 | 3>(1);
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

      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        const apiMessage =
          typeof body?.message === "string"
            ? body.message
            : Array.isArray(body?.message)
            ? body.message.join(" ")
            : "Unable to schedule consultation.";
        throw new Error(apiMessage);
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
        error instanceof TypeError
          ? "Unable to reach the consultation server. Please make sure the backend is running."
          : error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const canProceedFromStep1 = Boolean(formData.date && formData.time);
  const canProceedFromStep2 = Boolean(
    formData.name && formData.surname && formData.email && formData.phone && formData.reason
  );
  const isStep1Complete = step >= 2;
  const isStep2Complete = step >= 3;

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader} />
          <div className={styles.profileCard}>
            <div className={styles.avatar}>
              <Image src="/drPicture/drPic.JPG" alt="Doctor" width={64} height={64} />
            </div>
            <div className={styles.profileMeta}>
              <span>Clinical Lead</span>
              <strong>Dr. Mariami Pailodze</strong>
            </div>
          </div>
          <div className={styles.stepTimeline}>
            <div
              className={`${step === 1 ? styles.stepItemActive : styles.stepItemMuted} ${
                isStep1Complete ? styles.stepCompleted : ""
              }`}
            >
              <div className={styles.stepIcon}>
                <FiCalendar />
              </div>
              <div className={styles.stepContent}>
                <strong>Choose date</strong>
                <span>{formData.date || "Not selected"}</span>
              </div>
            </div>
            <div className={`${styles.stepLine} ${isStep1Complete ? styles.stepLineFilled : ""}`}>
              <span className={styles.stepLineFill} />
            </div>
            <div
              className={`${step === 1 ? styles.stepItemMuted : styles.stepItemActive} ${
                isStep2Complete ? styles.stepCompleted : ""
              }`}
            >
              <div className={styles.stepIcon}>
                <FiUser />
              </div>
              <div className={styles.stepContent}>
                <strong>Information</strong>
                <span>Enter details</span>
              </div>
            </div>
            <div className={`${styles.stepLine} ${isStep2Complete ? styles.stepLineFilled : ""}`}>
              <span className={styles.stepLineFill} />
            </div>
            <div className={step === 3 ? styles.stepItemActive : styles.stepItemMuted}>
              <div className={styles.stepIcon}>
                <FiSend />
              </div>
              <div className={styles.stepContent}>
                <strong>Send</strong>
                <span>Review & submit</span>
              </div>
            </div>
          </div>
        </aside>

        <section className={styles.content}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Schedule online consultation</span>
            {step === 1 && <h1 className={styles.title}>Pick a date and time</h1>}
            {step === 2 && <h1 className={styles.title}>Enter your details</h1>}
            {step === 3 && <h1 className={styles.title}>Review your request</h1>}
            <p className={styles.subtitle}>
              Tell us what you need and our admin will confirm the appointment via email.
            </p>
          </div>

          <div className={styles.layout}>
            <form className={styles.form} onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="date">
                  Choose a date
                </label>
                <div className={styles.inputRow}>
                  <span className={styles.inputIcon}>
                    <FiCalendar />
                  </span>
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
                </>
              )}

              {step === 3 && (
                <div className={styles.reviewCard}>
                  <div className={styles.reviewItem}>
                    <span>Date</span>
                    <strong>{formData.date || "Not selected"}</strong>
                  </div>
                  <div className={styles.reviewItem}>
                    <span>Time</span>
                    <strong>{formData.time || "Not selected"}</strong>
                  </div>
                  <div className={styles.reviewItem}>
                    <span>Name</span>
                    <strong>
                      {formData.name || "Not provided"} {formData.surname || ""}
                    </strong>
                  </div>
                  <div className={styles.reviewItem}>
                    <span>Email</span>
                    <strong>{formData.email || "Not provided"}</strong>
                  </div>
                  <div className={styles.reviewItem}>
                    <span>Phone</span>
                    <strong>{formData.phone || "Not provided"}</strong>
                  </div>
                  <div className={styles.reviewItem}>
                    <span>ID Number</span>
                    <strong>{formData.idNumber || "Not provided"}</strong>
                  </div>
                  <div className={styles.reviewItemFull}>
                    <span>Reason</span>
                    <p>{formData.reason || "Not provided"}</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <>
                  <div className={styles.fieldRow}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="name">
                Name
              </label>
              <div className={styles.inputRow}>
                <span className={styles.inputIcon}>
                  <FiUser />
                </span>
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
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="surname">
                Surname
              </label>
              <div className={styles.inputRow}>
                <span className={styles.inputIcon}>
                  <FiUser />
                </span>
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
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <div className={styles.inputRow}>
                <span className={styles.inputIcon}>
                  <FiMail />
                </span>
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
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="phone">
                Phone number
              </label>
              <div className={styles.inputRow}>
                <span className={styles.inputIcon}>
                  <FiPhone />
                </span>
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
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="idNumber">
              ID number (optional)
            </label>
            <div className={styles.inputRow}>
              <span className={styles.inputIcon}>
                <FiCreditCard />
              </span>
              <input
                className={styles.input}
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </div>
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
                </>
              )}

          <div
            className={`${styles.statusSlot} ${
              statusMessage
                ? `${styles.status} ${status === "success" ? styles.statusSuccess : styles.statusError}`
                : ""
            }`}
          >
            {statusMessage}
          </div>

              <div className={styles.actions}>
                {step > 1 && (
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3)}
                  >
                    Back
                  </button>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    className={styles.submit}
                    onClick={() => {
                      if (step === 1 && !canProceedFromStep1) {
                        setStatus("error");
                        setStatusMessage("Please select a date and time.");
                        return;
                      }
                      if (step === 2 && !canProceedFromStep2) {
                        setStatus("error");
                        setStatusMessage("Please complete all required fields.");
                        return;
                      }
                      setStatusMessage("");
                      setStep((prev) => (prev + 1) as 1 | 2 | 3);
                    }}
                  >
                    Next
                  </button>
                )}
                {step === 3 && (
                  <button className={styles.submit} type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Scheduling..." : "Submit consultation"}
                  </button>
                )}
              </div>
            </form>

          </div>
        </section>
      </div>
    </div>
  );
}

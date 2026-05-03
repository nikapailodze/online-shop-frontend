import styles from "../page.module.css";
import type { Consultation } from "../types";

export default function ConsultationsCard({
  consultations,
}: {
  consultations: Consultation[];
}) {
  return (
    <div className={styles.card}>
      <h2>Consultations</h2>
      <div className={styles.list}>
        {consultations.map((consultation) => (
          <div key={consultation.id} className={styles.listItem}>
            <strong>
              {consultation.name} {consultation.surname}
            </strong>
            <span>{consultation.email}</span>
            <span>{consultation.phoneNumber}</span>
            <span>
              {consultation.date} at {consultation.time}
            </span>
            <span>{consultation.reason}</span>
          </div>
        ))}
        {consultations.length === 0 ? <p>No consultations yet.</p> : null}
      </div>
    </div>
  );
}

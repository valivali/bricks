import React from "react"
import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"
import { INSPECTION_CLASSIFICATION_OPTIONS } from "../structureIdOptions"
import type { StructureIdSectionBaseProps } from "../sectionTypes"

export const InspectionsSection: React.FC<StructureIdSectionBaseProps> = ({ register, isReadonly }) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      סקירות
    </Title>

    <div className={styles.grid}>
      <label className={styles.field}>
        <span className={styles.label}>13.1 סיווג לסקירה</span>
        <select {...register("inspectionClassification")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {INSPECTION_CLASSIFICATION_OPTIONS.map(option => (
            <option key={`inspection-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.2 תאריך ביצוע סקירה ראשונית</span>
        <input type="date" {...register("initialInspectionDate")} className={styles.input} disabled={isReadonly} />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.3 תאריך ביצוע סקירה שגרתית אחרונה</span>
        <input type="date" {...register("lastRoutineInspectionDate")} className={styles.input} disabled={isReadonly} />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.4 תדירות ביצוע סקירה שגרתית (חודשים) *</span>
        <input type="text" {...register("routineInspectionFrequency")} className={styles.input} disabled={true} />
        <span className={styles.restricted}>שדה מוגבל</span>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.5 סקירה לבקרת נזקים</span>
        <input type="date" {...register("damageControlInspectionDate")} className={styles.input} disabled={isReadonly} />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.6 סקירה תת מימית</span>
        <input type="date" {...register("underwaterInspectionDate")} className={styles.input} disabled={isReadonly} />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.7 סקירה מעמיקה</span>
        <input type="date" {...register("thoroughInspectionDate")} className={styles.input} disabled={isReadonly} />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.8 סקירה מיוחדת אחרת</span>
        <input type="date" {...register("specialInspectionDate")} className={styles.input} disabled={isReadonly} />
      </label>
    </div>
  </section>
)

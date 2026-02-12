import React from "react"

import { FieldError } from "@/components/structure-id/FieldError"
import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"
import { INSPECTION_CLASSIFICATION_OPTIONS } from "../structureIdOptions"

export const InspectionsSection: React.FC<StructureIdSectionBaseProps> = ({ register, errors, isReadonly }) => (
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
        <FieldError errors={errors} name="inspectionClassification" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.2 תאריך ביצוע סקירה ראשונית</span>
        <input type="date" {...register("initialInspectionDate")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="initialInspectionDate" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.3 תאריך ביצוע סקירה שגרתית אחרונה</span>
        <input type="date" {...register("lastRoutineInspectionDate")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="lastRoutineInspectionDate" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.4 תדירות ביצוע סקירה שגרתית (חודשים) *</span>
        <input type="text" {...register("routineInspectionFrequency")} className={styles.input} disabled={true} />
        <span className={styles.restricted}>שדה מוגבל</span>
        <FieldError errors={errors} name="routineInspectionFrequency" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.5 סקירה לבקרת נזקים</span>
        <input type="date" {...register("damageControlInspectionDate")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="damageControlInspectionDate" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.6 סקירה תת מימית</span>
        <input type="date" {...register("underwaterInspectionDate")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="underwaterInspectionDate" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.7 סקירה מעמיקה</span>
        <input type="date" {...register("thoroughInspectionDate")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="thoroughInspectionDate" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>13.8 סקירה מיוחדת אחרת</span>
        <input type="date" {...register("specialInspectionDate")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="specialInspectionDate" />
      </label>
    </div>
  </section>
)

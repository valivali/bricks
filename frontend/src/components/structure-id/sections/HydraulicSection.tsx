import React from "react"

import { Text, Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"

export const HydraulicSection: React.FC<StructureIdSectionBaseProps> = ({ register }) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      נתונים הידראוליים (כל השדות מוגבלים)
    </Title>

    <div className={styles.grid}>
      <label className={styles.field}>
        <span className={styles.label}>9.1 מפלס יחסי מחושב מרבי *</span>
        <input type="text" {...register("maxRelativeLevel")} className={styles.input} disabled={true} />
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>9.2 תקופת חזרה הידראולית מתוכננת *</span>
        <input type="text" {...register("designReturnPeriod")} className={styles.input} disabled={true} />
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>9.3 התאמה הידראולית *</span>
        <select {...register("hydraulicAdequacy")} className={styles.select} disabled={true}>
          <option value="">בחר</option>
          <option value="9.3-1">מתאים</option>
          <option value="9.3-2">לא מתאים</option>
        </select>
        <span className={styles.restricted}>שדה מוגבל</span>
      </label>
    </div>
  </section>
)

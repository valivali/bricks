import React from "react"
import { Text, Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"
import type { StructureIdSectionBaseProps } from "../sectionTypes"

export const LoadInfoSection: React.FC<StructureIdSectionBaseProps> = ({ register, isReadonly }) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      מידע בנושא עומסים
    </Title>

    <div className={styles.grid}>
      <label className={`${styles.field} ${styles.fullWidth}`}>
        <span className={styles.label}>7.1 שיטת דירוג עומסים *</span>
        <input type="text" {...register("loadRatingMethod")} className={styles.input} disabled={true} />
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>7.2 דירוג עומסים בפועל *</span>
        <input type="text" {...register("loadRatingResult")} className={styles.input} disabled={true} />
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>7.3 תאריך דירוג עומסים אחרון *</span>
        <input type="date" {...register("loadRatingDate")} className={styles.input} disabled={true} />
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>7.7 מגבלות עומס מאושרות (טון)</span>
        <input type="text" {...register("approvedLoadLimits")} className={styles.input} disabled={isReadonly} />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>7.8 שילוט הגבלת עומס (טון)</span>
        <input type="text" {...register("loadSignage")} className={styles.input} disabled={isReadonly} />
      </label>
    </div>
  </section>
)

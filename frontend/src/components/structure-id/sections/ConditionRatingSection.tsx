import React from "react"

import { FieldError } from "@/components/structure-id/FieldError"
import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"

export const ConditionRatingSection: React.FC<StructureIdSectionBaseProps> = ({ register, errors, isReadonly }) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      דירוג מצב מבני
    </Title>

    <div className={styles.grid}>
      <label className={styles.field}>
        <span className={styles.label}>10.1 ערך הסמן Condition PIav עדכני</span>
        <input type="text" {...register("conditionPIav")} className={styles.input} disabled={isReadonly} min="0" max="100" />
        <FieldError errors={errors} name="conditionPIav" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>10.2 ערך הסמן Condition PIcrit עדכני</span>
        <input type="text" {...register("conditionPIcrit")} className={styles.input} disabled={isReadonly} min="0" max="100" />
        <FieldError errors={errors} name="conditionPIcrit" />
      </label>
    </div>
  </section>
)

import React from "react"

import { FieldError } from "@/components/structure-id/FieldError"
import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"
import { INFRASTRUCTURE_OPTIONS } from "../structureIdOptions"

type InfrastructureSectionProps = StructureIdSectionBaseProps & {
  infrastructureTypesValue?: string
}

export const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({ register, errors, isReadonly, infrastructureTypesValue }) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      תשתיות ומערכות על המבנה
    </Title>

    <div className={styles.grid}>
      <label className={styles.field}>
        <span className={styles.label}>8.1 סוג תשתית קיים</span>
        <select {...register("infrastructureTypes")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {INFRASTRUCTURE_OPTIONS.map(option => (
            <option key={`infra-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="infrastructureTypes" />
      </label>

      {infrastructureTypesValue === "8.1-4" && (
        <label className={styles.field}>
          <span className={styles.label}>8.1 פירוט אחר</span>
          <textarea {...register("infrastructureTypesOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
          <FieldError errors={errors} name="infrastructureTypesOther" />
        </label>
      )}
    </div>
  </section>
)

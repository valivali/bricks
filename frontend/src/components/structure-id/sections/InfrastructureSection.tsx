import React from "react"
import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"
import { INFRASTRUCTURE_OPTIONS } from "../structureIdOptions"
import type { StructureIdSectionBaseProps } from "../sectionTypes"

type InfrastructureSectionProps = StructureIdSectionBaseProps & {
  infrastructureTypesValue?: string
}

export const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({ register, isReadonly, infrastructureTypesValue }) => (
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
      </label>

      {infrastructureTypesValue === "8.1-4" && (
        <label className={styles.field}>
          <span className={styles.label}>8.1 פירוט אחר</span>
          <textarea {...register("infrastructureTypesOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}
    </div>
  </section>
)

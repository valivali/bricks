import React from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import { FormField } from "../FormField"
import type { StructureIdSectionBaseProps } from "../sectionTypes"
import { INFRASTRUCTURE_OPTIONS } from "../structureIdOptions"

type InfrastructureSectionProps = StructureIdSectionBaseProps & {
  infrastructureTypesValue?: string
}

export const InfrastructureSection: React.FC<InfrastructureSectionProps> = ({
  register,
  errors,
  isReadonly,
  fieldImages,
  onFieldImagesChange,
  infrastructureTypesValue
}) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      תשתיות ומערכות על המבנה
    </Title>

    <div className={styles.grid}>
      <FormField
        label="8.1 סוג תשתית קיים"
        name="infrastructureTypes"
        type="select"
        register={register}
        error={errors.infrastructureTypes}
        isReadonly={isReadonly}
        options={INFRASTRUCTURE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {infrastructureTypesValue === "8.1-4" && (
        <FormField
          label="8.1 פירוט אחר"
          name="infrastructureTypesOther"
          type="textarea"
          register={register}
          error={errors.infrastructureTypesOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}
    </div>
  </section>
)

import React from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import { FormField } from "../FormField"
import type { StructureIdSectionBaseProps } from "../sectionTypes"

export const LoadInfoSection: React.FC<StructureIdSectionBaseProps> = ({
  register,
  errors,
  isReadonly,
  fieldImages,
  onFieldImagesChange
}) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      מידע בנושא עומסים
    </Title>

    <div className={styles.grid}>
      <FormField
        className={styles.fullWidth}
        label="7.1 שיטת דירוג עומסים *"
        name="loadRatingMethod"
        register={register}
        error={errors.loadRatingMethod}
        isReadonly={true}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="7.2 דירוג עומסים בפועל *"
        name="loadRatingResult"
        register={register}
        error={errors.loadRatingResult}
        isReadonly={true}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="7.3 תאריך דירוג עומסים אחרון *"
        name="loadRatingDate"
        type="text"
        register={register}
        error={errors.loadRatingDate}
        isReadonly={true}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="7.7 מגבלות עומס מאושרות (טון)"
        name="approvedLoadLimits"
        register={register}
        error={errors.approvedLoadLimits}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="7.8 שילוט הגבלת עומס (טון)"
        name="loadSignage"
        register={register}
        error={errors.loadSignage}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />
    </div>
  </section>
)

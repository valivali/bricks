import React from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"
import { INSPECTION_CLASSIFICATION_OPTIONS } from "../structureIdOptions"
import { FormField } from "../FormField"

export const InspectionsSection: React.FC<StructureIdSectionBaseProps> = ({
  register,
  errors,
  isReadonly,
  fieldImages,
  onFieldImagesChange
}) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      סקירות
    </Title>

    <div className={styles.grid}>
      <FormField
        label="13.1 סיווג לסקירה"
        name="inspectionClassification"
        type="select"
        register={register}
        error={errors.inspectionClassification}
        isReadonly={isReadonly}
        options={INSPECTION_CLASSIFICATION_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="13.2 תאריך ביצוע סקירה ראשונית"
        name="initialInspectionDate"
        type="text"
        register={register}
        error={errors.initialInspectionDate}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="13.3 תאריך ביצוע סקירה שגרתית אחרונה"
        name="lastRoutineInspectionDate"
        type="text"
        register={register}
        error={errors.lastRoutineInspectionDate}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="13.4 תדירות ביצוע סקירה שגרתית (חודשים) *"
        name="routineInspectionFrequency"
        register={register}
        error={errors.routineInspectionFrequency}
        isReadonly={true}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="13.5 סקירה לבקרת נזקים"
        name="damageControlInspectionDate"
        type="text"
        register={register}
        error={errors.damageControlInspectionDate}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="13.6 סקירה תת מימית"
        name="underwaterInspectionDate"
        type="text"
        register={register}
        error={errors.underwaterInspectionDate}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="13.7 סקירה מעמיקה"
        name="thoroughInspectionDate"
        type="text"
        register={register}
        error={errors.thoroughInspectionDate}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="13.8 סקירה מיוחדת אחרת"
        name="specialInspectionDate"
        type="text"
        register={register}
        error={errors.specialInspectionDate}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />
    </div>
  </section>
)

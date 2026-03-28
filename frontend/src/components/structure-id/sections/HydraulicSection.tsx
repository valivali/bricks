import React from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import { FormField } from "../FormField"
import type { StructureIdSectionBaseProps } from "../sectionTypes"

export const HydraulicSection: React.FC<StructureIdSectionBaseProps> = ({ register, errors, fieldImages, onFieldImagesChange }) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      נתונים הידראוליים (כל השדות מוגבלים)
    </Title>

    <div className={styles.grid}>
      <FormField
        label="9.1 מפלס יחסי מחושב מרבי *"
        name="maxRelativeLevel"
        register={register}
        error={errors.maxRelativeLevel}
        isReadonly={true}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="9.2 תקופת חזרה הידראולית מתוכננת *"
        name="designReturnPeriod"
        register={register}
        error={errors.designReturnPeriod}
        isReadonly={true}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="9.3 התאמה הידראולית *"
        name="hydraulicAdequacy"
        type="select"
        register={register}
        error={errors.hydraulicAdequacy}
        isReadonly={true}
        options={[
          { value: "9.3-1", label: "מתאים" },
          { value: "9.3-2", label: "לא מתאים" }
        ]}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />
    </div>
  </section>
)

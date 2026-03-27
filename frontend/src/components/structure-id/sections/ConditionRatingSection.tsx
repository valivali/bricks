import React from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"
import { FormField } from "../FormField"

export const ConditionRatingSection: React.FC<StructureIdSectionBaseProps> = ({
  register,
  errors,
  isReadonly,
  fieldImages,
  onFieldImagesChange
}) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      דירוג מצב מבני
    </Title>

    <div className={styles.grid}>
      <FormField
        label="10.1 ערך הסמן Condition PIav עדכני"
        name="conditionPIav"
        register={register}
        error={errors.conditionPIav}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="10.2 ערך הסמן Condition PIcrit עדכני"
        name="conditionPIcrit"
        register={register}
        error={errors.conditionPIcrit}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />
    </div>
  </section>
)

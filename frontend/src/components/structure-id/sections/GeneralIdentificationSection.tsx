import React from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"
import { AREA_OPTIONS } from "../structureIdOptions"
import { FormField } from "../FormField"

export const GeneralIdentificationSection: React.FC<StructureIdSectionBaseProps> = ({
  register,
  errors,
  isReadonly,
  fieldImages,
  onFieldImagesChange
}) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      נתוני זיהוי כלליים
    </Title>

    <div className={styles.grid}>
      <FormField
        label="1.1 מספר המבנה"
        name="structureNumber"
        register={register}
        error={errors.structureNumber}
        isReadonly={isReadonly}
        placeholder="S-BRG-BNNNNNnn"
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="1.2 שם המבנה"
        name="structureName"
        register={register}
        error={errors.structureName}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="1.3 סימון המבנה"
        name="structureMarking"
        register={register}
        error={errors.structureMarking}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="1.5 מרחב"
        name="area"
        type="select"
        register={register}
        error={errors.area}
        isReadonly={isReadonly}
        placeholder="בחר מרחב"
        options={AREA_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="1.6 שייך לכביש"
        name="belongsToRoad"
        register={register}
        error={errors.belongsToRoad}
        isReadonly={isReadonly}
        maxLength={4}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label='1.7 מרחק רץ (ק"מ)'
        name="runningDistanceKm"
        register={register}
        error={errors.runningDistanceKm}
        isReadonly={isReadonly}
        placeholder="XXX.MMM"
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="1.10 אורדינטה צפונית N"
        name="coordinateNorth"
        register={register}
        error={errors.coordinateNorth}
        isReadonly={isReadonly}
        maxLength={6}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="1.11 אורדינטה מזרחית E"
        name="coordinateEast"
        register={register}
        error={errors.coordinateEast}
        isReadonly={isReadonly}
        maxLength={6}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        className={styles.fullWidth}
        label="1.4 תיאור כללי (מילולי)"
        name="generalDescription"
        type="textarea"
        register={register}
        error={errors.generalDescription}
        isReadonly={isReadonly}
        rows={3}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />
    </div>
  </section>
)

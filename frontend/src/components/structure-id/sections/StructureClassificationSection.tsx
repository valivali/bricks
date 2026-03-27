import React from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"
import {
  ABUTMENT_TYPE_1_OPTIONS,
  ABUTMENT_TYPE_2_OPTIONS,
  BEARING_TYPE_OPTIONS,
  DECK_TYPE_OPTIONS,
  FLOOR_TYPE_OPTIONS,
  JOINT_TYPE_OPTIONS,
  PIER_TYPE_OPTIONS,
  PRESTRESSING_TYPE_OPTIONS
} from "../structureIdOptions"
import { FormField } from "../FormField"

type StructureClassificationSectionProps = StructureIdSectionBaseProps & {
  deckTypesValue?: string
  floorTypeValue?: string
  abutment1TypeValue?: string
  abutment2TypeValue?: string
  pierTypesValue?: string
  prestressingTypeValue?: string
  bearingTypesValue?: string
  jointTypesValue?: string
}

export const StructureClassificationSection: React.FC<StructureClassificationSectionProps> = ({
  register,
  errors,
  isReadonly,
  fieldImages,
  onFieldImagesChange,
  deckTypesValue,
  floorTypeValue,
  abutment1TypeValue,
  abutment2TypeValue,
  pierTypesValue,
  prestressingTypeValue,
  bearingTypesValue,
  jointTypesValue
}) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      סיווג מבנה
    </Title>

    <div className={styles.grid}>
      <FormField
        label="5.1 מספר סוגי מבנה עליון/מיסעה/תקרה"
        name="deckTypeCount"
        register={register}
        error={errors.deckTypeCount}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="5.2 סיווג מבנה עליון/מיסעה/תקרה"
        name="deckTypes"
        type="select"
        register={register}
        error={errors.deckTypes}
        isReadonly={isReadonly}
        options={DECK_TYPE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {deckTypesValue === "5.2-12" && (
        <FormField
          label="5.2 פירוט אחר"
          name="deckTypesOther"
          type="textarea"
          register={register}
          error={errors.deckTypesOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="5.3 סיווג רצפה"
        name="floorType"
        type="select"
        register={register}
        error={errors.floorType}
        isReadonly={isReadonly}
        options={FLOOR_TYPE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {floorTypeValue === "5.3-3" && (
        <FormField
          label="5.3 פירוט אחר"
          name="floorTypeOther"
          type="textarea"
          register={register}
          error={errors.floorTypeOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="5.4 סיווג נציב / קיר קצה 1"
        name="abutment1Type"
        type="select"
        register={register}
        error={errors.abutment1Type}
        isReadonly={isReadonly}
        options={ABUTMENT_TYPE_1_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {abutment1TypeValue === "5.4-7" && (
        <FormField
          label="5.4 פירוט אחר"
          name="abutment1TypeOther"
          register={register}
          error={errors.abutment1TypeOther}
          isReadonly={isReadonly}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="5.5 סיווג נציב / קיר קצה 2"
        name="abutment2Type"
        type="select"
        register={register}
        error={errors.abutment2Type}
        isReadonly={isReadonly}
        options={ABUTMENT_TYPE_2_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {abutment2TypeValue === "5.5-7" && (
        <FormField
          label="5.5 פירוט אחר"
          name="abutment2TypeOther"
          register={register}
          error={errors.abutment2TypeOther}
          isReadonly={isReadonly}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="5.6 מספר סוגי נציבים ביניים"
        name="pierTypeCount"
        register={register}
        error={errors.pierTypeCount}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="5.7 סיווג נציבים ביניים (בהתאם לכמות ולסוג)"
        name="pierTypes"
        type="select"
        register={register}
        error={errors.pierTypes}
        isReadonly={isReadonly}
        options={PIER_TYPE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {pierTypesValue === "5.7-6" && (
        <FormField
          label="5.7 פירוט אחר"
          name="pierTypesOther"
          type="textarea"
          register={register}
          error={errors.pierTypesOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="5.8 סוג דריכה"
        name="prestressingType"
        type="select"
        register={register}
        error={errors.prestressingType}
        isReadonly={isReadonly}
        options={PRESTRESSING_TYPE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {prestressingTypeValue === "5.8-7" && (
        <FormField
          label="5.8 פירוט אחר"
          name="prestressingTypeOther"
          register={register}
          error={errors.prestressingTypeOther}
          isReadonly={isReadonly}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="5.9 סוג סמכים"
        name="bearingTypes"
        type="select"
        register={register}
        error={errors.bearingTypes}
        isReadonly={isReadonly}
        options={BEARING_TYPE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {bearingTypesValue === "5.9-5" && (
        <FormField
          label="5.9 פירוט אחר"
          name="bearingTypesOther"
          type="textarea"
          register={register}
          error={errors.bearingTypesOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="5.10 סוג תפרים"
        name="jointTypes"
        type="select"
        register={register}
        error={errors.jointTypes}
        isReadonly={isReadonly}
        options={JOINT_TYPE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {jointTypesValue === "5.10-7" && (
        <FormField
          label="5.10 פירוט אחר"
          name="jointTypesOther"
          type="textarea"
          register={register}
          error={errors.jointTypesOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}
    </div>
  </section>
)

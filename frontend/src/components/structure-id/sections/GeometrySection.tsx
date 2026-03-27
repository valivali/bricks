import React from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"
import { SEPARATOR_TYPE_OPTIONS, YES_NO_OPTIONS } from "../structureIdOptions"
import { FormField } from "../FormField"

type GeometrySectionProps = StructureIdSectionBaseProps & {
  separatorTypeValue?: string
}

export const GeometrySection: React.FC<GeometrySectionProps> = ({
  register,
  errors,
  isReadonly,
  fieldImages,
  onFieldImagesChange,
  separatorTypeValue
}) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      מידע גיאומטרי
    </Title>

    <div className={styles.grid}>
      <FormField
        label="4.1 מספר מפתחים"
        name="spanCount"
        register={register}
        error={errors.spanCount}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.2 אורך מפתח מרבי (מ')"
        name="maxSpanLength"
        register={register}
        error={errors.maxSpanLength}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.3 אורך מבנה כללי (מ')"
        name="totalLength"
        register={register}
        error={errors.totalLength}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.4 אורך ימין (מ')"
        name="lengthRight"
        register={register}
        error={errors.lengthRight}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.5 אורך שמאל (מ')"
        name="lengthLeft"
        register={register}
        error={errors.lengthLeft}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.6 חלוקת מפתחים"
        name="spanDistribution"
        register={register}
        error={errors.spanDistribution}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.7 שינוי רוחב קיים"
        name="widthChange"
        type="select"
        register={register}
        error={errors.widthChange}
        isReadonly={isReadonly}
        options={YES_NO_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.8 רוחב חיצוני מינימלי ניצב לציר הדרך (מ')"
        name="minWidthPerpendicular"
        register={register}
        error={errors.minWidthPerpendicular}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.9 רוחב חיצוני מכסימלי ניצב לציר הדרך (מ')"
        name="maxWidthPerpendicular"
        register={register}
        error={errors.maxWidthPerpendicular}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.10 רוחב חיצוני מכסימלי (מ')"
        name="maxExternalWidth"
        register={register}
        error={errors.maxExternalWidth}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.11 רוחב חיצוני מינימלי (מ')"
        name="minExternalWidth"
        register={register}
        error={errors.minExternalWidth}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.12 רוחב הגבהות ומדרכות צדדיות – ימין (מ')"
        name="rightSidewalkWidth"
        register={register}
        error={errors.rightSidewalkWidth}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.13 רוחב הגבהות ומדרכות צדדיות – שמאל (מ')"
        name="leftSidewalkWidth"
        register={register}
        error={errors.leftSidewalkWidth}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.14 רוחב מסלול מינימלי (בין הגבהות) (מ')"
        name="minRoadwayWidth"
        register={register}
        error={errors.minRoadwayWidth}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.15 רוחב מסלולים כולל (מהגבהה להגבהה) (מ')"
        name="totalRoadwayWidth"
        register={register}
        error={errors.totalRoadwayWidth}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.16 סוג מפרדה"
        name="separatorType"
        type="select"
        register={register}
        error={errors.separatorType}
        isReadonly={isReadonly}
        options={SEPARATOR_TYPE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {separatorTypeValue === "4.16-5" && (
        <FormField
          label="4.16 פירוט אחר"
          name="separatorTypeOther"
          register={register}
          error={errors.separatorTypeOther}
          isReadonly={isReadonly}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="4.17 זווית ייחוס (Skew) מעלות"
        name="skewAngle"
        register={register}
        error={errors.skewAngle}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.18 מרווח אנכי חופשי מינימלי קיים מתחת לגשר (מ')"
        name="minVerticalClearanceBelow"
        register={register}
        error={errors.minVerticalClearanceBelow}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.19 מרווח אנכי חופשי לניקוז / מעברי תשתיות (מ')"
        name="verticalClearanceDrainage"
        register={register}
        error={errors.verticalClearanceDrainage}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.20 מרווח אנכי חופשי מינימלי קיים מעל למבנה (מ')"
        name="minVerticalClearanceAbove"
        register={register}
        error={errors.minVerticalClearanceAbove}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.21 ערך שילוט מגבלת גובה קיים בפועל (מ')"
        name="heightSignageValue"
        register={register}
        error={errors.heightSignageValue}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.22 מרווח אופקי מינימלי (מ')"
        name="minHorizontalClearance"
        register={register}
        error={errors.minHorizontalClearance}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="4.23 גובה נציב מכסימלי (מ')"
        name="maxPierHeight"
        register={register}
        error={errors.maxPierHeight}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label='4.29 שטח מיסעה (מ"ר)'
        name="deckArea"
        register={register}
        error={errors.deckArea}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />
    </div>
  </section>
)

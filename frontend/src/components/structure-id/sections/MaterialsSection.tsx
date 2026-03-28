import React from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import { FormField } from "../FormField"
import type { StructureIdSectionBaseProps } from "../sectionTypes"
import { MATERIAL_OPTIONS } from "../structureIdOptions"

type MaterialsSectionProps = StructureIdSectionBaseProps & {
  deckMaterialsValue?: string
  beamMaterialsValue?: string
  abutmentMaterialsValue?: string
  pierMaterialsValue?: string
  slopeProtectionMaterialsValue?: string
  vehicleBarrierMaterialsValue?: string
  pedestrianRailingMaterialsValue?: string
  deckCoveringMaterialsValue?: string
  deckSealingMaterialsValue?: string
  curbMaterialsValue?: string
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  register,
  errors,
  isReadonly,
  fieldImages,
  onFieldImagesChange,
  deckMaterialsValue,
  beamMaterialsValue,
  abutmentMaterialsValue,
  pierMaterialsValue,
  slopeProtectionMaterialsValue,
  vehicleBarrierMaterialsValue,
  pedestrianRailingMaterialsValue,
  deckCoveringMaterialsValue,
  deckSealingMaterialsValue,
  curbMaterialsValue
}) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      סיווג חומרים
    </Title>

    <div className={styles.grid}>
      <FormField
        label="6.1 חומרי מבנה עליון / מיסעה / תקרה"
        name="deckMaterials"
        type="select"
        register={register}
        error={errors.deckMaterials}
        isReadonly={isReadonly}
        options={MATERIAL_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {deckMaterialsValue === "6.123" && (
        <FormField
          label="6.1 פירוט אחר"
          name="deckMaterialsOther"
          type="textarea"
          register={register}
          error={errors.deckMaterialsOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="6.2 חומרי קורות"
        name="beamMaterials"
        type="select"
        register={register}
        error={errors.beamMaterials}
        isReadonly={isReadonly}
        options={MATERIAL_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {beamMaterialsValue === "6.123" && (
        <FormField
          label="6.2 פירוט אחר"
          name="beamMaterialsOther"
          type="textarea"
          register={register}
          error={errors.beamMaterialsOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="6.3 חומרי נציבים / קירות קצה"
        name="abutmentMaterials"
        type="select"
        register={register}
        error={errors.abutmentMaterials}
        isReadonly={isReadonly}
        options={MATERIAL_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {abutmentMaterialsValue === "6.123" && (
        <FormField
          label="6.3 פירוט אחר"
          name="abutmentMaterialsOther"
          type="textarea"
          register={register}
          error={errors.abutmentMaterialsOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="6.4 חומרי נציבים ביניים"
        name="pierMaterials"
        type="select"
        register={register}
        error={errors.pierMaterials}
        isReadonly={isReadonly}
        options={MATERIAL_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {pierMaterialsValue === "6.123" && (
        <FormField
          label="6.4 פירוט אחר"
          name="pierMaterialsOther"
          type="textarea"
          register={register}
          error={errors.pierMaterialsOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="6.5 חומרי הגנת מדרון נתמך"
        name="slopeProtectionMaterials"
        type="select"
        register={register}
        error={errors.slopeProtectionMaterials}
        isReadonly={isReadonly}
        options={MATERIAL_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {slopeProtectionMaterialsValue === "6.123" && (
        <FormField
          label="6.5 פירוט אחר"
          name="slopeProtectionMaterialsOther"
          type="textarea"
          register={register}
          error={errors.slopeProtectionMaterialsOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="6.6 חומרי מעקה רכב"
        name="vehicleBarrierMaterials"
        type="select"
        register={register}
        error={errors.vehicleBarrierMaterials}
        isReadonly={isReadonly}
        options={MATERIAL_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {vehicleBarrierMaterialsValue === "6.123" && (
        <FormField
          label="6.6 פירוט אחר"
          name="vehicleBarrierMaterialsOther"
          type="textarea"
          register={register}
          error={errors.vehicleBarrierMaterialsOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="6.7 חומרי מעקה הולכי רגל"
        name="pedestrianRailingMaterials"
        type="select"
        register={register}
        error={errors.pedestrianRailingMaterials}
        isReadonly={isReadonly}
        options={MATERIAL_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {pedestrianRailingMaterialsValue === "6.123" && (
        <FormField
          label="6.7 פירוט אחר"
          name="pedestrianRailingMaterialsOther"
          type="textarea"
          register={register}
          error={errors.pedestrianRailingMaterialsOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="6.8 חומרי ציפוי מיסעה"
        name="deckCoveringMaterials"
        type="select"
        register={register}
        error={errors.deckCoveringMaterials}
        isReadonly={isReadonly}
        options={MATERIAL_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {deckCoveringMaterialsValue === "6.123" && (
        <FormField
          label="6.8 פירוט אחר"
          name="deckCoveringMaterialsOther"
          type="textarea"
          register={register}
          error={errors.deckCoveringMaterialsOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="6.9 חומרי איטום מיסעה"
        name="deckSealingMaterials"
        type="select"
        register={register}
        error={errors.deckSealingMaterials}
        isReadonly={isReadonly}
        options={MATERIAL_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {deckSealingMaterialsValue === "6.123" && (
        <FormField
          label="6.9 פירוט אחר"
          name="deckSealingMaterialsOther"
          type="textarea"
          register={register}
          error={errors.deckSealingMaterialsOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="6.10 חומרי אבן שפה"
        name="curbMaterials"
        type="select"
        register={register}
        error={errors.curbMaterials}
        isReadonly={isReadonly}
        options={MATERIAL_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {curbMaterialsValue === "6.123" && (
        <FormField
          label="6.10 פירוט אחר"
          name="curbMaterialsOther"
          type="textarea"
          register={register}
          error={errors.curbMaterialsOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}
    </div>
  </section>
)

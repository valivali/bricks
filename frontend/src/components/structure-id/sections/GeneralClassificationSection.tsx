import React, { useEffect } from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"
import {
  AUTHORITY_OPTIONS,
  PRIMARY_CLASSIFICATION_OPTIONS,
  SECONDARY_CLASSIFICATION_OPTIONS,
  TRAFFIC_FUNCTION_OPTIONS,
  YES_NO_OPTIONS
} from "../structureIdOptions"
import { getStructureDetailTypeOptions, getStructureSubTypeOptions, getStructureTypeOptions } from "../structureTypeOptions"
import { FormField } from "../FormField"

export interface GeneralClassificationSectionProps extends StructureIdSectionBaseProps {
  structureTypeValue?: string
  structureSubTypeValue?: string
  onStructureTypeChange?: (value: string) => void
  onStructureSubTypeChange?: (value: string) => void
}

export const GeneralClassificationSection: React.FC<GeneralClassificationSectionProps> = ({
  register,
  errors,
  isReadonly,
  fieldImages,
  onFieldImagesChange,
  structureTypeValue,
  structureSubTypeValue,
  onStructureTypeChange,
  onStructureSubTypeChange
}) => {
  const structureTypes = getStructureTypeOptions()
  const structureSubTypes = getStructureSubTypeOptions(structureTypeValue)
  const structureDetailTypes = getStructureDetailTypeOptions(structureTypeValue, structureSubTypeValue)

  useEffect(() => {
    if (structureTypeValue && structureSubTypes.length === 0) {
      onStructureSubTypeChange?.("")
    }
  }, [structureTypeValue, structureSubTypes.length, onStructureSubTypeChange])

  return (
    <section className={styles.section}>
      <Title level={3} className={styles.sectionTitle}>
        נתוני סיווג כלליים
      </Title>

      <div className={styles.grid}>
        <FormField
          label="סוג מבנה"
          name="structureType"
          type="select"
          register={register}
          error={errors.structureType}
          isReadonly={isReadonly}
          options={structureTypes}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
          onChange={e => onStructureTypeChange?.(e.target.value)}
        />

        {structureSubTypes.length > 0 && (
          <FormField
            label="תת-סוג מבנה"
            name="structureSubType"
            type="select"
            register={register}
            error={errors.structureSubType}
            isReadonly={isReadonly}
            options={structureSubTypes}
            images={fieldImages}
            onImagesChange={onFieldImagesChange}
            onChange={e => onStructureSubTypeChange?.(e.target.value)}
          />
        )}

        {structureDetailTypes.length > 0 && (
          <FormField
            label="פירוט סוג מבנה"
            name="structureDetailType"
            type="select"
            register={register}
            error={errors.structureDetailType}
            isReadonly={isReadonly}
            options={structureDetailTypes}
            images={fieldImages}
            onImagesChange={onFieldImagesChange}
          />
        )}

        <FormField
          label="2.1 קבוצת סיווג ראשית"
          name="primaryClassificationGroup"
          type="select"
          register={register}
          error={errors.primaryClassificationGroup}
          isReadonly={isReadonly}
          options={PRIMARY_CLASSIFICATION_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />

        <FormField
          label="2.2 קבוצת סיווג משנית"
          name="secondaryClassificationGroup"
          type="select"
          register={register}
          error={errors.secondaryClassificationGroup}
          isReadonly={isReadonly}
          options={SECONDARY_CLASSIFICATION_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />

        <FormField
          label="2.3 סיווג תפקוד תנועתי"
          name="trafficFunctionClass"
          type="select"
          register={register}
          error={errors.trafficFunctionClass}
          isReadonly={isReadonly}
          options={TRAFFIC_FUNCTION_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />

        <FormField
          label="2.4 סיווג חירום *"
          name="emergencyClass"
          type="select"
          register={register}
          error={errors.emergencyClass}
          isReadonly={true}
          options={YES_NO_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />

        <FormField
          label="2.5 הוקם על ידי *"
          name="builtBy"
          type="select"
          register={register}
          error={errors.builtBy}
          isReadonly={isReadonly}
          options={AUTHORITY_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />

        <FormField
          label="2.6 בעלים *"
          name="owner"
          type="select"
          register={register}
          error={errors.owner}
          isReadonly={isReadonly}
          options={AUTHORITY_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />

        <FormField
          label="2.7 אחריות אחזקה *"
          name="maintenanceResponsibility"
          type="select"
          register={register}
          error={errors.maintenanceResponsibility}
          isReadonly={isReadonly}
          options={AUTHORITY_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />

        <FormField
          label="2.8 שייך לכביש אגרה"
          name="tollRoad"
          type="select"
          register={register}
          error={errors.tollRoad}
          isReadonly={isReadonly}
          options={YES_NO_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />

        <FormField
          label="2.9 הובלות מיוחדות *"
          name="specialTransport"
          type="select"
          register={register}
          error={errors.specialTransport}
          isReadonly={true}
          options={YES_NO_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />

        <FormField
          label="2.10 ערך היסטורי *"
          name="historicalValue"
          type="select"
          register={register}
          error={errors.historicalValue}
          isReadonly={true}
          options={YES_NO_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />

        <FormField
          label="2.11 מבנה זמני *"
          name="temporaryStructure"
          type="select"
          register={register}
          error={errors.temporaryStructure}
          isReadonly={true}
          options={YES_NO_OPTIONS}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      </div>
    </section>
  )
}

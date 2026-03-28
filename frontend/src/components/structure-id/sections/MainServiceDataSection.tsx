import React from "react"

import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import { FormField } from "../FormField"
import type { StructureIdSectionBaseProps } from "../sectionTypes"
import {
  BYPASS_POSSIBLE_OPTIONS,
  LOCAL_BYPASS_METHOD_OPTIONS,
  LOCAL_BYPASS_OPTIONS,
  TRAFFIC_DIRECTION_OPTIONS,
  USAGE_OPTIONS
} from "../structureIdOptions"

type MainServiceDataSectionProps = StructureIdSectionBaseProps & {
  localBypassMethodValue?: string
}

export const MainServiceDataSection: React.FC<MainServiceDataSectionProps> = ({
  register,
  errors,
  isReadonly,
  fieldImages,
  onFieldImagesChange,
  localBypassMethodValue
}) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      נתוני שירות עיקריים
    </Title>

    <div className={styles.grid}>
      <FormField
        label="3.1 שנת בנייה"
        name="constructionYear"
        register={register}
        error={errors.constructionYear}
        isReadonly={isReadonly}
        maxLength={4}
        placeholder="YYYY"
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.2 שנת שיקום אחרון"
        name="lastRehabYear"
        register={register}
        error={errors.lastRehabYear}
        isReadonly={isReadonly}
        maxLength={4}
        placeholder="YYYY"
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.3 שימוש עיקרי מעל"
        name="primaryUsageAbove"
        type="select"
        register={register}
        error={errors.primaryUsageAbove}
        isReadonly={isReadonly}
        options={USAGE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.3.1 מספר כביש עיקרי מעל"
        name="primaryRoadNumberAbove"
        register={register}
        error={errors.primaryRoadNumberAbove}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.4 שימוש משני מעל"
        name="secondaryUsageAbove"
        type="select"
        register={register}
        error={errors.secondaryUsageAbove}
        isReadonly={isReadonly}
        options={USAGE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.4.1 מספר כביש משני מעל"
        name="secondaryRoadNumberAbove"
        register={register}
        error={errors.secondaryRoadNumberAbove}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.5 מספר מסלולים ו/או מסילות רכבת מעל"
        name="tracksOrRailwaysAbove"
        register={register}
        error={errors.tracksOrRailwaysAbove}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.6 מספר נתיבים מעל"
        name="lanesAbove"
        register={register}
        error={errors.lanesAbove}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.7 כיוון תנועה מעל"
        name="trafficDirectionAbove"
        type="select"
        register={register}
        error={errors.trafficDirectionAbove}
        isReadonly={isReadonly}
        options={TRAFFIC_DIRECTION_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.8 שימוש עיקרי מתחת"
        name="primaryUsageBelow"
        type="select"
        register={register}
        error={errors.primaryUsageBelow}
        isReadonly={isReadonly}
        options={USAGE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.8.1 מספר כביש עיקרי מתחת"
        name="primaryRoadNumberBelow"
        register={register}
        error={errors.primaryRoadNumberBelow}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.9 שימוש משני מתחת"
        name="secondaryUsageBelow"
        type="select"
        register={register}
        error={errors.secondaryUsageBelow}
        isReadonly={isReadonly}
        options={USAGE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.9.1 מספר כביש משני מתחת"
        name="secondaryRoadNumberBelow"
        register={register}
        error={errors.secondaryRoadNumberBelow}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.10 מספר מסלולים ו/או מסילות רכבת מתחת"
        name="tracksOrRailwaysBelow"
        register={register}
        error={errors.tracksOrRailwaysBelow}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.11 מספר נתיבים מתחת"
        name="lanesBelow"
        register={register}
        error={errors.lanesBelow}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.12 כיוון תנועה מתחת"
        name="trafficDirectionBelow"
        type="select"
        register={register}
        error={errors.trafficDirectionBelow}
        isReadonly={isReadonly}
        options={TRAFFIC_DIRECTION_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.13 AADT ממוצע תנועה יומי *"
        name="aadt"
        register={register}
        error={errors.aadt}
        isReadonly={true}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.14 שנת מדידת AADT אחרונה *"
        name="aadtYear"
        register={register}
        error={errors.aadtYear}
        isReadonly={true}
        maxLength={4}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.15 AADTT משאיות (%) *"
        name="aadtt"
        register={register}
        error={errors.aadtt}
        isReadonly={true}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.16 מעקף בדרכים קיימות"
        name="bypassPossible"
        type="select"
        register={register}
        error={errors.bypassPossible}
        isReadonly={isReadonly}
        options={BYPASS_POSSIBLE_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.17 אורך מעקף (ק״מ)"
        name="bypassLength"
        register={register}
        error={errors.bypassLength}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        className={styles.fullWidth}
        label="3.18 תיאור תוואי מעקף מועדף"
        name="bypassDescription"
        type="textarea"
        register={register}
        error={errors.bypassDescription}
        isReadonly={isReadonly}
        rows={3}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.19 מעקף מקומי"
        name="localBypass"
        type="select"
        register={register}
        error={errors.localBypass}
        isReadonly={isReadonly}
        options={LOCAL_BYPASS_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.20 שיטת ביצוע מעקף מקומי"
        name="localBypassMethod"
        type="select"
        register={register}
        error={errors.localBypassMethod}
        isReadonly={isReadonly}
        options={LOCAL_BYPASS_METHOD_OPTIONS}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      {localBypassMethodValue === "3.20-6" && (
        <FormField
          label="3.20 פירוט אחר"
          name="localBypassMethodOther"
          type="textarea"
          register={register}
          error={errors.localBypassMethodOther}
          isReadonly={isReadonly}
          rows={2}
          images={fieldImages}
          onImagesChange={onFieldImagesChange}
        />
      )}

      <FormField
        label="3.21 מתכנן מקורי"
        name="originalPlanner"
        register={register}
        error={errors.originalPlanner}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />

      <FormField
        label="3.22 מתכנן שיקום / הרחבה"
        name="rehabPlanner"
        register={register}
        error={errors.rehabPlanner}
        isReadonly={isReadonly}
        images={fieldImages}
        onImagesChange={onFieldImagesChange}
      />
    </div>
  </section>
)

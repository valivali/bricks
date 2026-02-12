import React from "react"

import { FieldError } from "@/components/structure-id/FieldError"
import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

import type { StructureIdSectionBaseProps } from "../sectionTypes"
import { SEPARATOR_TYPE_OPTIONS, YES_NO_OPTIONS } from "../structureIdOptions"

type GeometrySectionProps = StructureIdSectionBaseProps & {
  separatorTypeValue?: string
}

export const GeometrySection: React.FC<GeometrySectionProps> = ({ register, errors, isReadonly, separatorTypeValue }) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      מידע גיאומטרי
    </Title>

    <div className={styles.grid}>
      <label className={styles.field}>
        <span className={styles.label}>4.1 מספר מפתחים</span>
        <input type="text" {...register("spanCount")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="spanCount" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.2 אורך מפתח מרבי (מ')</span>
        <input type="text" {...register("maxSpanLength")} className={styles.input} disabled={isReadonly} step="0.1" />
        <FieldError errors={errors} name="maxSpanLength" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.3 אורך מבנה כללי (מ')</span>
        <input type="text" {...register("totalLength")} className={styles.input} disabled={isReadonly} step="0.1" />
        <FieldError errors={errors} name="totalLength" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.4 אורך ימין (מ')</span>
        <input type="text" {...register("lengthRight")} className={styles.input} disabled={isReadonly} step="0.1" />
        <FieldError errors={errors} name="lengthRight" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.5 אורך שמאל (מ')</span>
        <input type="text" {...register("lengthLeft")} className={styles.input} disabled={isReadonly} step="0.1" />
        <FieldError errors={errors} name="lengthLeft" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.6 חלוקת מפתחים</span>
        <input type="text" {...register("spanDistribution")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="spanDistribution" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.7 שינוי רוחב קיים</span>
        <select {...register("widthChange")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={`width-change-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="widthChange" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.8 רוחב חיצוני מינימלי ניצב לציר הדרך (מ')</span>
        <input type="text" {...register("minWidthPerpendicular")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="minWidthPerpendicular" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.9 רוחב חיצוני מכסימלי ניצב לציר הדרך (מ')</span>
        <input type="text" {...register("maxWidthPerpendicular")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="maxWidthPerpendicular" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.10 רוחב חיצוני מכסימלי (מ')</span>
        <input type="text" {...register("maxExternalWidth")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="maxExternalWidth" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.11 רוחב חיצוני מינימלי (מ')</span>
        <input type="text" {...register("minExternalWidth")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="minExternalWidth" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.12 רוחב הגבהות ומדרכות צדדיות – ימין (מ')</span>
        <input type="text" {...register("rightSidewalkWidth")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="rightSidewalkWidth" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.13 רוחב הגבהות ומדרכות צדדיות – שמאל (מ')</span>
        <input type="text" {...register("leftSidewalkWidth")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="leftSidewalkWidth" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.14 רוחב מסלול מינימלי (בין הגבהות) (מ')</span>
        <input type="text" {...register("minRoadwayWidth")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="minRoadwayWidth" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.15 רוחב מסלולים כולל (מהגבהה להגבהה) (מ')</span>
        <input type="text" {...register("totalRoadwayWidth")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="totalRoadwayWidth" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.16 סוג מפרדה</span>
        <select {...register("separatorType")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {SEPARATOR_TYPE_OPTIONS.map(option => (
            <option key={`separator-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="separatorType" />
      </label>

      {separatorTypeValue === "4.16-5" && (
        <label className={styles.field}>
          <span className={styles.label}>4.16 פירוט אחר</span>
          <input type="text" {...register("separatorTypeOther")} className={styles.input} disabled={isReadonly} />
          <FieldError errors={errors} name="separatorTypeOther" />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>4.17 זווית ייחוס (Skew) מעלות</span>
        <input type="text" {...register("skewAngle")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="skewAngle" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.18 מרווח אנכי חופשי מינימלי קיים מתחת לגשר (מ')</span>
        <input type="text" {...register("minVerticalClearanceBelow")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="minVerticalClearanceBelow" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.19 מרווח אנכי חופשי לניקוז / מעברי תשתיות (מ')</span>
        <input type="text" {...register("verticalClearanceDrainage")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="verticalClearanceDrainage" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.20 מרווח אנכי חופשי מינימלי קיים מעל למבנה (מ')</span>
        <input type="text" {...register("minVerticalClearanceAbove")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="minVerticalClearanceAbove" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.21 ערך שילוט מגבלת גובה קיים בפועל (מ')</span>
        <input type="text" {...register("heightSignageValue")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="heightSignageValue" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.22 מרווח אופקי מינימלי (מ')</span>
        <input type="text" {...register("minHorizontalClearance")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="minHorizontalClearance" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.23 גובה נציב מכסימלי (מ')</span>
        <input type="text" {...register("maxPierHeight")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="maxPierHeight" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>4.29 שטח מיסעה (מ"ר)</span>
        <input type="text" {...register("deckArea")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="deckArea" />
      </label>
    </div>
  </section>
)

import React from "react"

import { FieldError } from "@/components/structure-id/FieldError"
import { ImageUpload } from "@/components/UI/ImageUpload/ImageUpload"
import { Text, Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"

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
  bypassDescriptionImageValue?: string
  onBypassDescriptionImageChange: (value: string | null) => void
}

export const MainServiceDataSection: React.FC<MainServiceDataSectionProps> = ({
  register,
  errors,
  isReadonly,
  localBypassMethodValue,
  bypassDescriptionImageValue,
  onBypassDescriptionImageChange
}) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      נתוני שירות עיקריים
    </Title>

    <div className={styles.grid}>
      <label className={styles.field}>
        <span className={styles.label}>3.1 שנת בנייה</span>
        <input
          type="text"
          {...register("constructionYear")}
          className={styles.input}
          disabled={isReadonly}
          maxLength={4}
          placeholder="YYYY"
        />
        <FieldError errors={errors} name="constructionYear" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.2 שנת שיקום אחרון</span>
        <input type="text" {...register("lastRehabYear")} className={styles.input} disabled={isReadonly} maxLength={4} placeholder="YYYY" />
        <FieldError errors={errors} name="lastRehabYear" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.3 שימוש עיקרי מעל</span>
        <select {...register("primaryUsageAbove")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {USAGE_OPTIONS.map(option => (
            <option key={`primary-above-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="primaryUsageAbove" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.3.1 מספר כביש עיקרי מעל</span>
        <input type="text" {...register("primaryRoadNumberAbove")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="primaryRoadNumberAbove" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.4 שימוש משני מעל</span>
        <select {...register("secondaryUsageAbove")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {USAGE_OPTIONS.map(option => (
            <option key={`secondary-above-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="secondaryUsageAbove" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.4.1 מספר כביש משני מעל</span>
        <input type="text" {...register("secondaryRoadNumberAbove")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="secondaryRoadNumberAbove" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.5 מספר מסלולים ו/או מסילות רכבת מעל</span>
        <input type="text" {...register("tracksOrRailwaysAbove")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="tracksOrRailwaysAbove" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.6 מספר נתיבים מעל</span>
        <input type="text" {...register("lanesAbove")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="lanesAbove" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.7 כיוון תנועה מעל</span>
        <select {...register("trafficDirectionAbove")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {TRAFFIC_DIRECTION_OPTIONS.map(option => (
            <option key={`direction-above-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="trafficDirectionAbove" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.8 שימוש עיקרי מתחת</span>
        <select {...register("primaryUsageBelow")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {USAGE_OPTIONS.map(option => (
            <option key={`primary-below-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="primaryUsageBelow" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.8.1 מספר כביש עיקרי מתחת</span>
        <input type="text" {...register("primaryRoadNumberBelow")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="primaryRoadNumberBelow" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.9 שימוש משני מתחת</span>
        <select {...register("secondaryUsageBelow")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {USAGE_OPTIONS.map(option => (
            <option key={`secondary-below-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="secondaryUsageBelow" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.9.1 מספר כביש משני מתחת</span>
        <input type="text" {...register("secondaryRoadNumberBelow")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="secondaryRoadNumberBelow" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.10 מספר מסלולים ו/או מסילות רכבת מתחת</span>
        <input type="text" {...register("tracksOrRailwaysBelow")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="tracksOrRailwaysBelow" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.11 מספר נתיבים מתחת</span>
        <input type="text" {...register("lanesBelow")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="lanesBelow" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.12 כיוון תנועה מתחת</span>
        <select {...register("trafficDirectionBelow")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {TRAFFIC_DIRECTION_OPTIONS.map(option => (
            <option key={`direction-below-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="trafficDirectionBelow" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.13 AADT ממוצע תנועה יומי *</span>
        <input type="text" {...register("aadt")} className={styles.input} disabled={true} />
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.14 שנת מדידת AADT אחרונה *</span>
        <input type="text" {...register("aadtYear")} className={styles.input} disabled={true} maxLength={4} />
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.15 AADTT משאיות (%) *</span>
        <input type="text" {...register("aadtt")} className={styles.input} disabled={true} />
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.16 מעקף בדרכים קיימות</span>
        <select {...register("bypassPossible")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {BYPASS_POSSIBLE_OPTIONS.map(option => (
            <option key={`bypass-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="bypassPossible" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.17 אורך מעקף (ק״מ)</span>
        <input type="text" {...register("bypassLength")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="bypassLength" />
      </label>

      <label className={`${styles.field} ${styles.fullWidth}`}>
        <span className={styles.label}>3.18 תיאור תוואי מעקף מועדף</span>
        <textarea {...register("bypassDescription")} className={styles.textarea} disabled={isReadonly} rows={3} />
        <FieldError errors={errors} name="bypassDescription" />
      </label>

      <div className={`${styles.field} ${styles.fullWidth}`}>
        {isReadonly ? (
          <>
            <span className={styles.label}>תמונה לתיאור תוואי מעקף מועדף</span>
            {bypassDescriptionImageValue ? (
              <img src={bypassDescriptionImageValue} alt="תמונת מעקף מועדף" className={styles.bypassImagePreview} />
            ) : (
              <Text className={styles.restricted}>לא הועלתה תמונה</Text>
            )}
          </>
        ) : (
          <>
            <ImageUpload
              label="תמונה לתיאור תוואי מעקף מועדף"
              value={bypassDescriptionImageValue || null}
              onChange={onBypassDescriptionImageChange}
              helperText="פורמטים נתמכים: JPG, PNG, WEBP (עד 2MB)"
              shape="rect"
            />
            <FieldError errors={errors} name="bypassDescriptionImage" />
          </>
        )}
      </div>

      <label className={styles.field}>
        <span className={styles.label}>3.19 מעקף מקומי</span>
        <select {...register("localBypass")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {LOCAL_BYPASS_OPTIONS.map(option => (
            <option key={`local-bypass-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="localBypass" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.20 שיטת ביצוע מעקף מקומי</span>
        <select {...register("localBypassMethod")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {LOCAL_BYPASS_METHOD_OPTIONS.map(option => (
            <option key={`local-bypass-method-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="localBypassMethod" />
      </label>

      {localBypassMethodValue === "3.20-6" && (
        <label className={styles.field}>
          <span className={styles.label}>3.20 פירוט אחר</span>
          <textarea {...register("localBypassMethodOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
          <FieldError errors={errors} name="localBypassMethodOther" />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>3.21 מתכנן מקורי</span>
        <input type="text" {...register("originalPlanner")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="originalPlanner" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>3.22 מתכנן שיקום / הרחבה</span>
        <input type="text" {...register("rehabPlanner")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="rehabPlanner" />
      </label>
    </div>
  </section>
)

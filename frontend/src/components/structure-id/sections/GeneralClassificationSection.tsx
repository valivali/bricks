import React from "react"
import { Text, Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"
import {
  AUTHORITY_OPTIONS,
  PRIMARY_CLASSIFICATION_OPTIONS,
  SECONDARY_CLASSIFICATION_OPTIONS,
  TRAFFIC_FUNCTION_OPTIONS,
  YES_NO_OPTIONS
} from "../structureIdOptions"
import type { StructureIdSectionBaseProps } from "../sectionTypes"

export const GeneralClassificationSection: React.FC<StructureIdSectionBaseProps> = ({ register, isReadonly }) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      נתוני סיווג כלליים
    </Title>

    <div className={styles.grid}>
      <label className={styles.field}>
        <span className={styles.label}>2.1 קבוצת סיווג ראשית</span>
        <select {...register("primaryClassificationGroup")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {PRIMARY_CLASSIFICATION_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>2.2 קבוצת סיווג משנית</span>
        <select {...register("secondaryClassificationGroup")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {SECONDARY_CLASSIFICATION_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>2.3 סיווג תפקוד תנועתי</span>
        <select {...register("trafficFunctionClass")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר סיווג</option>
          {TRAFFIC_FUNCTION_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>2.4 סיווג חירום *</span>
        <select {...register("emergencyClass")} className={styles.select} disabled={true}>
          <option value="">בחר</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.restricted}>שדה מוגבל</span>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>2.5 הוקם על ידי *</span>
        <select {...register("builtBy")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {AUTHORITY_OPTIONS.map(option => (
            <option key={`built-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>2.6 בעלים *</span>
        <select {...register("owner")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {AUTHORITY_OPTIONS.map(option => (
            <option key={`owner-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>2.7 אחריות אחזקה *</span>
        <select {...register("maintenanceResponsibility")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {AUTHORITY_OPTIONS.map(option => (
            <option key={`maint-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>2.8 שייך לכביש אגרה</span>
        <select {...register("tollRoad")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>2.9 הובלות מיוחדות *</span>
        <select {...register("specialTransport")} className={styles.select} disabled={true}>
          <option value="">בחר</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>2.10 ערך היסטורי *</span>
        <select {...register("historicalValue")} className={styles.select} disabled={true}>
          <option value="">בחר</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>2.11 מבנה זמני *</span>
        <select {...register("temporaryStructure")} className={styles.select} disabled={true}>
          <option value="">בחר</option>
          {YES_NO_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Text className={styles.restricted}>שדה מוגבל</Text>
      </label>
    </div>
  </section>
)

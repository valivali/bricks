import React from "react"
import { Text, Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"
import { AREA_OPTIONS } from "../structureIdOptions"
import type { StructureIdSectionBaseProps } from "../sectionTypes"

export const GeneralIdentificationSection: React.FC<StructureIdSectionBaseProps> = ({ register, errors, isReadonly }) => (
  <section className={styles.section}>
    <Title level={3} className={styles.sectionTitle}>
      נתוני זיהוי כלליים
    </Title>

    <div className={styles.grid}>
      <label className={styles.field}>
        <span className={styles.label}>1.1 מספר המבנה</span>
        <input type="text" {...register("structureNumber")} className={styles.input} disabled={isReadonly} placeholder="S-BRG-BNNNNNnn" />
        {errors.structureNumber && <Text className={styles.error}>{errors.structureNumber.message}</Text>}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>1.2 שם המבנה</span>
        <input type="text" {...register("structureName")} className={styles.input} disabled={isReadonly} />
        {errors.structureName && <Text className={styles.error}>{errors.structureName.message}</Text>}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>1.3 סימון המבנה</span>
        <input type="text" {...register("structureMarking")} className={styles.input} disabled={isReadonly} />
        {errors.structureMarking && <Text className={styles.error}>{errors.structureMarking.message}</Text>}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>1.5 מרחב</span>
        <select {...register("area")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר מרחב</option>
          {AREA_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.area && <Text className={styles.error}>{errors.area.message}</Text>}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>1.6 שייך לכביש</span>
        <input type="text" {...register("belongsToRoad")} className={styles.input} disabled={isReadonly} maxLength={4} />
        {errors.belongsToRoad && <Text className={styles.error}>{errors.belongsToRoad.message}</Text>}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>1.7 מרחק רץ (ק"מ)</span>
        <input type="text" {...register("runningDistanceKm")} className={styles.input} disabled={isReadonly} placeholder="XXX.MMM" />
        {errors.runningDistanceKm && <Text className={styles.error}>{errors.runningDistanceKm.message}</Text>}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>1.10 אורדינטה צפונית N</span>
        <input type="text" {...register("coordinateNorth")} className={styles.input} disabled={isReadonly} maxLength={6} />
        {errors.coordinateNorth && <Text className={styles.error}>{errors.coordinateNorth.message}</Text>}
      </label>

      <label className={styles.field}>
        <span className={styles.label}>1.11 אורדינטה מזרחית E</span>
        <input type="text" {...register("coordinateEast")} className={styles.input} disabled={isReadonly} maxLength={6} />
        {errors.coordinateEast && <Text className={styles.error}>{errors.coordinateEast.message}</Text>}
      </label>

      <label className={`${styles.field} ${styles.fullWidth}`}>
        <span className={styles.label}>1.4 תיאור כללי (מילולי)</span>
        <textarea {...register("generalDescription")} className={styles.textarea} disabled={isReadonly} rows={3} />
        {errors.generalDescription && <Text className={styles.error}>{errors.generalDescription.message}</Text>}
      </label>
    </div>
  </section>
)

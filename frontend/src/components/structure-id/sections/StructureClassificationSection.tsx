import React from "react"

import { FieldError } from "@/components/structure-id/FieldError"
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
      <label className={styles.field}>
        <span className={styles.label}>5.1 מספר סוגי מבנה עליון/מיסעה/תקרה</span>
        <input type="text" {...register("deckTypeCount")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="deckTypeCount" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>5.2 סיווג מבנה עליון/מיסעה/תקרה</span>
        <select {...register("deckTypes")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {DECK_TYPE_OPTIONS.map(option => (
            <option key={`deck-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="deckTypes" />
      </label>

      {deckTypesValue === "5.2-12" && (
        <label className={styles.field}>
          <span className={styles.label}>5.2 פירוט אחר</span>
          <textarea {...register("deckTypesOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
          <FieldError errors={errors} name="deckTypesOther" />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>5.3 סיווג רצפה</span>
        <select {...register("floorType")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {FLOOR_TYPE_OPTIONS.map(option => (
            <option key={`floor-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="floorType" />
      </label>

      {floorTypeValue === "5.3-3" && (
        <label className={styles.field}>
          <span className={styles.label}>5.3 פירוט אחר</span>
          <textarea {...register("floorTypeOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
          <FieldError errors={errors} name="floorTypeOther" />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>5.4 סיווג נציב / קיר קצה 1</span>
        <select {...register("abutment1Type")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {ABUTMENT_TYPE_1_OPTIONS.map(option => (
            <option key={`abutment1-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="abutment1Type" />
      </label>

      {abutment1TypeValue === "5.4-7" && (
        <label className={styles.field}>
          <span className={styles.label}>5.4 פירוט אחר</span>
          <input type="text" {...register("abutment1TypeOther")} className={styles.input} disabled={isReadonly} />
          <FieldError errors={errors} name="abutment1TypeOther" />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>5.5 סיווג נציב / קיר קצה 2</span>
        <select {...register("abutment2Type")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {ABUTMENT_TYPE_2_OPTIONS.map(option => (
            <option key={`abutment2-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="abutment2Type" />
      </label>

      {abutment2TypeValue === "5.5-7" && (
        <label className={styles.field}>
          <span className={styles.label}>5.5 פירוט אחר</span>
          <input type="text" {...register("abutment2TypeOther")} className={styles.input} disabled={isReadonly} />
          <FieldError errors={errors} name="abutment2TypeOther" />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>5.6 מספר סוגי נציבים ביניים</span>
        <input type="text" {...register("pierTypeCount")} className={styles.input} disabled={isReadonly} />
        <FieldError errors={errors} name="pierTypeCount" />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>5.7 סיווג נציבים ביניים (בהתאם לכמות ולסוג)</span>
        <select {...register("pierTypes")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {PIER_TYPE_OPTIONS.map(option => (
            <option key={`pier-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="pierTypes" />
      </label>

      {pierTypesValue === "5.7-6" && (
        <label className={styles.field}>
          <span className={styles.label}>5.7 פירוט אחר</span>
          <textarea {...register("pierTypesOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
          <FieldError errors={errors} name="pierTypesOther" />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>5.8 סוג דריכה</span>
        <select {...register("prestressingType")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {PRESTRESSING_TYPE_OPTIONS.map(option => (
            <option key={`prestress-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="prestressingType" />
      </label>

      {prestressingTypeValue === "5.8-7" && (
        <label className={styles.field}>
          <span className={styles.label}>5.8 פירוט אחר</span>
          <input type="text" {...register("prestressingTypeOther")} className={styles.input} disabled={isReadonly} />
          <FieldError errors={errors} name="prestressingTypeOther" />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>5.9 סוג סמכים</span>
        <select {...register("bearingTypes")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {BEARING_TYPE_OPTIONS.map(option => (
            <option key={`bearing-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="bearingTypes" />
      </label>

      {bearingTypesValue === "5.9-5" && (
        <label className={styles.field}>
          <span className={styles.label}>5.9 פירוט אחר</span>
          <textarea {...register("bearingTypesOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
          <FieldError errors={errors} name="bearingTypesOther" />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>5.10 סוג תפרים</span>
        <select {...register("jointTypes")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {JOINT_TYPE_OPTIONS.map(option => (
            <option key={`joint-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError errors={errors} name="jointTypes" />
      </label>

      {jointTypesValue === "5.10-7" && (
        <label className={styles.field}>
          <span className={styles.label}>5.10 פירוט אחר</span>
          <textarea {...register("jointTypesOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
          <FieldError errors={errors} name="jointTypesOther" />
        </label>
      )}
    </div>
  </section>
)

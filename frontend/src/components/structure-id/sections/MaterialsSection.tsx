import React from "react"
import { Title } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"
import { MATERIAL_OPTIONS } from "../structureIdOptions"
import type { StructureIdSectionBaseProps } from "../sectionTypes"

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
  isReadonly,
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
      <label className={styles.field}>
        <span className={styles.label}>6.1 חומרי מבנה עליון / מיסעה / תקרה</span>
        <select {...register("deckMaterials")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {MATERIAL_OPTIONS.map(option => (
            <option key={`material-deck-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {deckMaterialsValue === "6.123" && (
        <label className={styles.field}>
          <span className={styles.label}>6.1 פירוט אחר</span>
          <textarea {...register("deckMaterialsOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>6.2 חומרי קורות</span>
        <select {...register("beamMaterials")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {MATERIAL_OPTIONS.map(option => (
            <option key={`material-beam-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {beamMaterialsValue === "6.123" && (
        <label className={styles.field}>
          <span className={styles.label}>6.2 פירוט אחר</span>
          <textarea {...register("beamMaterialsOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>6.3 חומרי נציבים / קירות קצה</span>
        <select {...register("abutmentMaterials")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {MATERIAL_OPTIONS.map(option => (
            <option key={`material-abutment-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {abutmentMaterialsValue === "6.123" && (
        <label className={styles.field}>
          <span className={styles.label}>6.3 פירוט אחר</span>
          <textarea {...register("abutmentMaterialsOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>6.4 חומרי נציבים ביניים</span>
        <select {...register("pierMaterials")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {MATERIAL_OPTIONS.map(option => (
            <option key={`material-pier-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {pierMaterialsValue === "6.123" && (
        <label className={styles.field}>
          <span className={styles.label}>6.4 פירוט אחר</span>
          <textarea {...register("pierMaterialsOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>6.5 חומרי הגנת מדרון נתמך</span>
        <select {...register("slopeProtectionMaterials")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {MATERIAL_OPTIONS.map(option => (
            <option key={`material-slope-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {slopeProtectionMaterialsValue === "6.123" && (
        <label className={styles.field}>
          <span className={styles.label}>6.5 פירוט אחר</span>
          <textarea {...register("slopeProtectionMaterialsOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>6.6 חומרי מעקה רכב</span>
        <select {...register("vehicleBarrierMaterials")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {MATERIAL_OPTIONS.map(option => (
            <option key={`material-vehicle-barrier-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {vehicleBarrierMaterialsValue === "6.123" && (
        <label className={styles.field}>
          <span className={styles.label}>6.6 פירוט אחר</span>
          <textarea {...register("vehicleBarrierMaterialsOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>6.7 חומרי מעקה הולכי רגל</span>
        <select {...register("pedestrianRailingMaterials")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {MATERIAL_OPTIONS.map(option => (
            <option key={`material-pedestrian-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {pedestrianRailingMaterialsValue === "6.123" && (
        <label className={styles.field}>
          <span className={styles.label}>6.7 פירוט אחר</span>
          <textarea {...register("pedestrianRailingMaterialsOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>6.8 חומרי ציפוי מיסעה</span>
        <select {...register("deckCoveringMaterials")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {MATERIAL_OPTIONS.map(option => (
            <option key={`material-deck-cover-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {deckCoveringMaterialsValue === "6.123" && (
        <label className={styles.field}>
          <span className={styles.label}>6.8 פירוט אחר</span>
          <textarea {...register("deckCoveringMaterialsOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>6.9 חומרי איטום מיסעה</span>
        <select {...register("deckSealingMaterials")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {MATERIAL_OPTIONS.map(option => (
            <option key={`material-deck-seal-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {deckSealingMaterialsValue === "6.123" && (
        <label className={styles.field}>
          <span className={styles.label}>6.9 פירוט אחר</span>
          <textarea {...register("deckSealingMaterialsOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}

      <label className={styles.field}>
        <span className={styles.label}>6.10 חומרי אבן שפה</span>
        <select {...register("curbMaterials")} className={styles.select} disabled={isReadonly}>
          <option value="">בחר</option>
          {MATERIAL_OPTIONS.map(option => (
            <option key={`material-curb-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {curbMaterialsValue === "6.123" && (
        <label className={styles.field}>
          <span className={styles.label}>6.10 פירוט אחר</span>
          <textarea {...register("curbMaterialsOther")} className={styles.textarea} disabled={isReadonly} rows={2} />
        </label>
      )}
    </div>
  </section>
)

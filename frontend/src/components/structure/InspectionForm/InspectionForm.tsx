import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/button/button"
import { type InspectionFormValues, inspectionSchema } from "@/schemas/inspection.schema"

import styles from "./InspectionForm.module.scss"

const nextInspectionOptions = [
  { value: "בקרת נזקים", label: "בקרת נזקים" },
  { value: "מוקדמת", label: "מוקדמת" },
  { value: "מיוחדת", label: "מיוחדת" },
  { value: "מעמיקה", label: "מעמיקה" },
  { value: "ראשונית", label: "ראשונית" },
  { value: "שגרתית", label: "שגרתית" }
]

interface InspectionFormProps {
  defaultValues: InspectionFormValues
  onSubmit: (values: InspectionFormValues) => Promise<void> | void
  onBack: () => void
}

const InspectionForm: React.FC<InspectionFormProps> = ({ defaultValues, onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<InspectionFormValues>({
    resolver: zodResolver(inspectionSchema),
    defaultValues
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const fullStructureIncluded = watch("fullStructureIncluded")

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>שם החברה</span>
          <input
            type="text"
            {...register("companyName")}
            className={`${errors.companyName ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.companyName && <span className={styles.error}>{errors.companyName.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>שם הסוקר</span>
          <input
            type="text"
            {...register("inspectorName")}
            className={`${errors.inspectorName ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.inspectorName && <span className={styles.error}>{errors.inspectorName.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>עדכון אחרון</span>
          <input
            type="date"
            {...register("lastUpdated")}
            className={`${errors.lastUpdated ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.lastUpdated && <span className={styles.error}>{errors.lastUpdated.message}</span>}
        </label>

        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span className={styles.label}>נתונים כלליים - סוג מבנה</span>
          <input
            type="text"
            readOnly
            {...register("structureType")}
            className={`${errors.structureType ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.structureType && <span className={styles.error}>{errors.structureType.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>מספר המבנה</span>
          <input
            type="text"
            {...register("structureNumber")}
            className={`${errors.structureNumber ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.structureNumber && <span className={styles.error}>{errors.structureNumber.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>שם המבנה</span>
          <input
            type="text"
            {...register("structureName")}
            className={`${errors.structureName ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.structureName && <span className={styles.error}>{errors.structureName.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>סימון המבנה</span>
          <input
            type="text"
            {...register("structureMarking")}
            className={`${errors.structureMarking ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.structureMarking && <span className={styles.error}>{errors.structureMarking.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>כביש מס'</span>
          <input
            type="text"
            {...register("roadNumber")}
            className={`${errors.roadNumber ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.roadNumber && <span className={styles.error}>{errors.roadNumber.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>מרחב</span>
          <input type="text" {...register("area")} className={`${errors.area ? styles.inputError : styles.input} ${styles.textInput}`} />
          {errors.area && <span className={styles.error}>{errors.area.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>מרחק רץ</span>
          <input
            type="text"
            {...register("runningDistance")}
            className={`${errors.runningDistance ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.runningDistance && <span className={styles.error}>{errors.runningDistance.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>קואורדינטות זיהוי (צפוניות N)</span>
          <input
            type="text"
            {...register("coordinateNorth")}
            className={`${errors.coordinateNorth ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.coordinateNorth && <span className={styles.error}>{errors.coordinateNorth.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>קואורדינטות זיהוי (מזרחיות E)</span>
          <input
            type="text"
            {...register("coordinateEast")}
            className={`${errors.coordinateEast ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.coordinateEast && <span className={styles.error}>{errors.coordinateEast.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>סוג סקירה</span>
          <select
            {...register("inspectionType")}
            className={`${errors.inspectionType ? styles.inputError : styles.select} ${styles.textInput}`}>
            <option value="">בחר סוג סקירה</option>
            {nextInspectionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.inspectionType && <span className={styles.error}>{errors.inspectionType.message}</span>}
        </label>

        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span className={styles.label}>תיאור כללי</span>
          <textarea {...register("generalDescription")} className={errors.generalDescription ? styles.inputError : styles.textarea} />
          {errors.generalDescription && <span className={styles.error}>{errors.generalDescription.message}</span>}
        </label>

        <div className={styles.inlineGroup}>
          <div className={styles.field}>
            <span className={styles.label}>כל המבנה נכלל</span>
            <label className={styles.checkboxRow}>
              <input type="checkbox" {...register("fullStructureIncluded")} />
              כן, כל המבנה נכלל בסקירה
            </label>
          </div>

          {!fullStructureIncluded && (
            <label className={`${styles.field} ${styles.notesField}`}>
              <span className={styles.label}>הערות</span>
              <input
                type="text"
                {...register("fullStructureNotes")}
                className={`${errors.fullStructureNotes ? styles.inputError : styles.input} ${styles.noteInput}`}
              />
              {errors.fullStructureNotes && <span className={styles.error}>{errors.fullStructureNotes.message}</span>}
            </label>
          )}
        </div>

        <div className={styles.inlineGroup}>
          <label className={styles.field}>
            <span className={styles.label}>מס' מפתחים/תאים הנסקרים בנפרד</span>
            <input type="number" min="0" {...register("spanCount")} className={`${errors.spanCount ? styles.inputError : styles.input}`} />
            {errors.spanCount && <span className={styles.error}>{errors.spanCount.message}</span>}
          </label>

          <label className={`${styles.field} ${styles.notesField}`}>
            <span className={styles.label}>הערות</span>
            <input
              type="text"
              {...register("spanCountNotes")}
              className={`${errors.spanCountNotes ? styles.inputError : styles.input} ${styles.noteInput}`}
            />
            {errors.spanCountNotes && <span className={styles.error}>{errors.spanCountNotes.message}</span>}
          </label>
        </div>

        <div className={styles.inlineGroup}>
          <label className={styles.field}>
            <span className={styles.label}>מבנים סמוכים/משיקים (מספר)</span>
            <input
              type="number"
              min="0"
              {...register("adjacentStructures")}
              className={`${errors.adjacentStructures ? styles.inputError : styles.input}`}
            />
            {errors.adjacentStructures && <span className={styles.error}>{errors.adjacentStructures.message}</span>}
          </label>

          <label className={`${styles.field} ${styles.notesField}`}>
            <span className={styles.label}>הערות</span>
            <input
              type="text"
              {...register("adjacentStructuresNotes")}
              className={`${errors.adjacentStructuresNotes ? styles.inputError : styles.input} ${styles.noteInput}`}
            />
            {errors.adjacentStructuresNotes && <span className={styles.error}>{errors.adjacentStructuresNotes.message}</span>}
          </label>
        </div>

        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span className={styles.label}>הגבלות כלליות כפי שנצפו באתר</span>
          <input
            type="text"
            {...register("siteRestrictions")}
            className={`${errors.siteRestrictions ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.siteRestrictions && <span className={styles.error}>{errors.siteRestrictions.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>תאריך סקירה</span>
          <input
            type="date"
            {...register("inspectionDate")}
            className={`${errors.inspectionDate ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.inspectionDate && <span className={styles.error}>{errors.inspectionDate.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>סוג סקירה הבאה</span>
          <select
            {...register("nextInspectionType")}
            className={`${errors.nextInspectionType ? styles.inputError : styles.select} ${styles.textInput}`}>
            <option value="">בחר סוג סקירה</option>
            {nextInspectionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.nextInspectionType && <span className={styles.error}>{errors.nextInspectionType.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>תאריך סקירה הבאה</span>
          <input
            type="date"
            {...register("nextInspectionDate")}
            className={`${errors.nextInspectionDate ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.nextInspectionDate && <span className={styles.error}>{errors.nextInspectionDate.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>סיווג לסקירה</span>
          <input
            type="text"
            {...register("classificationForInspection")}
            className={`${errors.classificationForInspection ? styles.inputError : styles.input} ${styles.textInput}`}
          />
          {errors.classificationForInspection && <span className={styles.error}>{errors.classificationForInspection.message}</span>}
        </label>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={onBack}>
          חזור
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          שמור טופס
        </Button>
      </div>
    </form>
  )
}

export default InspectionForm

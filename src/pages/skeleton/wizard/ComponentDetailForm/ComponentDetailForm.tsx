import React, { useState, useCallback, useMemo } from "react"
import { type StructuralComponent } from "@/config/skeleton-data"
import { type SubComponentData, type FormValues } from "../../types"
import FileUpload from "@/components/UI/FileUpload/FileUpload"
import { Button } from "@/components/UI/button/button"
import { match } from "ts-pattern"
import { useForm } from "react-hook-form"
import styles from "./ComponentDetailForm.module.scss"

interface ComponentDetailFormProps {
  filteredComponents: StructuralComponent[]
  quantities: Record<string, string>
  initialFormValues: FormValues
  onSubmit: (data: FormValues) => void
  onBack: () => void
}

const ComponentDetailForm: React.FC<ComponentDetailFormProps> = ({
  filteredComponents,
  quantities,
  initialFormValues,
  onSubmit,
  onBack
}) => {
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null)

  const { watch, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: initialFormValues
  })

  const formValues = watch()

  const getComponentRecord = useCallback(
    (id: string) => {
      if (formValues.components[id]) return formValues.components[id]

      const parts = id.split(".")
      let current: any = formValues.components
      for (const part of parts) {
        if (current && typeof current === "object" && part in current) {
          current = current[part]
        } else {
          return undefined
        }
      }
      return current
    },
    [formValues.components]
  )

  const handleSubComponentChange = useCallback(
    (componentId: string, index: number, field: keyof SubComponentData, value: any) => {
      const record = getComponentRecord(componentId)
      if (!record) return

      const subs = [...record.subComponents]
      if (subs[index]) {
        const now = new Date().toISOString().split("T")[0]
        subs[index] = {
          ...subs[index],
          [field]: value,
          updatedAt: now
        }

        const updatedComponents = { ...formValues.components }
        setValue("components" as any, {
          ...updatedComponents,
          [componentId]: {
            ...record,
            subComponents: subs,
            updatedAt: now
          }
        })
      }
    },
    [formValues.components, getComponentRecord, setValue]
  )

  const handleComponentCommentsChange = useCallback(
    (componentId: string, value: string) => {
      const record = getComponentRecord(componentId)
      if (!record) return

      const now = new Date().toISOString().split("T")[0]
      setValue("components" as any, {
        ...formValues.components,
        [componentId]: {
          ...record,
          comments: value,
          updatedAt: now
        }
      })
    },
    [formValues.components, getComponentRecord, setValue]
  )

  const componentMetrics = useMemo(() => {
    const metrics: Record<string, { status: string; totalBasicQuantity: number }> = {}

    filteredComponents.forEach(comp => {
      const record = getComponentRecord(comp.componentId)
      const subs = record?.subComponents || []

      // Calculate Status
      let status: "not-filled" | "semi-filled" | "all-filled" = "not-filled"
      if (subs.length > 0) {
        const filledCount = subs.filter((s: any) => s.basicQuantity > 0 && s.name).length
        if (filledCount === subs.length) status = "all-filled"
        else if (filledCount > 0) status = "semi-filled"
      }

      // Calculate Quantity
      const totalBasicQuantity = subs.reduce((sum: number, sub: any) => sum + (Number(sub.basicQuantity) || 0), 0)

      metrics[comp.componentId] = { status, totalBasicQuantity }
    })

    return metrics
  }, [filteredComponents, getComponentRecord])

  const renderStatusIcon = useCallback((status: string) => {
    return match(status)
      .with("all-filled", () => <div className={`${styles.statusIcon} ${styles.green}`} title="הכל מלא" />)
      .with("semi-filled", () => <div className={`${styles.statusIcon} ${styles.yellow}`} title="חלקי" />)
      .with("not-filled", () => <div className={`${styles.statusIcon} ${styles.red}`} title="לא מלא" />)
      .otherwise(() => null)
  }, [])

  const activeComponent = filteredComponents.find(c => c.componentId === activeComponentId)

  if (activeComponentId && activeComponent) {
    return (
      <div className={styles.container}>
        <div className={styles.detailHeader}>
          <Button variant="outline" size="sm" onClick={() => setActiveComponentId(null)}>
            חזור לרשימה
          </Button>
          <div className={styles.componentTitle}>
            <strong>{activeComponent.componentId}</strong> - {activeComponent.description}
          </div>
        </div>

        <div className={styles.subTableContainer}>
          <table className={styles.subTable}>
            <thead>
              <tr>
                <th>מס'</th>
                <th className={styles.quantityCell}>שם רכיב משנה</th>
                <th className={styles.quantityCell}>כמות (בסיס)</th>
                <th className={styles.unitCell}>יח' (בסיס)</th>
                <th className={styles.quantityCell}>כמות (משנית)</th>
                <th className={styles.unitCell}>יח' (משנית)</th>
                <th>קובץ</th>
                <th>הערות</th>
                <th>תאריך</th>
              </tr>
            </thead>
            <tbody>
              {(getComponentRecord(activeComponentId)?.subComponents || []).map((sub: any, index: number) => (
                <tr key={index}>
                  <td>{sub.id}</td>
                  <td>
                    <input
                      className={styles.tableInput}
                      value={sub.name}
                      onChange={e => handleSubComponentChange(activeComponentId, index, "name", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className={styles.tableInput}
                      value={sub.basicQuantity || ""}
                      placeholder="0"
                      onChange={e => handleSubComponentChange(activeComponentId, index, "basicQuantity", parseFloat(e.target.value) || 0)}
                    />
                  </td>
                  <td>{activeComponent.basicMeasurementUnit}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className={styles.tableInput}
                      value={sub.secondaryQuantity || ""}
                      placeholder="0"
                      onChange={e =>
                        handleSubComponentChange(activeComponentId, index, "secondaryQuantity", parseFloat(e.target.value) || 0)
                      }
                    />
                  </td>
                  <td>{activeComponent.secondaryMeasurementUnit || "-"}</td>
                  <td>
                    <FileUpload
                      value={sub.attachment}
                      onFileSelect={file => handleSubComponentChange(activeComponentId, index, "attachment", file?.name)}
                      onRemove={() => handleSubComponentChange(activeComponentId, index, "attachment", undefined)}
                    />
                  </td>
                  <td className={styles.commentsCell}>
                    <textarea
                      className={styles.tableInput}
                      rows={3}
                      value={sub.comments}
                      onChange={e => handleSubComponentChange(activeComponentId, index, "comments", e.target.value)}
                    />
                  </td>
                  <td className={styles.dateCell}>{sub.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.actions}>
          <Button onClick={() => setActiveComponentId(null)}>סיום ועריכת רכיבי משנה</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.statusLegend}>
        <div className={styles.legendItem}>
          <div className={`${styles.statusIcon} ${styles.green}`} /> הכל מלא
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.statusIcon} ${styles.yellow}`} /> חלקי
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.statusIcon} ${styles.red}`} /> לא מלא
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.componentsTable}>
          <thead>
            <tr>
              <th>מזהה</th>
              <th>תיאור</th>
              <th>כמות רכיבי משנה</th>
              <th>יחידת מידה</th>
              <th>כמות יחידת מידה בסיסית</th>
              <th>הערות</th>
              <th>תאריך</th>
              <th>מצב נוכחי</th>
            </tr>
          </thead>
          <tbody>
            {filteredComponents.map(comp => (
              <tr key={comp.componentId} className={styles.masterRow} onClick={() => setActiveComponentId(comp.componentId)}>
                <td>{comp.componentId}</td>
                <td>{comp.description}</td>
                <td>{quantities[comp.componentId]}</td>
                <td>{comp.basicMeasurementUnit}</td>
                <td className={styles.calculatedCell}>{componentMetrics[comp.componentId]?.totalBasicQuantity.toLocaleString()}</td>
                <td className={styles.masterCommentsCell} onClick={e => e.stopPropagation()}>
                  <textarea
                    className={styles.tableInput}
                    rows={1}
                    value={getComponentRecord(comp.componentId)?.comments || ""}
                    onChange={e => handleComponentCommentsChange(comp.componentId, e.target.value)}
                  />
                </td>
                <td className={styles.dateCell}>{getComponentRecord(comp.componentId)?.updatedAt}</td>
                <td>{renderStatusIcon(componentMetrics[comp.componentId]?.status || "not-filled")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.actions}>
        <Button variant="outline" onClick={onBack}>
          חזור
        </Button>
        <Button onClick={handleSubmit(onSubmit)} className={styles.submitButton}>
          שלח
        </Button>
      </div>
    </div>
  )
}

export default ComponentDetailForm

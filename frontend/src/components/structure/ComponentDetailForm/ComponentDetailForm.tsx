import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { match } from "ts-pattern"

import { Button } from "@/components/UI/button/button"
import FileUpload from "@/components/UI/FileUpload/FileUpload"
import { type StructuralComponent } from "@/config/skeleton-data.types"
import { type ComponentFormRecord, type FormValues, type SubComponentData } from "@/types/structure-component.types"

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
  const rootRef = useRef<HTMLDivElement | null>(null)
  const prevActiveComponentIdRef = useRef<string | null>(null)
  const savedScrollTopRef = useRef(0)
  const savedScrollContainerRef = useRef<HTMLElement | null>(null)
  const hasSavedScrollRef = useRef(false)

  const findScrollContainer = useCallback((): HTMLElement | null => {
    let el: HTMLElement | null = rootRef.current
    while (el) {
      const style = window.getComputedStyle(el)
      if ((style.overflowY === "auto" || style.overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
        return el
      }
      el = el.parentElement
    }
    return null
  }, [])

  const scrollDrawerToTop = useCallback(() => {
    findScrollContainer()?.scrollTo({ top: 0 })
  }, [findScrollContainer])

  const saveDrawerScrollPosition = useCallback(() => {
    const sc = findScrollContainer()
    if (!sc) return
    savedScrollContainerRef.current = sc
    savedScrollTopRef.current = sc.scrollTop
    hasSavedScrollRef.current = true
  }, [findScrollContainer])

  const restoreDrawerScrollPosition = useCallback(() => {
    if (!hasSavedScrollRef.current) return
    const sc = savedScrollContainerRef.current ?? findScrollContainer()
    if (!sc) return
    sc.scrollTo({ top: savedScrollTopRef.current })
    hasSavedScrollRef.current = false
  }, [findScrollContainer])

  useEffect(() => {
    const prev = prevActiveComponentIdRef.current

    if (activeComponentId && !prev) {
      requestAnimationFrame(() => scrollDrawerToTop())
    }

    if (!activeComponentId && prev) {
      requestAnimationFrame(() => restoreDrawerScrollPosition())
    }

    prevActiveComponentIdRef.current = activeComponentId
  }, [activeComponentId, restoreDrawerScrollPosition, scrollDrawerToTop])

  const { watch, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: initialFormValues
  })

  const formValues = watch()

  const getComponentRecord = useCallback(
    (id: string) => {
      if (formValues.components[id]) return formValues.components[id]

      const parts = id.split(".")
      let current: ComponentFormRecord | undefined = formValues.components[id]
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
    <K extends keyof SubComponentData>(componentId: string, index: number, field: K, value: SubComponentData[K]) => {
      const record = getComponentRecord(componentId)
      if (!record) return

      const subs = [...record.subComponents]
      if (subs[index]) {
        const now = new Date().toISOString().split("T")[0]

        let newValue = value
        if (field === "attachments") {
          // Handle attachments as an array
          newValue = value
        }

        subs[index] = {
          ...subs[index],
          [field]: newValue,
          updatedAt: now
        }

        const updatedComponents: Record<string, ComponentFormRecord | undefined> = {
          ...formValues.components,
          [componentId]: {
            ...record,
            subComponents: subs,
            updatedAt: now
          }
        }
        setValue("components", updatedComponents)
      }
    },
    [formValues.components, getComponentRecord, setValue]
  )

  const handleSubComponentFilesSelect = useCallback(
    (componentId: string, index: number, files: File[]) => {
      const record = getComponentRecord(componentId)
      if (!record) return

      const subs = [...record.subComponents]
      if (subs[index]) {
        // In a real app, you'd upload these files and get URLs back.
        // For now, we'll just use the file names as placeholders.
        const currentAttachments = subs[index].attachments ?? []
        const newAttachments = [...currentAttachments, ...files.map(f => f.name)]
        handleSubComponentChange(componentId, index, "attachments", newAttachments)
      }
    },
    [getComponentRecord, handleSubComponentChange]
  )

  const handleSubComponentFileRemove = useCallback(
    (componentId: string, index: number, fileIndex: number) => {
      const record = getComponentRecord(componentId)
      if (!record) return

      const subs = [...record.subComponents]
      if (subs[index]) {
        const currentAttachments = subs[index].attachments ?? []
        const newAttachments = currentAttachments.filter((_, i) => i !== fileIndex)
        handleSubComponentChange(componentId, index, "attachments", newAttachments)
      }
    },
    [getComponentRecord, handleSubComponentChange]
  )

  const handleComponentCommentsChange = useCallback(
    (componentId: string, value: string) => {
      const record = getComponentRecord(componentId)
      if (!record) return

      const now = new Date().toISOString().split("T")[0]
      const updatedComponents: Record<string, ComponentFormRecord | undefined> = {
        ...formValues.components,
        [componentId]: {
          ...record,
          comments: value,
          updatedAt: now
        }
      }

      setValue("components", updatedComponents)
    },
    [formValues.components, getComponentRecord, setValue]
  )

  const componentMetrics = useMemo(() => {
    const metrics: Record<string, { status: string; totalBasicQuantity: number }> = {}

    filteredComponents.forEach(comp => {
      const record = getComponentRecord(comp.componentId)
      const subs = record?.subComponents ?? []

      let status: "not-filled" | "semi-filled" | "all-filled" = "not-filled"
      if (subs.length > 0) {
        const filledCount = subs.filter((s: SubComponentData) => s.basicQuantity > 0 && s.name).length
        if (filledCount === subs.length) status = "all-filled"
        else if (filledCount > 0) status = "semi-filled"
      }

      const totalBasicQuantity = subs.reduce((sum: number, sub: SubComponentData) => sum + (Number(sub.basicQuantity) || 0), 0)

      metrics[comp.componentId] = { status, totalBasicQuantity }
    })

    return metrics
  }, [filteredComponents, getComponentRecord])

  const renderStatusBadge = useCallback((status: string) => {
    return match(status)
      .with("all-filled", () => (
        <div className={`${styles.statusBadge} ${styles.green}`}>
          <div className={`${styles.statusDot} ${styles.green}`} />
          הכל מלא
        </div>
      ))
      .with("semi-filled", () => (
        <div className={`${styles.statusBadge} ${styles.yellow}`}>
          <div className={`${styles.statusDot} ${styles.yellow}`} />
          חלקי
        </div>
      ))
      .with("not-filled", () => (
        <div className={`${styles.statusBadge} ${styles.red}`}>
          <div className={`${styles.statusDot} ${styles.red}`} />
          לא מלא
        </div>
      ))
      .otherwise(() => null)
  }, [])

  const activeComponent = filteredComponents.find(c => c.componentId === activeComponentId)

  if (activeComponentId && activeComponent) {
    return (
      <div ref={rootRef} className={styles.container}>
        <div className={styles.detailHeader}>
          <div className={styles.componentTitle}>
            <strong>{activeComponent.componentId}</strong> - {activeComponent.description}
          </div>
          <Button variant="outline" size="sm" onClick={() => setActiveComponentId(null)}>
            חזור לרשימה
          </Button>
        </div>

        <div className={styles.subCardsGrid}>
          {(getComponentRecord(activeComponentId)?.subComponents ?? []).map((sub: SubComponentData, index: number) => (
            <div key={index} className={styles.subCard}>
              <div className={styles.subCardHeader}>
                <div className={styles.subCardTitle}>
                  <input
                    className={styles.subNameInput}
                    value={sub.name}
                    placeholder="שם רכיב משנה"
                    onChange={e => handleSubComponentChange(activeComponentId, index, "name", e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.subCardBody}>
                <div className={styles.quantityGrid}>
                  <div className={styles.quantityField}>
                    <label>כמות (בסיס)</label>
                    <div className={styles.inputGroup}>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className={styles.tableInput}
                        value={sub.basicQuantity ?? ""}
                        placeholder="0"
                        onChange={e => handleSubComponentChange(activeComponentId, index, "basicQuantity", parseFloat(e.target.value) || 0)}
                      />
                      <span className={styles.unit}>{activeComponent.basicMeasurementUnit}</span>
                    </div>
                  </div>

                  <div className={styles.quantityField}>
                    <label>כמות (משנית)</label>
                    <div className={styles.inputGroup}>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className={styles.tableInput}
                        value={sub.secondaryQuantity ?? ""}
                        placeholder="0"
                        onChange={e =>
                          handleSubComponentChange(activeComponentId, index, "secondaryQuantity", parseFloat(e.target.value) || 0)
                        }
                      />
                      <span className={styles.unit}>{activeComponent.secondaryMeasurementUnit || "-"}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.subCardComments}>
                  <label>הערות</label>
                  <textarea
                    className={styles.tableInput}
                    rows={3}
                    placeholder="הוסף הערות לרכיב משנה זה..."
                    value={sub.comments}
                    onChange={e => handleSubComponentChange(activeComponentId, index, "comments", e.target.value)}
                  />
                </div>

                <div className={styles.subCardAttachments}>
                  <label>קבצים ותמונות</label>
                  <FileUpload
                    values={sub.attachments ?? []}
                    onFilesSelect={files => handleSubComponentFilesSelect(activeComponentId, index, files)}
                    onRemove={fileIndex => handleSubComponentFileRemove(activeComponentId, index, fileIndex)}
                  />
                </div>
              </div>

              <div className={styles.subCardFooter}>עדכון אחרון: {sub.updatedAt}</div>
            </div>
          ))}
        </div>

        <div className={styles.actions} style={{ padding: "0 1.5rem 1.5rem" }}>
          <Button onClick={() => setActiveComponentId(null)} style={{ width: "100%" }}>
            סיום ועריכת רכיבי משנה
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div ref={rootRef} className={styles.container}>
      <div className={styles.statusLegend}>
        <div className={styles.legendItem}>
          <div className={`${styles.statusDot} ${styles.green}`} /> הכל מלא
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.statusDot} ${styles.yellow}`} /> חלקי
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.statusDot} ${styles.red}`} /> לא מלא
        </div>
      </div>

      <div className={styles.cardsGrid}>
        {filteredComponents.map(comp => {
          const record = getComponentRecord(comp.componentId)
          const metrics = componentMetrics[comp.componentId]

          // Get the first image from any sub-component to show as preview
          const firstImage = record?.subComponents
            ?.find(s => s.attachments?.some(a => a.match(/\.(jpg|jpeg|png|gif|webp)$/i)))
            ?.attachments?.find(a => a.match(/\.(jpg|jpeg|png|gif|webp)$/i))

          return (
            <div
              key={comp.componentId}
              className={`${styles.componentCard} ${activeComponentId === comp.componentId ? styles.active : ""}`}
              onClick={() => {
                saveDrawerScrollPosition()
                setActiveComponentId(comp.componentId)
              }}>
              <div className={styles.cardImagePlaceholder}>
                {firstImage ? (
                  <img src={firstImage} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                )}
              </div>

              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                  <span className={styles.id}>{comp.componentId}</span>
                  <span className={styles.description}>{comp.description}</span>
                </div>
              </div>

              <div className={styles.cardMetrics}>
                <div className={styles.metricItem}>
                  <span className={styles.label}>כמות רכיבי משנה</span>
                  <span className={styles.value}>{quantities[comp.componentId]}</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.label}>כמות כוללת ({comp.basicMeasurementUnit})</span>
                  <span className={`${styles.value} ${styles.highlight}`}>{metrics?.totalBasicQuantity.toLocaleString()}</span>
                </div>
              </div>

              <div className={styles.masterCommentsWrapper} onClick={e => e.stopPropagation()}>
                <label>הערות כלליות</label>
                <textarea
                  className={styles.tableInput}
                  rows={2}
                  placeholder="הוסף הערות כאן..."
                  value={record?.comments ?? ""}
                  onChange={e => handleComponentCommentsChange(comp.componentId, e.target.value)}
                />
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.cardDate}>עדכון אחרון: {record?.updatedAt ?? "-"}</span>
                {renderStatusBadge(metrics?.status ?? "not-filled")}
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.actions}>
        <Button
          variant="outline"
          onClick={() => {
            scrollDrawerToTop()
            onBack()
          }}>
          חזור
        </Button>
        <Button
          onClick={handleSubmit(data => {
            scrollDrawerToTop()
            onSubmit(data)
          })}
          className={styles.submitButton}>
          המשך
        </Button>
      </div>
    </div>
  )
}

export default ComponentDetailForm

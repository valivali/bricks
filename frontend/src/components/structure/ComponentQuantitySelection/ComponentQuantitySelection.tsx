import React, { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@/components/UI/button/button"
import { type StructuralComponent } from "@/config/skeleton-data.types"

import styles from "./ComponentQuantitySelection.module.scss"

interface ComponentQuantitySelectionProps {
  components: StructuralComponent[]
  initialQuantities: Record<string, string>
  onNext: (quantities: Record<string, string>) => void
  onBack: () => void
}

const ComponentQuantitySelection: React.FC<ComponentQuantitySelectionProps> = ({ components, initialQuantities, onNext, onBack }) => {
  const [quantities, setQuantities] = useState<Record<string, string>>(initialQuantities)
  const rootRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    setQuantities(initialQuantities)
  }, [initialQuantities])

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

  const handleQuantityChange = (componentId: string, value: string) => {
    setQuantities(prev => ({
      ...prev,
      [componentId]: value
    }))
  }

  const hasSelectedComponents = Object.values(quantities).some(q => parseInt(q) > 0)

  return (
    <div ref={rootRef} className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.componentsTable}>
          <thead>
            <tr>
              <th>מזהה רכיב</th>
              <th>תיאור</th>
              <th>רמת חשיבות</th>
              <th>כמות</th>
            </tr>
          </thead>
          <tbody>
            {components.map(comp => (
              <tr key={comp.componentId}>
                <td>{comp.componentId}</td>
                <td>{comp.description}</td>
                <td>{comp.importanceLevel}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    className={styles.quantityInput}
                    value={quantities[comp.componentId] || ""}
                    onChange={e => handleQuantityChange(comp.componentId, e.target.value)}
                    placeholder="0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          onClick={() => {
            scrollDrawerToTop()
            onNext(quantities)
          }}
          disabled={!hasSelectedComponents}
          className={styles.nextButton}>
          המשך
        </Button>
      </div>
    </div>
  )
}

export default ComponentQuantitySelection

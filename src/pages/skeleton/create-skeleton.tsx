import React, { useState, useMemo } from "react"
import styles from "./create-skeleton.module.scss"
import {
  SKELETON_STRUCTURE_TYPES,
  type SkeletonOption,
  BRIDGE_STRUCTURAL_COMPONENTS,
  SIGNAGE_BRIDGE_STRUCTURAL_COMPONENTS,
  TUNNEL_STRUCTURAL_COMPONENTS,
  WALL_STRUCTURAL_COMPONENTS,
  ImportanceLevel,
  type StructuralComponent,
  StructureType
} from "@/config/skeleton-data"
import Radio from "@/components/UI/Radio/Radio"
import { Button } from "@/components/UI/button/button"
import { Title } from "@/components/UI/Text/text"
import { match } from "ts-pattern"

const STEP_METADATA = [
  { title: "בחר מבנה", layout: styles.smallerRadio },
  { title: "תיאור מבנה", layout: styles.grid },
  { title: "בחר תת-סוג", layout: styles.list },
  { title: "רכיבים", layout: styles.componentsTable }
]

const CreateSkeleton: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPath, setSelectedPath] = useState<SkeletonOption[]>([])
  const [quantities, setQuantities] = useState<Record<string, string>>({})

  const currentStepOptions = useMemo(() => {
    if (currentStep === 1) {
      return SKELETON_STRUCTURE_TYPES
    }
    return selectedPath[currentStep - 2]?.subOptions || []
  }, [currentStep, selectedPath])

  const processedComponents = useMemo(() => {
    const finalSelection = selectedPath[selectedPath.length - 1]
    const rootSelection = selectedPath[0]

    const componentsList: StructuralComponent[] = match(rootSelection?.id)
      .with(StructureType.BRIDGE, () => BRIDGE_STRUCTURAL_COMPONENTS)
      .with(StructureType.SIGNAGE_BRIDGE, () => SIGNAGE_BRIDGE_STRUCTURAL_COMPONENTS)
      .with(StructureType.TUNNEL, () => TUNNEL_STRUCTURAL_COMPONENTS)
      .with(StructureType.WALL, () => WALL_STRUCTURAL_COMPONENTS)
      .otherwise(() => [])

    if (!finalSelection || currentStep < 4) return componentsList

    return componentsList.map((comp: StructuralComponent, index: number) => {
      if (rootSelection?.id === StructureType.BRIDGE || rootSelection?.id === StructureType.TUNNEL) {
        if (index === 0 && finalSelection.mainComponentId) {
          return {
            ...comp,
            componentId: finalSelection.mainComponentId,
            description: finalSelection.mainComponent || comp.description,
            basicMeasurementUnit: finalSelection.basicMeasurementUnit || comp.basicMeasurementUnit,
            importanceLevel: ImportanceLevel.HIGH_VERY,
            evaluationNeeded: true,
            notes: ""
          }
        }
        if (index === 2 && finalSelection.secondaryComponentId) {
          return {
            ...comp,
            componentId: finalSelection.secondaryComponentId,
            description: finalSelection.secondaryComponent || comp.description,
            basicMeasurementUnit: finalSelection.basicMeasurementUnit || comp.basicMeasurementUnit,
            importanceLevel: ImportanceLevel.HIGH_VERY,
            evaluationNeeded: true,
            notes: ""
          }
        }
      }

      return comp
    })
  }, [selectedPath, currentStep])

  const handleOptionSelect = (id: string) => {
    const selectedOption = currentStepOptions.find(opt => opt.id === id)
    if (!selectedOption) return

    const newPath = [...selectedPath.slice(0, currentStep - 1), selectedOption]
    setSelectedPath(newPath)

    if (selectedOption.subOptions && selectedOption.subOptions.length > 0) {
      setCurrentStep(prev => prev + 1)
    } else {
      setCurrentStep(4)
    }
  }

  const handleQuantityChange = (componentId: string, value: string) => {
    setQuantities(prev => ({
      ...prev,
      [componentId]: value
    }))
  }

  const handleSubmit = () => {
    const finalData = processedComponents.map((comp: StructuralComponent) => ({
      ...comp,
      quantity: quantities[comp.componentId] || ""
    }))
    console.log("Final Components with Quantities:", finalData)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const currentSelection = selectedPath[currentStep - 1]
  const isLeafSelected = currentSelection && currentSelection.structTypeId !== undefined

  const metadata = STEP_METADATA[currentStep - 1] || STEP_METADATA[STEP_METADATA.length - 1]

  return (
    <div className={styles.createSkeletonContainer}>
      <Title className={styles.pageHeader} size="lg">
        הגדרת מבנה חדש
      </Title>

      <div className={styles.wizardProgress}>
        {STEP_METADATA.map((_, index) => {
          const stepNumber = index + 1
          return (
            <React.Fragment key={stepNumber}>
              <div className={`${styles.stepIndicator} ${currentStep >= stepNumber ? styles.active : ""}`}>{stepNumber}</div>
              {index < STEP_METADATA.length - 1 && <div className={styles.line}></div>}
            </React.Fragment>
          )
        })}
      </div>

      <main className={styles.wizardContent}>
        <section className={styles.wizardStep}>
          <Title className={styles.stepTitle} size="md">
            {metadata.title}
          </Title>

          {currentStep < 4 ? (
            <Radio
              className={metadata.layout}
              options={currentStepOptions.map(opt => ({
                id: opt.id,
                label: opt.label,
                icon: opt.icon
              }))}
              value={currentSelection?.id || ""}
              onChange={handleOptionSelect}
            />
          ) : (
            <div className={styles.componentsContainer}>
              <table className={styles.componentsTable}>
                <thead>
                  <tr>
                    <th>מזהה רכיב</th>
                    <th>תיאור</th>
                    <th>רמת חשיבות</th>
                    <th>יחידת מידה</th>
                    <th>כמות</th>
                  </tr>
                </thead>
                <tbody>
                  {processedComponents.map((comp: StructuralComponent) => (
                    <tr key={comp.componentId}>
                      <td>{comp.componentId}</td>
                      <td>{comp.description}</td>
                      <td>{comp.importanceLevel}</td>
                      <td>{comp.basicMeasurementUnit}</td>
                      <td>
                        <input
                          type="number"
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
          )}

          <div className={styles.wizardActions}>
            {currentStep > 1 && (
              <Button variant="outline" className={styles.backButton} onClick={handleBack}>
                חזור
              </Button>
            )}
            {currentStep === 4 && (
              <Button className={styles.submitButton} onClick={handleSubmit}>
                שלח
              </Button>
            )}
          </div>

          {isLeafSelected && currentStep < 4 && (
            <div className={styles.selectionSummary}>
              <p>
                קוד סוג מבנה: <strong>{currentSelection.structTypeId}</strong>
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default CreateSkeleton

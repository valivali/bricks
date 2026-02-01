import React, { useState, useMemo, useCallback } from "react"
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
import { Title } from "@/components/UI/Text/text"
import { match } from "ts-pattern"
import { type ComponentFormRecord, type FormValues, type SubComponentData } from "./types"
import { useUserProfileContext } from "@/contexts/UserProfileContext"
import { useToast } from "@/hooks/useToast"
import { inspectionApi } from "@/api/inspection.api"
import { type InspectionFormValues } from "@/schemas/inspection.schema"

import RadioSelectionStep from "./wizard/RadioSelectionStep/RadioSelectionStep"
import ComponentQuantitySelection from "./wizard/ComponentQuantitySelection/ComponentQuantitySelection"
import ComponentDetailForm from "./wizard/ComponentDetailForm/ComponentDetailForm"
import InspectionForm from "./wizard/InspectionForm/InspectionForm"

const STEP_METADATA = [
  { title: "בחר מבנה" },
  { title: "תיאור מבנה" },
  { title: "בחר תת-סוג" },
  { title: "רכיבים" },
  { title: "פירוט רכיבים" },
  { title: "טופס סקירת גשרים ומבני דרך" }
]

const toNull = (value?: string) => {
  const trimmed = value?.trim() || ""
  return trimmed ? trimmed : null
}

const toIntOrNull = (value?: string) => {
  const trimmed = value?.trim() || ""
  if (!trimmed) return null
  const parsed = Number.parseInt(trimmed, 10)
  return Number.isNaN(parsed) ? null : parsed
}

const toFloatOrNull = (value?: string) => {
  const trimmed = value?.trim() || ""
  if (!trimmed) return null
  const parsed = Number.parseFloat(trimmed)
  return Number.isNaN(parsed) ? null : parsed
}

const CreateSkeleton: React.FC = () => {
  const toast = useToast()
  const { profile } = useUserProfileContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPath, setSelectedPath] = useState<SkeletonOption[]>([])
  const [quantities, setQuantities] = useState<Record<string, string>>({})
  const [formValues, setFormValues] = useState<FormValues>({ components: {} })

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

    return componentsList
      .map((comp: StructuralComponent, index: number) => {
        if (rootSelection?.id === StructureType.BRIDGE || rootSelection?.id === StructureType.TUNNEL) {
          if (index === 0 && finalSelection.mainComponentId) {
            return {
              ...comp,
              componentId: finalSelection.mainComponentId,
              description: finalSelection.mainComponent || comp.description,
              basicMeasurementUnit: finalSelection.basicMeasurementUnit || comp.basicMeasurementUnit,
              secondaryMeasurementUnit: finalSelection.secondaryMeasurementUnit || "-",
              importanceLevel: ImportanceLevel.HIGH_VERY,
              evaluationNeeded: true,
              notes: ""
            }
          }
          if (index === 2) {
            if (finalSelection.secondaryComponentId) {
              return {
                ...comp,
                componentId: finalSelection.secondaryComponentId,
                description: finalSelection.secondaryComponent || comp.description,
                basicMeasurementUnit: finalSelection.basicMeasurementUnit || comp.basicMeasurementUnit,
                secondaryMeasurementUnit: finalSelection.secondaryMeasurementUnit || "-",
                importanceLevel: ImportanceLevel.HIGH_VERY,
                evaluationNeeded: true,
                notes: ""
              }
            } else {
              return null
            }
          }
        }

        return comp
      })
      .filter((comp): comp is StructuralComponent => comp !== null)
  }, [selectedPath, currentStep])

  const filteredComponents = useMemo(() => {
    return processedComponents.filter(comp => {
      const g = quantities[comp.componentId]
      return g && parseInt(g) > 0
    })
  }, [processedComponents, quantities])

  const handleStepCommit = useCallback(
    (id: string) => {
      const selectedOption = currentStepOptions.find(opt => opt.id === id)
      if (!selectedOption) return

      const newPath = [...selectedPath.slice(0, currentStep - 1), selectedOption]
      setSelectedPath(newPath)

      if (selectedOption.subOptions && selectedOption.subOptions.length > 0) {
        setCurrentStep(prev => prev + 1)
      } else {
        setCurrentStep(4)
      }
    },
    [currentStep, currentStepOptions, selectedPath]
  )

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      const targetStep = currentStep === 4 ? selectedPath.length : currentStep - 1
      setCurrentStep(targetStep)
      // Note: We keep the selection path so user can see what they chose when going back
    }
  }, [currentStep, selectedPath.length])

  const onQuantityCommit = useCallback(
    (newQuantities: Record<string, string>) => {
      setQuantities(newQuantities)

      // Initialize sub-components data for Step 5
      const newComponentsData: Record<string, ComponentFormRecord> = {}

      // We need to use the processed components to get correct metadata
      const finalFiltered = processedComponents.filter(comp => {
        const g = newQuantities[comp.componentId]
        return g && parseInt(g) > 0
      })

      finalFiltered.forEach(comp => {
        const qty = parseInt(newQuantities[comp.componentId] || "0")
        const existingRecord = formValues.components[comp.componentId]
        const existingSubData = existingRecord?.subComponents || []

        const subData: SubComponentData[] = Array.from({ length: qty }).map((_, i) => {
          if (existingSubData[i]) return existingSubData[i]

          return {
            id: i + 1,
            name: String(i + 1),
            basicQuantity: 0,
            secondaryQuantity: 0,
            comments: "",
            updatedAt: new Date().toISOString().split("T")[0]
          }
        })
        newComponentsData[comp.componentId] = {
          subComponents: subData,
          comments: existingRecord?.comments || "",
          updatedAt: existingRecord?.updatedAt || new Date().toISOString().split("T")[0]
        }
      })

      setFormValues({ components: newComponentsData })
      setCurrentStep(5)
    },
    [formValues.components, processedComponents]
  )

  const onFinalSubmit = useCallback(
    (data: FormValues) => {
      setFormValues(data)
      setCurrentStep(6)
    },
    [selectedPath, quantities]
  )

  const inspectionDefaults = useMemo<InspectionFormValues>(() => {
    const companyName = profile?.companyName || ""
    const inspectorName = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ")
    const structureType = selectedPath[1]?.label || selectedPath[0]?.label || ""

    return {
      lastUpdated: "",
      structureType,
      generalDescription: "",
      inspectionType: "",
      companyName,
      inspectorName,
      structureNumber: "",
      structureName: "",
      structureMarking: "",
      roadNumber: "",
      runningDistance: "",
      area: "",
      fullStructureIncluded: true,
      fullStructureNotes: "",
      spanCount: "",
      spanCountNotes: "",
      adjacentStructures: "",
      adjacentStructuresNotes: "",
      siteRestrictions: "",
      inspectionDate: "",
      nextInspectionType: "",
      nextInspectionDate: "",
      classificationForInspection: "",
      coordinateNorth: "",
      coordinateEast: ""
    }
  }, [profile, selectedPath])

  const onInspectionSubmit = useCallback(
    async (values: InspectionFormValues) => {
      try {
        const inspection = await inspectionApi.createInspection({
          lastUpdated: toNull(values.lastUpdated),
          structureType: values.structureType,
          generalDescription: toNull(values.generalDescription),
          inspectionType: toNull(values.inspectionType),
          companyName: toNull(values.companyName),
          inspectorName: toNull(values.inspectorName),
          structureNumber: toNull(values.structureNumber),
          structureName: toNull(values.structureName),
          structureMarking: toNull(values.structureMarking),
          roadNumber: toNull(values.roadNumber),
          runningDistance: toNull(values.runningDistance),
          area: toNull(values.area),
          fullStructureIncluded: values.fullStructureIncluded,
          fullStructureNotes: toNull(values.fullStructureNotes),
          spanCount: toIntOrNull(values.spanCount),
          spanCountNotes: toNull(values.spanCountNotes),
          adjacentStructures: toIntOrNull(values.adjacentStructures),
          adjacentStructuresNotes: toNull(values.adjacentStructuresNotes),
          siteRestrictions: toNull(values.siteRestrictions),
          inspectionDate: toNull(values.inspectionDate),
          nextInspectionType: toNull(values.nextInspectionType),
          nextInspectionDate: toNull(values.nextInspectionDate),
          classificationForInspection: toNull(values.classificationForInspection),
          coordinateNorth: toFloatOrNull(values.coordinateNorth),
          coordinateEast: toFloatOrNull(values.coordinateEast)
        })

        toast.success("טופס הסקירה נשמר בהצלחה")
        console.log("Inspection created:", inspection)
      } catch (error) {
        const message = error instanceof Error ? error.message : "שגיאה בשמירת טופס הסקירה"
        toast.error(message)
      }
    },
    [toast]
  )

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
          <div className={styles.stepHeader}>
            <Title className={styles.stepTitle} size="md">
              {metadata.title}
            </Title>
          </div>

          <div className={styles.stepBody}>
            {match(currentStep)
              .with(1, () => (
                <RadioSelectionStep
                  options={currentStepOptions}
                  initialValue={selectedPath[0]?.id}
                  layout="smallerRadio"
                  onNext={handleStepCommit}
                  isFirstStep
                />
              ))
              .with(2, () => (
                <RadioSelectionStep
                  options={currentStepOptions}
                  initialValue={selectedPath[1]?.id}
                  layout="grid"
                  onNext={handleStepCommit}
                  onBack={handleBack}
                />
              ))
              .with(3, () => (
                <RadioSelectionStep
                  options={currentStepOptions}
                  initialValue={selectedPath[2]?.id}
                  layout="list"
                  onNext={handleStepCommit}
                  onBack={handleBack}
                />
              ))
              .with(4, () => (
                <ComponentQuantitySelection
                  components={processedComponents}
                  initialQuantities={quantities}
                  onNext={onQuantityCommit}
                  onBack={handleBack}
                />
              ))
              .with(5, () => (
                <ComponentDetailForm
                  filteredComponents={filteredComponents}
                  quantities={quantities}
                  initialFormValues={formValues}
                  onSubmit={onFinalSubmit}
                  onBack={handleBack}
                />
              ))
              .with(6, () => (
                <InspectionForm defaultValues={inspectionDefaults} onSubmit={onInspectionSubmit} onBack={() => setCurrentStep(5)} />
              ))
              .otherwise(() => null)}
          </div>
        </section>
      </main>
    </div>
  )
}

export default CreateSkeleton

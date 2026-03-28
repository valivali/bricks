import React, { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { match } from "ts-pattern"

import { type StructureIdDto } from "@/api/structure-id.api"
import { FileIcon } from "@/components/icons"
import ComponentDetailForm from "@/components/structure/ComponentDetailForm/ComponentDetailForm"
import ComponentQuantitySelection from "@/components/structure/ComponentQuantitySelection/ComponentQuantitySelection"
import { AREA_OPTIONS } from "@/components/structure-id"
import { getStructureTypeLabel } from "@/components/structure-id/structureTypeOptions"
import { Button } from "@/components/UI/button/button"
import { Drawer } from "@/components/UI/Drawer/Drawer"
import { EmptyState } from "@/components/UI/EmptyState/EmptyState"
import { Title } from "@/components/UI/Text/text"
import {
  BRIDGE_STRUCTURAL_COMPONENTS,
  ImportanceLevel,
  SIGNAGE_BRIDGE_STRUCTURAL_COMPONENTS,
  SKELETON_STRUCTURE_TYPES,
  TUNNEL_STRUCTURAL_COMPONENTS,
  WALL_STRUCTURAL_COMPONENTS
} from "@/config/skeleton-data"
import { type SkeletonOption, type StructuralComponent, StructureType } from "@/config/skeleton-data.types"
import { useUserProfileContext } from "@/contexts/UserProfileContext"
import { useAllStructureComponents } from "@/hooks/useAllStructureComponents"
import { useCreateInspection, useStructureInspectionsQuery } from "@/hooks/useInspections"
import { type ClientStructureComponent, useStructureComponentsQuery, useUpsertStructureComponents } from "@/hooks/useStructureComponents"
import { useStructureComponentsDrawer } from "@/hooks/useStructureComponentsDrawer"
import { useStructureIdsQuery } from "@/hooks/useStructureId"
import { useToast } from "@/hooks/useToast"
import { type InspectionFormValues } from "@/schemas/inspection.schema"
import { type ComponentFormRecord, type FormValues, type SubComponentData } from "@/types/structure-component.types"

import { ExpandedStructureRow } from "./ExpandedStructureRow"
import styles from "./structures.module.scss"
import { useStructuresColumns } from "./StructuresTableColumns"

export const Structures: React.FC = () => {
  const navigate = useNavigate()
  const { profile } = useUserProfileContext()
  const { success, error: toastError } = useToast()

  const { data: structures, isLoading, error } = useStructureIdsQuery()

  const [drawerState, setDrawerState] = useState<{
    isOpen: boolean
    structureId: string | null
    step: "quantity" | "detail"
  }>({
    isOpen: false,
    structureId: null,
    step: "quantity"
  })

  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)
  const [showInspectionForm, setShowInspectionForm] = useState<string | null>(null)

  const structureIds = useMemo(() => structures?.map(s => s.id), [structures])
  const { data: allComponentsMap = {} } = useAllStructureComponents(structureIds)

  const { data: structureComponents } = useStructureComponentsQuery(drawerState.structureId ?? undefined)
  const { data: expandedInspections } = useStructureInspectionsQuery(expandedRowId ?? undefined)

  const { quantities, setQuantities, formValues, setFormValues, resetDrawerState } = useStructureComponentsDrawer({
    structureComponents,
    isDrawerOpen: drawerState.isOpen,
    structureId: drawerState.structureId
  })

  const upsertMutation = useUpsertStructureComponents(drawerState.structureId ?? "", {
    onSuccess: () => {
      success("רכיבים נשמרו בהצלחה")
      setDrawerState({ isOpen: false, structureId: null, step: "quantity" })
    },
    onError: () => {
      toastError("שגיאה בשמירת רכיבים")
    }
  })

  const createInspectionMutation = useCreateInspection({
    onSuccess: () => {
      success("סקירה נוצרה בהצלחה")
      setShowInspectionForm(null)
    },
    onError: () => {
      toastError("שגיאה ביצירת סקירה")
    }
  })

  const openDrawer = (structure: StructureIdDto) => {
    resetDrawerState()
    setDrawerState({
      isOpen: true,
      structureId: structure.id,
      step: "quantity"
    })
  }

  const closeDrawer = () => {
    resetDrawerState()
    setDrawerState({ isOpen: false, structureId: null, step: "quantity" })
  }

  const currentStructure = structures?.find(s => s.id === drawerState.structureId)

  const processedComponents = useMemo(() => {
    if (!currentStructure) return []

    const selectedPath: SkeletonOption[] = []

    if (currentStructure.structureType) {
      const rootType = SKELETON_STRUCTURE_TYPES.find(t => t.id === currentStructure.structureType)
      if (rootType) selectedPath.push(rootType)
    }

    if (currentStructure.structureSubType && selectedPath[0]?.subOptions) {
      const subType = selectedPath[0].subOptions.find(s => s.id === currentStructure.structureSubType)
      if (subType) selectedPath.push(subType)
    }

    if (currentStructure.structureDetailType && selectedPath[1]?.subOptions) {
      const detailType = selectedPath[1].subOptions.find(d => d.id === currentStructure.structureDetailType)
      if (detailType) selectedPath.push(detailType)
    }

    const finalSelection = selectedPath[selectedPath.length - 1]
    const rootSelection = selectedPath[0]

    const componentsList: StructuralComponent[] = match(rootSelection?.id)
      .with(StructureType.BRIDGE, () => BRIDGE_STRUCTURAL_COMPONENTS)
      .with(StructureType.SIGNAGE_BRIDGE, () => SIGNAGE_BRIDGE_STRUCTURAL_COMPONENTS)
      .with(StructureType.TUNNEL, () => TUNNEL_STRUCTURAL_COMPONENTS)
      .with(StructureType.WALL, () => WALL_STRUCTURAL_COMPONENTS)
      .otherwise(() => [])

    if (!finalSelection) return componentsList

    return componentsList
      .map((comp: StructuralComponent, index: number) => {
        if (rootSelection?.id === StructureType.BRIDGE || rootSelection?.id === StructureType.TUNNEL) {
          if (index === 0 && finalSelection.mainComponentId) {
            return {
              ...comp,
              componentId: finalSelection.mainComponentId,
              description: finalSelection.mainComponent ?? comp.description,
              basicMeasurementUnit: finalSelection.basicMeasurementUnit ?? comp.basicMeasurementUnit,
              secondaryMeasurementUnit: finalSelection.secondaryMeasurementUnit ?? "-",
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
                description: finalSelection.secondaryComponent ?? comp.description,
                basicMeasurementUnit: finalSelection.basicMeasurementUnit ?? comp.basicMeasurementUnit,
                secondaryMeasurementUnit: finalSelection.secondaryMeasurementUnit ?? "-",
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
  }, [currentStructure])

  const filteredComponents = useMemo(() => {
    return processedComponents.filter(comp => {
      const q = quantities[comp.componentId]
      return q && parseInt(q) > 0
    })
  }, [processedComponents, quantities])

  const handleQuantityNext = (newQuantities: Record<string, string>) => {
    setQuantities(newQuantities)

    const newComponentsData: Record<string, ComponentFormRecord> = {}

    const filtered = processedComponents.filter(comp => {
      const q = newQuantities[comp.componentId]
      return q && parseInt(q) > 0
    })

    filtered.forEach(comp => {
      const qty = parseInt(newQuantities[comp.componentId] || "0")
      const existingRecord = formValues.components[comp.componentId]
      const existingSubData = existingRecord?.subComponents ?? []

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
        comments: existingRecord?.comments ?? "",
        updatedAt: existingRecord?.updatedAt ?? new Date().toISOString().split("T")[0]
      }
    })

    setFormValues({ components: newComponentsData })
    setDrawerState(prev => ({ ...prev, step: "detail" }))
  }

  const handleDetailSubmit = (data: FormValues) => {
    const components: ClientStructureComponent[] = filteredComponents.map(comp => ({
      componentCode: comp.componentId,
      description: comp.description,
      importanceLevel: comp.importanceLevel,
      basicMeasurementUnit: comp.basicMeasurementUnit,
      secondaryMeasurementUnit: comp.secondaryMeasurementUnit || null,
      evaluationNeeded: comp.evaluationNeeded,
      notes: comp.notes || null,
      quantity: parseInt(quantities[comp.componentId] || "0"),
      comments: data.components[comp.componentId]?.comments ?? "",
      subComponents: data.components[comp.componentId]?.subComponents ?? [],
      updatedAt: data.components[comp.componentId]?.updatedAt ?? ""
    }))

    upsertMutation.mutate(components)
  }

  const handleInspectionSubmit = async (values: InspectionFormValues) => {
    if (!showInspectionForm) return

    const toIntOrNull = (value?: string) => {
      if (!value) return null
      const parsed = parseInt(value, 10)
      return isNaN(parsed) ? null : parsed
    }

    const toFloatOrNull = (value?: string) => {
      if (!value) return null
      const parsed = parseFloat(value)
      return isNaN(parsed) ? null : parsed
    }

    await createInspectionMutation.mutateAsync({
      structureId: showInspectionForm,
      lastUpdated: values.lastUpdated,
      structureType: values.structureType,
      generalDescription: values.generalDescription,
      inspectionType: values.inspectionType,
      companyName: values.companyName,
      inspectorName: values.inspectorName,
      structureNumber: values.structureNumber,
      structureName: values.structureName,
      structureMarking: values.structureMarking,
      roadNumber: values.roadNumber,
      runningDistance: values.runningDistance,
      area: values.area,
      fullStructureIncluded: values.fullStructureIncluded,
      fullStructureNotes: values.fullStructureNotes,
      spanCount: toIntOrNull(values.spanCount),
      spanCountNotes: values.spanCountNotes,
      adjacentStructures: toIntOrNull(values.adjacentStructures),
      adjacentStructuresNotes: values.adjacentStructuresNotes,
      siteRestrictions: values.siteRestrictions,
      inspectionDate: values.inspectionDate,
      nextInspectionType: values.nextInspectionType,
      nextInspectionDate: values.nextInspectionDate,
      classificationForInspection: values.classificationForInspection,
      coordinateNorth: toFloatOrNull(values.coordinateNorth),
      coordinateEast: toFloatOrNull(values.coordinateEast)
    })
  }

  const getInspectionDefaults = (structure: StructureIdDto): InspectionFormValues => {
    const areaOption = AREA_OPTIONS.find(opt => opt.value === structure.area)

    return {
      lastUpdated: "",
      structureType: getStructureTypeLabel(structure.structureType ?? undefined),
      generalDescription: "",
      inspectionType: "",
      companyName: profile?.companyName ?? "",
      inspectorName: [profile?.firstName, profile?.lastName].filter(Boolean).join(" "),
      structureNumber: structure.structureNumber ?? "",
      structureName: structure.structureName ?? "",
      structureMarking: structure.structureMarking ?? "",
      roadNumber: structure.belongsToRoad ?? "",
      runningDistance: structure.runningDistanceKm ?? "",
      area: areaOption?.label ?? structure.area ?? "",
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
      coordinateNorth: structure.coordinateNorth ?? "",
      coordinateEast: structure.coordinateEast ?? ""
    }
  }

  const columns = useStructuresColumns({
    onOpenDrawer: openDrawer,
    componentsMap: allComponentsMap
  })

  const handleRowClick = (structure: StructureIdDto, event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.closest(`.${styles.expandArrow}`)) {
      event.stopPropagation()
      setExpandedRowId(prev => (prev === structure.id ? null : structure.id))
    }
  }

  const handleCreateNew = () => {
    void navigate("/structure-id/new")
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            רשימת מצאי
          </Title>
        </div>
        <div className={styles.loading}>טוען...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            רשימת מצאי
          </Title>
        </div>
        <div className={styles.error}>אירעה שגיאה בטעינת הנתונים</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>
          רשימת מצאי
        </Title>
        <Button onClick={handleCreateNew}>יצירת מבנה חדש</Button>
      </div>

      {structures && structures.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.structuresTable}>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} style={{ width: column.width }}>
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {structures.map(structure => (
                <React.Fragment key={structure.id}>
                  <tr onClick={e => handleRowClick(structure, e)} className={styles.clickableRow}>
                    {columns.map((column, index) => (
                      <td key={index}>
                        {column.renderCell
                          ? column.renderCell(structure)
                          : typeof column.accessor === "function"
                            ? column.accessor(structure)
                            : null}
                      </td>
                    ))}
                  </tr>
                  {expandedRowId === structure.id && (
                    <tr className={styles.expandedRow}>
                      <td colSpan={columns.length}>
                        <ExpandedStructureRow
                          inspections={expandedInspections}
                          showInspectionForm={showInspectionForm === structure.id}
                          inspectionDefaults={getInspectionDefaults(structure)}
                          onAddInspection={() => setShowInspectionForm(structure.id)}
                          onCancelInspectionForm={() => setShowInspectionForm(null)}
                          onSubmitInspection={handleInspectionSubmit}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={<FileIcon />}
          title="אין מצאי במערכת"
          description="צור מבנה ראשון כדי להתחיל"
          action={{
            label: "יצירת מבנה חדש",
            onClick: handleCreateNew
          }}
        />
      )}

      <Drawer
        isOpen={drawerState.isOpen}
        onClose={closeDrawer}
        direction="right"
        width="70vw"
        title={drawerState.step === "quantity" ? "בחירת רכיבים" : "פירוט רכיבים"}>
        {drawerState.step === "quantity" ? (
          <ComponentQuantitySelection
            components={processedComponents}
            initialQuantities={quantities}
            onNext={handleQuantityNext}
            onBack={closeDrawer}
          />
        ) : (
          <ComponentDetailForm
            filteredComponents={filteredComponents}
            quantities={quantities}
            initialFormValues={formValues}
            onSubmit={handleDetailSubmit}
            onBack={() => setDrawerState(prev => ({ ...prev, step: "quantity" }))}
          />
        )}
      </Drawer>
    </div>
  )
}

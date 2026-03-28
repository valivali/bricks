import React from "react"
import { useNavigate } from "react-router-dom"

import { type StructureIdDto } from "@/api/structure-id.api"
import {
  INSPECTION_CLASSIFICATION_OPTIONS,
  PRIMARY_CLASSIFICATION_OPTIONS,
  SECONDARY_CLASSIFICATION_OPTIONS
} from "@/components/structure-id"
import { getStructureTypeLabel } from "@/components/structure-id/structureTypeOptions"
import { Button } from "@/components/UI/button/button"
import { type ClientStructureComponent } from "@/hooks/useStructureComponents"

import styles from "./structures.module.scss"

interface Column {
  header: string
  accessor?: (row: StructureIdDto) => React.ReactNode
  renderCell?: (row: StructureIdDto) => React.ReactNode
  width: string
}

interface UseStructuresColumnsProps {
  onOpenDrawer: (structure: StructureIdDto) => void
  componentsMap: Record<string, ClientStructureComponent[]>
}

export const useStructuresColumns = ({ onOpenDrawer, componentsMap }: UseStructuresColumnsProps): Column[] => {
  const navigate = useNavigate()

  return [
    {
      header: "",
      accessor: () => <span className={styles.expandArrow}>▼</span>,
      width: "3%"
    },
    {
      header: "שם רכיב רשימת מצאי",
      accessor: (row: StructureIdDto) => row.structureName ?? "-",
      width: "7%"
    },
    {
      header: "01.01 מספר המבנה",
      accessor: (row: StructureIdDto) => row.structureNumber ?? "-",
      width: "6%"
    },
    {
      header: "01.03 סימון המבנה",
      accessor: (row: StructureIdDto) => row.structureMarking ?? "-",
      width: "6%"
    },
    {
      header: "סוג סקירה",
      accessor: (row: StructureIdDto) => row.inspectionType ?? "-",
      width: "5%"
    },
    {
      header: "תאריך סקירה מתוכנן",
      accessor: (row: StructureIdDto) =>
        row.plannedInspectionDate ? new Date(row.plannedInspectionDate).toLocaleDateString("he-IL") : "-",
      width: "6%"
    },
    {
      header: "סוג מבנה",
      accessor: (row: StructureIdDto) => getStructureTypeLabel(row.structureType ?? undefined),
      width: "6%"
    },
    {
      header: "סוקר",
      accessor: (row: StructureIdDto) => row.inspector ?? "-",
      width: "6%"
    },
    {
      header: "חברת הסקירה",
      accessor: (row: StructureIdDto) => row.inspectionCompany ?? "-",
      width: "6%"
    },
    {
      header: "02.01 קבוצת סווג ראשית",
      accessor: (row: StructureIdDto) => {
        if (!row.primaryClassificationGroup) return "-"
        const option = PRIMARY_CLASSIFICATION_OPTIONS.find(opt => opt.value === row.primaryClassificationGroup)
        return option?.label ?? row.primaryClassificationGroup
      },
      width: "6%"
    },
    {
      header: "02.02 קבוצת סווג משנית גשרים",
      accessor: (row: StructureIdDto) => {
        if (!row.secondaryClassificationGroup) return "-"
        const option = SECONDARY_CLASSIFICATION_OPTIONS.find(opt => opt.value === row.secondaryClassificationGroup)
        return option?.label ?? row.secondaryClassificationGroup
      },
      width: "6%"
    },
    {
      header: "13.01 סיווג לסקירה",
      accessor: (row: StructureIdDto) => {
        if (!row.inspectionClassification) return "-"
        const option = INSPECTION_CLASSIFICATION_OPTIONS.find(opt => opt.value === row.inspectionClassification)
        return option?.label ?? row.inspectionClassification
      },
      width: "6%"
    },
    {
      header: "מצב סקירה",
      accessor: (row: StructureIdDto) => row.inspectionStatus ?? "-",
      width: "5%"
    },
    {
      header: "Pci Avg",
      accessor: () => "-",
      width: "4%"
    },
    {
      header: "Pci crit",
      accessor: () => "-",
      width: "4%"
    },
    {
      header: "רכיבים",
      accessor: (row: StructureIdDto) => {
        const components = componentsMap[row.id] ?? []
        return <span className={styles.componentsStatus}>{components.length > 0 ? "✓" : "-"}</span>
      },
      width: "4%"
    },
    {
      header: "פעולות",
      renderCell: (row: StructureIdDto) => (
        <div className={styles.actions} onClick={e => e.stopPropagation()}>
          <Button size="sm" variant="outline" onClick={() => void navigate(`/structure-id/${row.id}`)}>
            ערוך
          </Button>
          <Button size="sm" onClick={() => onOpenDrawer(row)}>
            רכיבים
          </Button>
        </div>
      ),
      width: "12%"
    }
  ]
}

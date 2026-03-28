import React from "react"

export interface SkeletonOption {
  id: string
  label: string
  icon?: React.ReactNode
  structTypeId?: number
  mainComponent?: string
  basicMeasurementUnit?: string
  secondaryMeasurementUnit?: string
  mainComponentId?: string
  secondaryComponent?: string
  secondaryComponentId?: string
  subOptions?: SkeletonOption[]
}

export interface StructuralComponent {
  componentId: string
  description: string
  importanceLevel: ImportanceLevelType
  basicMeasurementUnit: string
  secondaryMeasurementUnit: string
  evaluationNeeded: boolean
  notes: string
}

export const ImportanceLevel = {
  HIGH: "גבוהה",
  HIGH_VERY: "גבוהה מאוד",
  MEDIUM: "בינונית",
  LOW: "נמוכה",
  NONE: "-"
} as const

export type ImportanceLevelType = (typeof ImportanceLevel)[keyof typeof ImportanceLevel]

export const StructureType = {
  BRIDGE: "bridge",
  WALL: "wall",
  SIGNAGE_BRIDGE: "signage-bridge",
  TUNNEL: "tunnel"
} as const

export type SkeletonStructureType = (typeof StructureType)[keyof typeof StructureType]

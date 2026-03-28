import { SKELETON_STRUCTURE_TYPES } from "@/config/skeleton-data"

export interface StructureTypeOption {
  value: string
  label: string
}

export const getStructureTypeOptions = (): StructureTypeOption[] => {
  return SKELETON_STRUCTURE_TYPES.map(type => ({
    value: type.id,
    label: type.label
  }))
}

export const getStructureSubTypeOptions = (structureType: string | undefined): StructureTypeOption[] => {
  if (!structureType) return []

  const selectedType = SKELETON_STRUCTURE_TYPES.find(type => type.id === structureType)
  if (!selectedType?.subOptions) return []

  return selectedType.subOptions.map(subType => ({
    value: subType.id,
    label: subType.label
  }))
}

export const getStructureDetailTypeOptions = (
  structureType: string | undefined,
  structureSubType: string | undefined
): StructureTypeOption[] => {
  if (!structureType || !structureSubType) return []

  const selectedType = SKELETON_STRUCTURE_TYPES.find(type => type.id === structureType)
  if (!selectedType?.subOptions) return []

  const selectedSubType = selectedType.subOptions.find(subType => subType.id === structureSubType)
  if (!selectedSubType?.subOptions) return []

  return selectedSubType.subOptions.map(detailType => ({
    value: detailType.id,
    label: detailType.label
  }))
}

export const getStructureTypeLabel = (structureType: string | undefined): string => {
  if (!structureType) return "-"
  const type = SKELETON_STRUCTURE_TYPES.find(t => t.id === structureType)
  return type?.label ?? "-"
}

export const getStructureSubTypeLabel = (structureType: string | undefined, structureSubType: string | undefined): string => {
  if (!structureType || !structureSubType) return "-"
  const type = SKELETON_STRUCTURE_TYPES.find(t => t.id === structureType)
  const subType = type?.subOptions?.find(st => st.id === structureSubType)
  return subType?.label ?? "-"
}

export const getStructureDetailTypeLabel = (
  structureType: string | undefined,
  structureSubType: string | undefined,
  structureDetailType: string | undefined
): string => {
  if (!structureType || !structureSubType || !structureDetailType) return "-"
  const type = SKELETON_STRUCTURE_TYPES.find(t => t.id === structureType)
  const subType = type?.subOptions?.find(st => st.id === structureSubType)
  const detailType = subType?.subOptions?.find(dt => dt.id === structureDetailType)
  return detailType?.label ?? "-"
}

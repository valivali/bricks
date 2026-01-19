export interface SubComponentData {
  id: number
  name: string
  basicQuantity: number
  secondaryQuantity: number
  attachment?: string
  comments: string
  updatedAt: string
}

export interface ComponentFormRecord {
  subComponents: SubComponentData[]
  comments: string
  updatedAt: string
}

export interface FormValues {
  components: Record<string, ComponentFormRecord>
}

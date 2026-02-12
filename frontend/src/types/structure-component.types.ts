export interface SubComponentData {
  id: number
  name: string
  basicQuantity: number
  secondaryQuantity: number
  attachments?: string[]
  comments: string
  updatedAt: string
}

export interface ComponentFormRecord {
  subComponents: SubComponentData[]
  comments: string
  updatedAt: string
}

export interface FormValues {
  components: Record<string, ComponentFormRecord | undefined>
}

import type { FieldErrors, UseFormRegister } from "react-hook-form"

import type { StructureIdFormValues } from "@/schemas/structure-id.schema"

export type StructureIdSectionBaseProps = {
  register: UseFormRegister<StructureIdFormValues>
  errors: FieldErrors<StructureIdFormValues>
  isReadonly: boolean
  fieldImages: { fieldName: string; imageUrl: string }[]
  onFieldImagesChange: (images: { fieldName: string; imageUrl: string }[]) => void
}

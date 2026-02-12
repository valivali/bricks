import React from "react"
import type { FieldErrors } from "react-hook-form"

import { Text } from "@/components/UI/Text/text"
import styles from "@/pages/structure-id/structure-id.module.scss"
import type { StructureIdFormValues } from "@/schemas/structure-id.schema"

type FieldErrorProps = {
  errors: FieldErrors<StructureIdFormValues>
  name: keyof StructureIdFormValues
}

export const FieldError: React.FC<FieldErrorProps> = ({ errors, name }) => {
  const error = errors[name]
  const message = error?.message

  if (!message || typeof message !== "string") {
    return null
  }

  return <Text className={styles.error}>{message}</Text>
}

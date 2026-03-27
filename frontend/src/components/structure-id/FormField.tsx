import React from "react"
import type { FieldError } from "react-hook-form"
import { Text } from "@/components/UI/Text/text"
import { FieldImageManager } from "./FieldImageManager"
import styles from "@/pages/structure-id/structure-id.module.scss"

type FieldImage = {
  fieldName: string
  imageUrl: string
}

type FormFieldProps = {
  label: string
  name: string
  register: any // from react-hook-form
  error?: FieldError
  isReadonly?: boolean
  type?: "text" | "number" | "textarea" | "select"
  placeholder?: string
  maxLength?: number
  rows?: number
  options?: { value: string; label: string }[]
  images: { fieldName: string; imageUrl: string }[]
  onImagesChange: (images: { fieldName: string; imageUrl: string }[]) => void
  disabled?: boolean
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  error,
  isReadonly = false,
  type = "text",
  placeholder,
  maxLength,
  rows = 3,
  options = [],
  images,
  onImagesChange,
  disabled = false,
  className = "",
  onChange
}) => {
  const registerProps = register(name)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    registerProps.onChange(e)
    onChange?.(e)
  }

  const fieldSpecificImages = images.filter(img => img.fieldName === name)
  const hasImages = fieldSpecificImages.length > 0

  return (
    <div className={`${styles.field} ${className} structure-field-row`} data-has-images={hasImages}>
      <div className={styles.labelWrapper}>
        <span className={styles.label}>{label}</span>
        <FieldImageManager fieldName={name} images={images} onChange={onImagesChange} isReadonly={isReadonly} />
      </div>

      {type === "textarea" ? (
        <textarea
          {...registerProps}
          onChange={handleOnChange}
          className={styles.textarea}
          disabled={isReadonly || disabled}
          placeholder={placeholder}
          rows={rows}
        />
      ) : type === "select" ? (
        <select {...registerProps} onChange={handleOnChange} className={styles.select} disabled={isReadonly || disabled}>
          <option value="">{placeholder || "בחר..."}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...registerProps}
          onChange={handleOnChange}
          className={styles.input}
          disabled={isReadonly || disabled}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}

      {error && <Text className={styles.error}>{error.message}</Text>}
    </div>
  )
}

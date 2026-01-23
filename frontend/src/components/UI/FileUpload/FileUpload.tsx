import React, { useState } from "react"
import styles from "./FileUpload.module.scss"
import { FileIcon, XIcon, UploadIcon } from "@/components/icons"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  accept?: string
  value?: string | null // Current file name or URL
  onRemove?: () => void
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, accept = "image/*,.pdf,.doc,.docx", value, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      console.log("file uploaded", file.name)
      onFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      console.log("file uploaded", file.name)
      onFileSelect(file)
    }
  }

  if (value) {
    return (
      <div className={styles.filePreview}>
        <div className={styles.fileIcon}>
          <FileIcon size={20} />
        </div>
        <span className={styles.fileName}>{value}</span>
        <button
          type="button"
          className={styles.removeButton}
          onClick={e => {
            e.stopPropagation()
            onRemove?.()
          }}
          title="הסר קובץ">
          <XIcon size={16} />
        </button>
      </div>
    )
  }

  return (
    <div
      className={`${styles.uploadContainer} ${isDragging ? styles.dragging : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <label className={styles.uploadLabel}>
        <input type="file" className={styles.hiddenInput} accept={accept} onChange={handleFileChange} />
        <div className={styles.uploadIcon}>
          <UploadIcon size={20} />
        </div>
      </label>
    </div>
  )
}

export default FileUpload

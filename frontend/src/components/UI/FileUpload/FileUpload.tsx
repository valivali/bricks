import React, { useState } from "react"

import { FileIcon, UploadIcon, XIcon } from "@/components/icons"

import styles from "./FileUpload.module.scss"

interface FileUploadProps {
  onFilesSelect: (files: File[]) => void
  accept?: string
  values?: string[] // Current file names or URLs
  onRemove?: (index: number) => void
  multiple?: boolean
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelect,
  accept = "image/*,.pdf,.doc,.docx",
  values = [],
  onRemove,
  multiple = true
}) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      onFilesSelect(selectedFiles)
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      onFilesSelect(droppedFiles)
    }
  }

  return (
    <div className={styles.multiUploadContainer}>
      <div className={styles.previewsGrid}>
        {values.map((file, index) => (
          <div key={index} className={styles.filePreview}>
            <div className={styles.fileIcon}>
              {file.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <img src={file} alt="preview" className={styles.imagePreview} />
              ) : (
                <FileIcon size={20} />
              )}
            </div>
            <span className={styles.fileName}>{file.split("/").pop()}</span>
            <button
              type="button"
              className={styles.removeButton}
              onClick={e => {
                e.stopPropagation()
                onRemove?.(index)
              }}
              title="הסר קובץ">
              <XIcon size={14} />
            </button>
          </div>
        ))}

        <div
          className={`${styles.uploadBox} ${isDragging ? styles.dragging : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          <label className={styles.uploadLabel}>
            <input type="file" className={styles.hiddenInput} accept={accept} onChange={handleFileChange} multiple={multiple} />
            <div className={styles.uploadIcon}>
              <UploadIcon size={20} />
              <span>הוסף קובץ</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default FileUpload

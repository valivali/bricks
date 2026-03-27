import React, { useState } from "react"
import { ImageUpload } from "@/components/UI/ImageUpload/ImageUpload"
import { Text } from "@/components/UI/Text/text"
import { ImageIcon, TrashIcon, XIcon } from "@/components/icons"
import * as Dialog from "@radix-ui/react-dialog"
import styles from "./FieldImageManager.module.scss"
import { useToast } from "@/hooks/useToast"
import { ConfirmDialog } from "@/components/UI/ConfirmDialog/ConfirmDialog"

type FieldImage = {
  fieldName: string
  imageUrl: string
}

type FieldImageManagerProps = {
  fieldName: string
  images: FieldImage[]
  onChange: (images: FieldImage[]) => void
  isReadonly?: boolean
}

export const FieldImageManager: React.FC<FieldImageManagerProps> = ({ fieldName, images, onChange, isReadonly = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageToDelete, setImageToDelete] = useState<number | null>(null)
  const toast = useToast()

  const fieldSpecificImages = images.filter(img => img.fieldName === fieldName)
  const count = fieldSpecificImages.length

  const handleAddImage = (url: string | null) => {
    if (!url) return
    try {
      const newImage: FieldImage = {
        fieldName,
        imageUrl: url
      }
      onChange([...images, newImage])
      toast.success("תמונה נשמרה בהצלחה")
    } catch (error) {
      toast.error("שגיאה בשמירת התמונה")
    }
  }

  const handleRemoveImage = () => {
    if (imageToDelete === null) return

    const actualIndex = images.indexOf(fieldSpecificImages[imageToDelete])
    if (actualIndex > -1) {
      const newImages = [...images]
      newImages.splice(actualIndex, 1)
      onChange(newImages)
      toast.success("תמונה הוסרה")
    }
    setImageToDelete(null)
  }

  return (
    <div className={styles.container}>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <button type="button" className={styles.trigger} title="ניהול תמונות" data-has-images={count > 0}>
            <ImageIcon />
            {count > 0 && <span className={styles.badge}>{count}</span>}
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.content} aria-describedby="manage-images">
            <div className={styles.header}>
              <Dialog.Title className={styles.title}>ניהול תמונות בשדה</Dialog.Title>
              <Dialog.Close asChild>
                <button className={styles.closeButton}>
                  <XIcon />
                </button>
              </Dialog.Close>
            </div>

            <div className={styles.body}>
              {count > 0 && (
                <div className={styles.gallery}>
                  <Text variant="span" className={styles.sectionLabel}>
                    גלריית תמונות ({count})
                  </Text>
                  <div className={styles.grid}>
                    {fieldSpecificImages.map((img, idx) => (
                      <div key={idx} className={styles.imageItem}>
                        <img src={img.imageUrl} alt={`Uploaded ${idx}`} onClick={() => setSelectedImage(img.imageUrl)} />
                        {!isReadonly && (
                          <button
                            type="button"
                            className={styles.removeIconBtn}
                            onClick={e => {
                              e.stopPropagation()
                              setImageToDelete(idx)
                            }}>
                            <TrashIcon />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!isReadonly && (
                <div className={styles.uploadSection}>
                  <Text variant="span" className={styles.sectionLabel}>
                    הוספת תמונה חדשה
                  </Text>
                  <ImageUpload
                    onChange={handleAddImage}
                    showPreview={true}
                    size={280}
                    allowCrop={false}
                    allowZoom={false}
                    capture={true}
                    shape="rect"
                  />
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <ConfirmDialog
        isOpen={imageToDelete !== null}
        onClose={() => setImageToDelete(null)}
        onConfirm={handleRemoveImage}
        title="מחיקת תמונה"
        description="האם אתה בטוח שברצונך למחוק תמונה זו? פעולה זו אינה ניתנת לביטול."
        confirmText="מחק"
        cancelText="ביטול"
        variant="destructive"
      />

      {/* Big View Dialog */}
      <Dialog.Root open={selectedImage !== null} onOpenChange={open => !open && setSelectedImage(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.bigViewContent} aria-describedby="zoom-img">
            <Dialog.Title className={styles.title}>תמונה</Dialog.Title>
            <button className={styles.bigViewClose} onClick={() => setSelectedImage(null)}>
              <XIcon />
            </button>
            {selectedImage && <img src={selectedImage} alt="Large view" className={styles.fullImage} />}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

import * as Dialog from "@radix-ui/react-dialog"
import React from "react"

import type { ButtonVariant } from "@/components/UI/button/button"
import { Button } from "@/components/UI/button/button"
import { Text } from "@/components/UI/Text/text"

import styles from "./ConfirmDialog.module.scss"

type ConfirmDialogProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: ButtonVariant
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "כן",
  cancelText = "ביטול",
  variant = "destructive"
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={open => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content} aria-describedby="confirm-dialog">
          <Dialog.Title className={styles.title}>{title}</Dialog.Title>
          <Text className={styles.description}>{description}</Text>
          <div className={styles.actions}>
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant={variant} onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

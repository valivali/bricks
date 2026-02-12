import React, { useCallback, useEffect } from "react"
import { createPortal } from "react-dom"

import styles from "./Drawer.module.scss"

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  direction?: "right" | "left"
  animationSpeed?: number
  width?: string
  title?: string
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  direction = "right",
  animationSpeed = 300,
  width = "60vw",
  title
}) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    },
    [isOpen, onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleEscape])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={`${styles.drawer} ${styles[direction]}`}
        style={{
          width,
          transitionDuration: `${animationSpeed}ms`
        }}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Dropdown.module.scss"
import { Button } from "../button/button"

export type DropdownItem = {
  label: string
  to?: string
  onClick?: () => void
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
}

export const Dropdown: React.FC<DropdownProps> = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current || wrapperRef.current.contains(event.target as Node)) return
      setIsOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Button
        variant="ghost"
        className={styles.trigger}
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu">
        {trigger}
      </Button>
      {isOpen && (
        <div className={styles.menu} role="menu">
          {items.map(item => {
            if (item.to) {
              return (
                <Link key={item.label} to={item.to} className={styles.item} onClick={() => setIsOpen(false)} role="menuitem">
                  {item.label}
                </Link>
              )
            }

            return (
              <Button
                key={item.label}
                variant="ghost"
                className={styles.item}
                onClick={() => {
                  item.onClick?.()
                  setIsOpen(false)
                }}
                role="menuitem">
                {item.label}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}

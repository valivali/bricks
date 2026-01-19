import React, { useState, useRef, useEffect } from "react"
import styles from "./ExpandableRow.module.scss"

interface ExpandableRowProps {
  mainContent: React.ReactNode
  expandedContent: React.ReactNode
  isExpanded?: boolean
  onToggle?: (expanded: boolean) => void
  className?: string
  colSpan?: number
}

const ExpandableRow: React.FC<ExpandableRowProps> = ({
  mainContent,
  expandedContent,
  isExpanded: controlledIsExpanded,
  onToggle,
  className = "",
  colSpan = 1
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | string>(0)

  const isExpanded = controlledIsExpanded !== undefined ? controlledIsExpanded : internalIsExpanded

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded, expandedContent])

  const handleToggle = () => {
    const newState = !isExpanded
    if (onToggle) {
      onToggle(newState)
    } else {
      setInternalIsExpanded(newState)
    }
  }

  return (
    <>
      <tr className={`${styles.mainRow} ${isExpanded ? styles.expanded : ""} ${className}`} onClick={handleToggle}>
        {mainContent}
      </tr>
      <tr className={`${styles.expandableRow} ${isExpanded ? styles.visible : ""}`}>
        <td colSpan={colSpan} className={styles.expandableCell}>
          <div
            ref={contentRef}
            className={styles.expandableContent}
            style={{
              height: typeof contentHeight === "number" ? `${contentHeight}px` : contentHeight,
              overflow: "hidden",
              transition: "height 0.3s ease-in-out"
            }}>
            <div className={styles.innerContent}>{expandedContent}</div>
          </div>
        </td>
      </tr>
    </>
  )
}

export default ExpandableRow

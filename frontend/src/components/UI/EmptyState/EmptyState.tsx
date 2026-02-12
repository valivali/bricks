import React from "react"

import { Button } from "../button/button"
import { Text, Title } from "../Text/text"
import styles from "./EmptyState.module.scss"

interface EmptyStateProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action, icon }) => {
  return (
    <div className={styles.emptyState}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <Title level={3} className={styles.title}>
        {title}
      </Title>
      {description && <Text className={styles.description}>{description}</Text>}
      {action && (
        <Button onClick={action.onClick} className={styles.action}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

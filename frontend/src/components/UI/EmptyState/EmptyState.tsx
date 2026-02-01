import React from "react"
import styles from "./EmptyState.module.scss"
import { Title, Text } from "../Text/text"
import { Button } from "../button/button"

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

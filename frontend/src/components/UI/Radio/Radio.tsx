import React from "react"
import styles from "./Radio.module.scss"

interface RadioOption {
  id: string
  label: string
  icon?: string | React.ReactNode
}

interface RadioProps {
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

const Radio: React.FC<RadioProps> = ({ options, value, onChange, className = "" }) => {
  return (
    <div className={`${styles["radio-group"]} ${className}`}>
      {options.map(option => (
        <label key={option.id} className={`${styles["radio-option"]} ${value === option.id ? styles.selected : ""}`}>
          <input type="radio" name="radio-group" value={option.id} checked={value === option.id} onChange={() => onChange(option.id)} />
          <div className={styles["radio-content"]}>
            {option.icon && (
              <div className={styles["radio-icon"]}>
                {typeof option.icon === "string" ? <span className={styles["placeholder-icon"]}>{option.icon}</span> : option.icon}
              </div>
            )}
            <span className={styles["radio-label"]}>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  )
}

export default Radio

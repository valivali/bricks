import React, { useState } from "react"
import Radio from "@/components/UI/Radio/Radio"
import { type SkeletonOption } from "@/config/skeleton-data"
import { Button } from "@/components/UI/button/button"
import styles from "./RadioSelectionStep.module.scss"

interface RadioSelectionStepProps {
  options: SkeletonOption[]
  initialValue?: string
  layout: "grid" | "smallerRadio" | "list"
  onNext: (id: string) => void
  onBack?: () => void
  isFirstStep?: boolean
}

const RadioSelectionStep: React.FC<RadioSelectionStepProps> = ({ options, initialValue, layout, onNext, onBack, isFirstStep = false }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue || "")

  return (
    <div className={styles.selectionStep}>
      <Radio
        className={styles[layout]}
        options={options.map(opt => ({
          id: opt.id,
          label: opt.label,
          icon: opt.icon
        }))}
        value={selectedValue}
        onChange={id => {
          setSelectedValue(id)
          onNext(id)
        }}
      />

      <div className={styles.actions}>
        {!isFirstStep && (
          <Button variant="outline" onClick={onBack}>
            חזור
          </Button>
        )}
      </div>
    </div>
  )
}

export default RadioSelectionStep

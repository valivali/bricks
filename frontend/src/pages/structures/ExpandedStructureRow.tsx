import React from "react"

import { type InspectionDto } from "@/api/inspection.api"
import InspectionForm from "@/components/structure/InspectionForm/InspectionForm"
import { Button } from "@/components/UI/button/button"
import { type InspectionFormValues } from "@/schemas/inspection.schema"

import styles from "./structures.module.scss"

interface ExpandedStructureRowProps {
  inspections?: InspectionDto[]
  showInspectionForm: boolean
  inspectionDefaults: InspectionFormValues
  onAddInspection: () => void
  onCancelInspectionForm: () => void
  onSubmitInspection: (values: InspectionFormValues) => Promise<void>
}

export const ExpandedStructureRow: React.FC<ExpandedStructureRowProps> = ({
  inspections,
  showInspectionForm,
  inspectionDefaults,
  onAddInspection,
  onCancelInspectionForm,
  onSubmitInspection
}) => {
  return (
    <div className={styles.expandedContent}>
      <div className={styles.inspectionsSection}>
        <div className={styles.inspectionsHeader}>
          <h4>סקירות</h4>
          <Button size="sm" onClick={onAddInspection}>
            הוסף סקירה
          </Button>
        </div>

        {showInspectionForm ? (
          <div className={styles.inspectionFormContainer}>
            <InspectionForm defaultValues={inspectionDefaults} onSubmit={onSubmitInspection} onBack={onCancelInspectionForm} />
          </div>
        ) : (
          <>
            {inspections && inspections.length > 0 ? (
              <div className={styles.inspectionsList}>
                {inspections.map(inspection => (
                  <div key={inspection.id} className={styles.inspectionCard}>
                    <div className={styles.inspectionField}>
                      <strong>תאריך:</strong>{" "}
                      {inspection.inspectionDate ? new Date(inspection.inspectionDate).toLocaleDateString("he-IL") : "-"}
                    </div>
                    <div className={styles.inspectionField}>
                      <strong>סוג:</strong> {inspection.inspectionType ?? "-"}
                    </div>
                    <div className={styles.inspectionField}>
                      <strong>סוקר:</strong> {inspection.inspectorName ?? "-"}
                    </div>
                    <div className={styles.inspectionField}>
                      <strong>חברה:</strong> {inspection.companyName ?? "-"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noInspections}>אין סקירות עדיין</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

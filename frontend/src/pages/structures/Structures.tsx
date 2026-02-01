import React from "react"
import { useNavigate } from "react-router-dom"
import { type StructureIdDto } from "@/api/structure-id.api"
import { Table, type TableColumn } from "@/components/UI/Table/Table"
import { EmptyState } from "@/components/UI/EmptyState/EmptyState"
import { Button } from "@/components/UI/button/button"
import { FileIcon } from "@/components/icons"
import styles from "./structures.module.scss"
import { Title } from "@/components/UI/Text/text"
import { useStructureIdsQuery } from "@/hooks/useStructureId"

export const Structures: React.FC = () => {
  const navigate = useNavigate()

  const { data: structures, isLoading, error } = useStructureIdsQuery()

  const columns: TableColumn<StructureIdDto>[] = [
    {
      header: "מס׳ מבנה",
      accessor: "structureNumber",
      width: "20%"
    },
    {
      header: "שם מבנה",
      accessor: "structureName",
      width: "30%"
    },
    {
      header: "סימון מבנה",
      accessor: "structureMarking",
      width: "25%"
    },
    {
      header: "מרחב",
      accessor: row => {
        if (!row.area) return "-"
        const areaMap: Record<string, string> = {
          "1.5-1": "דרום",
          "1.5-2": "מרכז",
          "1.5-3": "צפון"
        }
        return areaMap[row.area] || row.area
      },
      width: "15%"
    },
    {
      header: "תאריך יצירה",
      accessor: row => new Date(row.createdAt).toLocaleDateString("he-IL"),
      width: "10%"
    }
  ]

  const handleRowClick = (structure: StructureIdDto) => {
    navigate(`/structure-id/${structure.id}`)
  }

  const handleCreateNew = () => {
    navigate("/structure-id/new")
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            תעודות זהות למבנים
          </Title>
        </div>
        <div className={styles.loading}>טוען...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            תעודות זהות למבנים
          </Title>
        </div>
        <div className={styles.error}>אירעה שגיאה בטעינת הנתונים</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>
          תעודות זהות למבנים
        </Title>
        <Button onClick={handleCreateNew}>יצירת תעודת זהות חדשה</Button>
      </div>

      {structures && structures.length > 0 ? (
        <Table columns={columns} data={structures} onRowClick={handleRowClick} />
      ) : (
        <EmptyState
          icon={<FileIcon />}
          title="אין תעודות זהות במערכת"
          description="צור תעודת זהות ראשונה למבנה כדי להתחיל"
          action={{
            label: "יצירת תעודת זהות חדשה",
            onClick: handleCreateNew
          }}
        />
      )}
    </div>
  )
}

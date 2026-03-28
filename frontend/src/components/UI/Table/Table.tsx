import React from "react"

import styles from "./Table.module.scss"

export interface TableColumn<T> {
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  width?: string
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  className?: string
}

export function Table<T extends { id: string }>({ columns, data, onRowClick, className }: TableProps<T>) {
  const getCellValue = (row: T, column: TableColumn<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row)
    }
    return row[column.accessor] as React.ReactNode
  }

  return (
    <div className={`${styles.tableWrapper} ${className ?? ""}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ width: column.width }}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} onClick={() => onRowClick?.(row)} className={onRowClick ? styles.clickable : ""}>
              {columns.map((column, index) => (
                <td key={index}>{getCellValue(row, column)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

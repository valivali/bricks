import React from "react"
import { Header } from "@/components/layout/Header/Header"
import styles from "./ProtectedLayout.module.scss"

export const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  )
}

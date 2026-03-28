import React from "react"
import { useNavigate } from "react-router-dom"

import { Dropdown } from "@/components/UI/Dropdown/Dropdown"
import { useAuthContext } from "@/contexts/AuthContext"
import { useUserProfileContext } from "@/contexts/UserProfileContext"

import styles from "./Header.module.scss"

const getInitials = (firstName?: string | null, lastName?: string | null, email?: string | null) => {
  const first = firstName?.trim() ?? ""
  const last = lastName?.trim() ?? ""
  if (first && last) return `${first[0]}${last[0]}`.toUpperCase()
  if (first) return first.slice(0, 2).toUpperCase()
  if (email) return email[0].toUpperCase()
  return "?"
}

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuthContext()
  const { profile } = useUserProfileContext()

  const avatarFallback = getInitials(profile?.firstName, profile?.lastName, profile?.email ?? null)

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src="/lego.svg" alt="Bricks" className={styles.logo} />
        <span className={styles.appName}>Bricks</span>
      </div>
      <Dropdown
        trigger={
          <div className={styles.avatar} aria-label="User menu">
            {profile?.profileImage ? (
              <img src={profile.profileImage} alt="Profile" className={styles.avatarImage} />
            ) : (
              <span className={styles.avatarText}>{avatarFallback}</span>
            )}
          </div>
        }
        items={[
          { label: "פרופיל", to: "/profile" },
          {
            label: "התנתק",
            onClick: async () => {
              logout()
              await navigate("/auth/login")
            }
          }
        ]}
      />
    </header>
  )
}

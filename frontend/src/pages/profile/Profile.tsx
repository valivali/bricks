import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/button/button"
import { ImageUpload } from "@/components/UI/ImageUpload/ImageUpload"
import { Text, Title } from "@/components/UI/Text/text"
import { useAuthContext } from "@/contexts/AuthContext"
import { useUserProfileContext } from "@/contexts/UserProfileContext"
import { useToast } from "@/hooks/useToast"
import { type ProfileFormValues, profileSchema } from "@/schemas/profile.schema"

import styles from "./profile.module.scss"

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

const toNull = (value?: string | null) => {
  const trimmed = value?.trim() ?? ""
  return trimmed ? trimmed : null
}

const digitsOrNull = (value?: string | null) => {
  const trimmed = value?.trim() ?? ""
  if (!trimmed) return null
  return trimmed.replace(/\D/g, "")
}

export const Profile = () => {
  const toast = useToast()
  const { user } = useAuthContext()
  const { profile, isLoading, updateProfile } = useUserProfileContext()

  const defaultValues = useMemo<ProfileFormValues>(
    () => ({
      email: profile?.email ?? user?.email ?? "",
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      idNumber: profile?.idNumber ?? "",
      phone: profile?.phone ? formatPhone(profile.phone) : "",
      companyName: profile?.companyName ?? "",
      companyId: profile?.companyId ?? "",
      companyAddress: profile?.companyAddress ?? "",
      profileImage: profile?.profileImage ?? ""
    }),
    [profile, user]
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const profileImage = watch("profileImage")

  const onSubmit = handleSubmit(async values => {
    const previousEmail = profile?.email ?? user?.email
    try {
      const updated = await updateProfile({
        email: values.email.trim(),
        firstName: toNull(values.firstName),
        lastName: toNull(values.lastName),
        idNumber: digitsOrNull(values.idNumber),
        phone: digitsOrNull(values.phone),
        companyName: toNull(values.companyName),
        companyId: digitsOrNull(values.companyId),
        companyAddress: toNull(values.companyAddress),
        profileImage: toNull(values.profileImage)
      })

      toast.success("הפרופיל עודכן בהצלחה")

      if (previousEmail && updated.email !== previousEmail && !updated.isVerified) {
        toast.default("שלחנו אימייל אימות לכתובת החדשה")
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "שגיאה בעדכון הפרופיל"
      toast.error(message)
    }
  })

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Text variant="span">טוען...</Text>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Title level={2} size="2xl">
          פרופיל משתמש
        </Title>
        <Text variant="p" className={styles.subtitle}>
          אנחנו אוספים את הנתונים כדי להשתמש בהם בהמשך בדוחות ובטפסים.
        </Text>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.grid}>
          <label className={styles.field}>
            <span className={styles.label}>שם פרטי</span>
            <input type="text" maxLength={50} {...register("firstName")} className={errors.firstName ? styles.inputError : styles.input} />
            {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>שם משפחה</span>
            <input type="text" maxLength={50} {...register("lastName")} className={errors.lastName ? styles.inputError : styles.input} />
            {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>מספר ת.ז</span>
            <input
              type="text"
              maxLength={9}
              inputMode="numeric"
              {...register("idNumber")}
              className={errors.idNumber ? styles.inputError : styles.input}
            />
            {errors.idNumber && <span className={styles.error}>{errors.idNumber.message}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>כתובת מייל</span>
            <input type="email" maxLength={254} {...register("email")} className={errors.email ? styles.inputError : styles.input} />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>טלפון</span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={12}
              value={formatPhone(watch("phone") ?? "")}
              onChange={event => setValue("phone", formatPhone(event.target.value))}
              className={errors.phone ? styles.inputError : styles.input}
            />
            {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>שם החברה</span>
            <input
              type="text"
              maxLength={100}
              {...register("companyName")}
              className={errors.companyName ? styles.inputError : styles.input}
            />
            {errors.companyName && <span className={styles.error}>{errors.companyName.message}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>ח.פ החברה</span>
            <input
              type="text"
              maxLength={9}
              inputMode="numeric"
              {...register("companyId")}
              className={errors.companyId ? styles.inputError : styles.input}
            />
            {errors.companyId && <span className={styles.error}>{errors.companyId.message}</span>}
          </label>

          <label className={styles.field}>
            <span className={styles.label}>כתובת החברה</span>
            <input
              type="text"
              maxLength={200}
              {...register("companyAddress")}
              className={errors.companyAddress ? styles.inputError : styles.input}
            />
            {errors.companyAddress && <span className={styles.error}>{errors.companyAddress.message}</span>}
          </label>
        </div>

        <div className={styles.imageSection}>
          <ImageUpload
            label="תמונת פרופיל"
            value={profileImage ?? null}
            onChange={value => setValue("profileImage", value ?? "")}
            helperText="מומלץ לבחור תמונה מרובעת וברורה"
          />
        </div>

        <div className={styles.actions}>
          <Button type="submit" isLoading={isSubmitting}>
            שמור שינויים
          </Button>
        </div>
      </form>
    </div>
  )
}

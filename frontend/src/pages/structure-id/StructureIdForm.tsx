import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/UI/button/button"
import { Title } from "@/components/UI/Text/text"
import {
  ConditionRatingSection,
  GeneralClassificationSection,
  GeneralIdentificationSection,
  GeometrySection,
  HydraulicSection,
  InfrastructureSection,
  InspectionsSection,
  LoadInfoSection,
  MainServiceDataSection,
  MaterialsSection,
  StructureClassificationSection
} from "@/components/structure-id"
import { useUserProfileContext } from "@/contexts/UserProfileContext"
import { useToast } from "@/hooks/useToast"
import { useCreateStructureId, useStructureIdQuery, useUpdateStructureId } from "@/hooks/useStructureId"
import { structureIdSchema, type StructureIdFormValues, type StructureIdValidatedValues } from "@/schemas/structure-id.schema"
import styles from "./structure-id.module.scss"

export const StructureIdForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { profile } = useUserProfileContext()
  const { success, error } = useToast()

  const { data: existingData, isLoading } = useStructureIdQuery(id)

  const defaultValues: Partial<StructureIdFormValues> = {
    area: undefined,
    trafficFunctionClass: undefined
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<StructureIdFormValues, unknown, StructureIdValidatedValues>({
    resolver: zodResolver(structureIdSchema),
    defaultValues
  })

  const toStr = (v: string | number | null | undefined): string | undefined => (v == null ? undefined : String(v))

  const structureTypeValue = toStr(watch("structureType"))
  const structureSubTypeValue = toStr(watch("structureSubType"))
  const separatorTypeValue = toStr(watch("separatorType"))
  const deckTypesValue = toStr(watch("deckTypes"))
  const floorTypeValue = toStr(watch("floorType"))
  const abutment1TypeValue = toStr(watch("abutment1Type"))
  const abutment2TypeValue = toStr(watch("abutment2Type"))
  const pierTypesValue = toStr(watch("pierTypes"))
  const prestressingTypeValue = toStr(watch("prestressingType"))
  const bearingTypesValue = toStr(watch("bearingTypes"))
  const jointTypesValue = toStr(watch("jointTypes"))
  const localBypassMethodValue = toStr(watch("localBypassMethod"))
  const deckMaterialsValue = toStr(watch("deckMaterials"))
  const beamMaterialsValue = toStr(watch("beamMaterials"))
  const abutmentMaterialsValue = toStr(watch("abutmentMaterials"))
  const pierMaterialsValue = toStr(watch("pierMaterials"))
  const slopeProtectionMaterialsValue = toStr(watch("slopeProtectionMaterials"))
  const vehicleBarrierMaterialsValue = toStr(watch("vehicleBarrierMaterials"))
  const pedestrianRailingMaterialsValue = toStr(watch("pedestrianRailingMaterials"))
  const deckCoveringMaterialsValue = toStr(watch("deckCoveringMaterials"))
  const deckSealingMaterialsValue = toStr(watch("deckSealingMaterials"))
  const curbMaterialsValue = toStr(watch("curbMaterials"))
  const infrastructureTypesValue = toStr(watch("infrastructureTypes"))
  const bypassDescriptionImageValue = watch("bypassDescriptionImage") ?? undefined

  useEffect(() => {
    if (existingData) {
      reset(existingData as any)
    } else if (profile && id === "new") {
      reset({
        ...defaultValues
      })
    }
  }, [existingData, profile, reset, id])

  const createMutation = useCreateStructureId({
    onSuccess: () => {
      success("תעודת הזהות נוצרה בהצלחה")
      navigate("/structures")
    },
    onError: () => {
      error("שגיאה ביצירת תעודת הזהות")
    }
  })

  const updateMutation = useUpdateStructureId(id, {
    onSuccess: () => {
      success("תעודת הזהות עודכנה בהצלחה")
    },
    onError: () => {
      error("שגיאה בעדכון תעודת הזהות")
    }
  })

  const onSubmit = (values: StructureIdValidatedValues) => {
    if (id && id !== "new") {
      updateMutation.mutate(values)
    } else {
      createMutation.mutate(values)
    }
  }

  const handleCancel = () => {
    navigate("/structures")
  }

  const handleClearChanges = () => {
    reset(existingData as any)
  }

  if (isLoading) {
    return <div className={styles.loading}>טוען...</div>
  }

  const isReadonly = false

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>
          {id === "new" ? "תעודת זהות חדשה למבנה" : "תעודת זהות למבנה"}
        </Title>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <GeneralIdentificationSection register={register} errors={errors} isReadonly={isReadonly} />
        <GeneralClassificationSection
          register={register}
          errors={errors}
          isReadonly={isReadonly}
          structureTypeValue={structureTypeValue}
          structureSubTypeValue={structureSubTypeValue}
          onStructureTypeChange={value => {
            setValue("structureType", value, { shouldDirty: true })
            setValue("structureSubType", "", { shouldDirty: true })
            setValue("structureDetailType", "", { shouldDirty: true })
          }}
          onStructureSubTypeChange={value => {
            setValue("structureSubType", value, { shouldDirty: true })
            setValue("structureDetailType", "", { shouldDirty: true })
          }}
        />
        <MainServiceDataSection
          register={register}
          errors={errors}
          isReadonly={isReadonly}
          localBypassMethodValue={localBypassMethodValue}
          bypassDescriptionImageValue={bypassDescriptionImageValue}
          onBypassDescriptionImageChange={value => setValue("bypassDescriptionImage", value || "", { shouldDirty: true })}
        />
        <GeometrySection register={register} errors={errors} isReadonly={isReadonly} separatorTypeValue={separatorTypeValue} />
        <StructureClassificationSection
          register={register}
          errors={errors}
          isReadonly={isReadonly}
          deckTypesValue={deckTypesValue}
          floorTypeValue={floorTypeValue}
          abutment1TypeValue={abutment1TypeValue}
          abutment2TypeValue={abutment2TypeValue}
          pierTypesValue={pierTypesValue}
          prestressingTypeValue={prestressingTypeValue}
          bearingTypesValue={bearingTypesValue}
          jointTypesValue={jointTypesValue}
        />
        <MaterialsSection
          register={register}
          errors={errors}
          isReadonly={isReadonly}
          deckMaterialsValue={deckMaterialsValue}
          beamMaterialsValue={beamMaterialsValue}
          abutmentMaterialsValue={abutmentMaterialsValue}
          pierMaterialsValue={pierMaterialsValue}
          slopeProtectionMaterialsValue={slopeProtectionMaterialsValue}
          vehicleBarrierMaterialsValue={vehicleBarrierMaterialsValue}
          pedestrianRailingMaterialsValue={pedestrianRailingMaterialsValue}
          deckCoveringMaterialsValue={deckCoveringMaterialsValue}
          deckSealingMaterialsValue={deckSealingMaterialsValue}
          curbMaterialsValue={curbMaterialsValue}
        />
        <LoadInfoSection register={register} errors={errors} isReadonly={isReadonly} />
        <InfrastructureSection
          register={register}
          errors={errors}
          isReadonly={isReadonly}
          infrastructureTypesValue={infrastructureTypesValue}
        />
        <HydraulicSection register={register} errors={errors} isReadonly={isReadonly} />
        <ConditionRatingSection register={register} errors={errors} isReadonly={isReadonly} />
        <InspectionsSection register={register} errors={errors} isReadonly={isReadonly} />

        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={handleCancel}>
            חזור לרשימה
          </Button>
          <Button type="button" variant="outline" onClick={handleClearChanges}>
            נקה שינויים
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {id === "new" ? "צור תעודת זהות" : "שמור שינויים"}
          </Button>
        </div>
      </form>
    </div>
  )
}

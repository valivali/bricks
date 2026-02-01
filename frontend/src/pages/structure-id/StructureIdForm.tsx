import React, { useEffect, useState } from "react"
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
import { structureIdSchema, type StructureIdFormValues } from "@/schemas/structure-id.schema"
import styles from "./structure-id.module.scss"

export const StructureIdForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { profile } = useUserProfileContext()
  const { success, error } = useToast()
  const [isEditMode, setIsEditMode] = useState(!id || id === "new")

  const { data: existingData, isLoading } = useStructureIdQuery(id)

  const defaultValues: Partial<StructureIdFormValues> = {
    area: undefined,
    trafficFunctionClass: undefined
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<StructureIdFormValues>({
    resolver: zodResolver(structureIdSchema),
    defaultValues
  })

  const separatorTypeValue = watch("separatorType")
  const deckTypesValue = watch("deckTypes")
  const floorTypeValue = watch("floorType")
  const abutment1TypeValue = watch("abutment1Type")
  const abutment2TypeValue = watch("abutment2Type")
  const pierTypesValue = watch("pierTypes")
  const prestressingTypeValue = watch("prestressingType")
  const bearingTypesValue = watch("bearingTypes")
  const jointTypesValue = watch("jointTypes")
  const localBypassMethodValue = watch("localBypassMethod")
  const deckMaterialsValue = watch("deckMaterials")
  const beamMaterialsValue = watch("beamMaterials")
  const abutmentMaterialsValue = watch("abutmentMaterials")
  const pierMaterialsValue = watch("pierMaterials")
  const slopeProtectionMaterialsValue = watch("slopeProtectionMaterials")
  const vehicleBarrierMaterialsValue = watch("vehicleBarrierMaterials")
  const pedestrianRailingMaterialsValue = watch("pedestrianRailingMaterials")
  const deckCoveringMaterialsValue = watch("deckCoveringMaterials")
  const deckSealingMaterialsValue = watch("deckSealingMaterials")
  const curbMaterialsValue = watch("curbMaterials")
  const infrastructureTypesValue = watch("infrastructureTypes")

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
      setIsEditMode(false)
    },
    onError: () => {
      error("שגיאה בעדכון תעודת הזהות")
    }
  })

  const onSubmit = (values: StructureIdFormValues) => {
    if (id && id !== "new") {
      updateMutation.mutate(values)
    } else {
      createMutation.mutate(values)
    }
  }

  const handleCancel = () => {
    if (id && id !== "new") {
      setIsEditMode(false)
      if (existingData) {
        reset(existingData as any)
      }
    } else {
      navigate("/structures")
    }
  }

  if (isLoading) {
    return <div className={styles.loading}>טוען...</div>
  }

  const isReadonly = !isEditMode

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>
          {id === "new" ? "תעודת זהות חדשה למבנה" : "תעודת זהות למבנה"}
        </Title>
        {!isEditMode && id !== "new" && <Button onClick={() => setIsEditMode(true)}>עריכה</Button>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <GeneralIdentificationSection register={register} errors={errors} isReadonly={isReadonly} />
        <GeneralClassificationSection register={register} errors={errors} isReadonly={isReadonly} />
        <MainServiceDataSection
          register={register}
          errors={errors}
          isReadonly={isReadonly}
          localBypassMethodValue={localBypassMethodValue}
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
            ביטול
          </Button>
          {isEditMode && (
            <Button type="submit" isLoading={isSubmitting}>
              {id === "new" ? "צור תעודת זהות" : "שמור שינויים"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

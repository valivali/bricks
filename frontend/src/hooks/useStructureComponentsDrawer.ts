import { useEffect, useMemo, useRef, useState } from "react"

import { type FormValues } from "@/types/structure-component.types"
import { type StructureComponentDto } from "@/api/structure-component.api"

interface UseStructureComponentsDrawerProps {
  structureComponents?: StructureComponentDto[]
  isDrawerOpen: boolean
  structureId: string | null
}

export const useStructureComponentsDrawer = ({ structureComponents, isDrawerOpen, structureId }: UseStructureComponentsDrawerProps) => {
  const [quantities, setQuantities] = useState<Record<string, string>>({})
  const [formValues, setFormValues] = useState<FormValues>({ components: {} })
  const syncedStructureIdRef = useRef<string | null>(null)

  const transformedData = useMemo(() => {
    if (!isDrawerOpen || !structureId || !structureComponents) {
      return null
    }

    if (structureComponents.length === 0) {
      return { quantities: {}, formValues: { components: {} } }
    }

    const initQuant: Record<string, string> = {}
    const initForm: FormValues = { components: {} }

    structureComponents.forEach(comp => {
      initQuant[comp.componentCode] = String(comp.quantity)
      initForm.components[comp.componentCode] = {
        subComponents: comp.subComponents.map(sub => ({
          id: sub.index,
          name: sub.name,
          basicQuantity: sub.basicQuantity,
          secondaryQuantity: sub.secondaryQuantity,
          comments: sub.comments || "",
          attachment: sub.attachment,
          updatedAt: new Date(sub.updatedAt).toISOString().split("T")[0]
        })),
        comments: comp.comments || "",
        updatedAt: new Date(comp.updatedAt).toISOString().split("T")[0]
      }
    })

    return { quantities: initQuant, formValues: initForm }
  }, [structureComponents, isDrawerOpen, structureId])

  useEffect(() => {
    if (!transformedData || syncedStructureIdRef.current === structureId) return

    setQuantities(transformedData.quantities)
    setFormValues(transformedData.formValues)
    syncedStructureIdRef.current = structureId
  }, [transformedData, structureId])

  const resetDrawerState = () => {
    syncedStructureIdRef.current = null
    setQuantities({})
    setFormValues({ components: {} })
  }

  return {
    quantities,
    setQuantities,
    formValues,
    setFormValues,
    resetDrawerState
  }
}

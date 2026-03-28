import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { structureComponentApi, type StructureComponentDto } from "@/api/structure-component.api"
import { structureComponentMapper } from "@/mappers/structure-component.mapper"
import { type ComponentFormRecord } from "@/types/structure-component.types"

export interface ClientStructureComponent extends ComponentFormRecord {
  componentCode: string
  description: string
  importanceLevel: string
  basicMeasurementUnit: string
  secondaryMeasurementUnit: string | null
  quantity: number
  evaluationNeeded: boolean
  notes: string | null
}

export const useStructureComponentsQuery = (structureId: string | undefined) => {
  return useQuery({
    queryKey: ["structure-components", structureId],
    queryFn: async () => {
      const dtos = await structureComponentApi.getComponentsByStructureId(structureId!)
      return dtos.map(structureComponentMapper.toClientStructureComponent)
    },
    enabled: !!structureId
  })
}

export const useUpsertStructureComponents = (
  structureId: string,
  options?: {
    onSuccess?: (data: StructureComponentDto[]) => void
    onError?: (error: Error) => void
  }
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (components: ClientStructureComponent[]) =>
      structureComponentApi.bulkUpsertComponents(structureId, {
        components: components.map(structureComponentMapper.toApiStructureComponent)
      }),
    onSuccess: data => {
      void queryClient.invalidateQueries({ queryKey: ["structure-components", structureId] })
      options?.onSuccess?.(data)
    },
    onError: options?.onError
  })
}

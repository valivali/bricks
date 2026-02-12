import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { type BulkUpsertComponentsRequest, structureComponentApi, type StructureComponentDto } from "@/api/structure-component.api"

export const useStructureComponentsQuery = (structureId: string | undefined) => {
  return useQuery({
    queryKey: ["structure-components", structureId],
    queryFn: () => structureComponentApi.getComponentsByStructureId(structureId!),
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
    mutationFn: (data: BulkUpsertComponentsRequest) => structureComponentApi.bulkUpsertComponents(structureId, data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["structure-components", structureId] })
      options?.onSuccess?.(data)
    },
    onError: options?.onError
  })
}

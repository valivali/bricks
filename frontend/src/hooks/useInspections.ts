import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { type CreateInspectionRequest, inspectionApi, type InspectionDto, type UpdateInspectionRequest } from "@/api/inspection.api"

export const useInspectionsQuery = () => {
  return useQuery({
    queryKey: ["inspections"],
    queryFn: () => inspectionApi.getUserInspections()
  })
}

export const useStructureInspectionsQuery = (structureId: string | undefined) => {
  return useQuery({
    queryKey: ["inspections", "structure", structureId],
    queryFn: () => inspectionApi.getStructureInspections(structureId!),
    enabled: !!structureId
  })
}

export const useInspectionQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ["inspections", id],
    queryFn: () => inspectionApi.getInspectionById(id!),
    enabled: !!id
  })
}

export const useCreateInspection = (options?: { onSuccess?: (data: InspectionDto) => void; onError?: (error: Error) => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateInspectionRequest) => inspectionApi.createInspection(data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["inspections"] })
      if (data.structureId) {
        queryClient.invalidateQueries({ queryKey: ["inspections", "structure", data.structureId] })
      }
      options?.onSuccess?.(data)
    },
    onError: options?.onError
  })
}

export const useUpdateInspection = (
  id: string,
  options?: {
    onSuccess?: (data: InspectionDto) => void
    onError?: (error: Error) => void
  }
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateInspectionRequest) => inspectionApi.updateInspection(id, data),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["inspections"] })
      queryClient.invalidateQueries({ queryKey: ["inspections", id] })
      if (data.structureId) {
        queryClient.invalidateQueries({ queryKey: ["inspections", "structure", data.structureId] })
      }
      options?.onSuccess?.(data)
    },
    onError: options?.onError
  })
}

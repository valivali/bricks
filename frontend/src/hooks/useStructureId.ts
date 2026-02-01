import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query"
import { structureIdApi, type CreateStructureIdRequest, type StructureIdDto, type UpdateStructureIdRequest } from "@/api/structure-id.api"

export const useStructureIdsQuery = () => {
  return useQuery({
    queryKey: ["structureIds"],
    queryFn: structureIdApi.getUserStructureIds
  })
}

export const useStructureIdQuery = (id?: string) => {
  return useQuery({
    queryKey: ["structureId", id],
    queryFn: () => structureIdApi.getStructureIdById(id!),
    enabled: !!id && id !== "new"
  })
}

export const useCreateStructureId = (options?: UseMutationOptions<StructureIdDto, Error, CreateStructureIdRequest>) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: structureIdApi.createStructureId,
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["structureIds"] })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
    onError: (error, variables, onMutateResult, context) => {
      options?.onError?.(error, variables, onMutateResult, context)
    }
  })
}

export const useUpdateStructureId = (id?: string, options?: UseMutationOptions<StructureIdDto, Error, UpdateStructureIdRequest>) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: data => {
      if (!id) {
        return Promise.reject(new Error("Missing structure id"))
      }
      return structureIdApi.updateStructureId(id, data)
    },
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["structureId", id] })
      }
      queryClient.invalidateQueries({ queryKey: ["structureIds"] })
      options?.onSuccess?.(data, variables, onMutateResult, context)
    },
    onError: (error, variables, onMutateResult, context) => {
      options?.onError?.(error, variables, onMutateResult, context)
    }
  })
}

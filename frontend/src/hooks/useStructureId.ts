import { useMutation, type UseMutationOptions, useQuery, useQueryClient } from "@tanstack/react-query"

import { type CreateStructureIdRequest, structureIdApi, type StructureIdDto, type UpdateStructureIdRequest } from "@/api/structure-id.api"
import { normalizeDateForForm } from "@/schemas/structure-id.schema"

const normalizeDatesInDto = (dto: StructureIdDto): StructureIdDto => {
  return {
    ...dto,
    loadRatingDate: normalizeDateForForm(dto.loadRatingDate),
    seismicRatingDate: normalizeDateForForm(dto.seismicRatingDate),
    initialInspectionDate: normalizeDateForForm(dto.initialInspectionDate),
    lastRoutineInspectionDate: normalizeDateForForm(dto.lastRoutineInspectionDate),
    damageControlInspectionDate: normalizeDateForForm(dto.damageControlInspectionDate),
    underwaterInspectionDate: normalizeDateForForm(dto.underwaterInspectionDate),
    thoroughInspectionDate: normalizeDateForForm(dto.thoroughInspectionDate),
    specialInspectionDate: normalizeDateForForm(dto.specialInspectionDate)
  }
}

export const useStructureIdsQuery = () => {
  return useQuery({
    queryKey: ["structureIds"],
    queryFn: async () => {
      const data = await structureIdApi.getUserStructureIds()
      return data.map(normalizeDatesInDto)
    }
  })
}

export const useStructureIdQuery = (id?: string) => {
  return useQuery({
    queryKey: ["structureId", id],
    queryFn: async () => {
      const data = await structureIdApi.getStructureIdById(id!)
      return normalizeDatesInDto(data)
    },
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

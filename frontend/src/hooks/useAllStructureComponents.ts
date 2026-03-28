import { useQuery } from "@tanstack/react-query"

import { structureComponentApi } from "@/api/structure-component.api"
import { structureComponentMapper } from "@/mappers/structure-component.mapper"

import { type ClientStructureComponent } from "./useStructureComponents"

export const useAllStructureComponents = (structureIds: string[] | undefined) => {
  return useQuery({
    queryKey: ["all-structure-components", structureIds],
    queryFn: async () => {
      if (!structureIds || structureIds.length === 0) return {} as Record<string, ClientStructureComponent[]>

      const results = await Promise.all(
        structureIds.map(async id => {
          try {
            const dtos = await structureComponentApi.getComponentsByStructureId(id)
            const records = dtos.map(structureComponentMapper.toClientStructureComponent)
            return { id, records }
          } catch {
            return { id, records: [] }
          }
        })
      )

      return results.reduce(
        (acc, { id, records }) => {
          acc[id] = records
          return acc
        },
        {} as Record<string, ClientStructureComponent[]>
      )
    },
    enabled: !!structureIds && structureIds.length > 0,
    staleTime: 30000
  })
}

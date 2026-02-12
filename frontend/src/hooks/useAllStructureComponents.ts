import { useQuery } from "@tanstack/react-query"

import { structureComponentApi } from "@/api/structure-component.api"

export const useAllStructureComponents = (structureIds: string[] | undefined) => {
  return useQuery({
    queryKey: ["all-structure-components", structureIds],
    queryFn: async () => {
      if (!structureIds || structureIds.length === 0) return {}

      const results = await Promise.all(
        structureIds.map(async id => {
          try {
            const components = await structureComponentApi.getComponentsByStructureId(id)
            return { id, components }
          } catch {
            return { id, components: [] }
          }
        })
      )

      return results.reduce(
        (acc, { id, components }) => {
          acc[id] = components
          return acc
        },
        {} as Record<string, any[]>
      )
    },
    enabled: !!structureIds && structureIds.length > 0,
    staleTime: 30000
  })
}

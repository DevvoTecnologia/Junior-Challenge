import { useQuery } from '@tanstack/react-query'

import { getArtifacts } from '@/api/getArtifacts'

export function Home() {
  const { data: artifacts } = useQuery({
    queryKey: ['artifacts'],
    queryFn: getArtifacts,
  })

  console.log(artifacts)
  return <>HOME PAGE</>
}

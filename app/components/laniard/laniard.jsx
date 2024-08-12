import { useHydrated } from '~/hooks/useHydrated';
import { Laniard as LaniardClient } from './laniardClient'

export function Laniard(props) {
  const isHydrated = useHydrated()

  if (!isHydrated) {
    // Return a placeholder or null when not hydrated
    return null
  }

  return <LaniardClient {...props} />
}
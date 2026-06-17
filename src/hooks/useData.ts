import { useQuery } from '@tanstack/react-query';
import { fetchApps, fetchAppGraph } from '../mocks/api';

export function useApps() {
  return useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
  });
}

export function useAppGraph(appId: string | null) {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchAppGraph(appId!),
    enabled: !!appId,
  });
}

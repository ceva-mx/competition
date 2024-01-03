import type { Competition } from '@/types/competition';

export const useCompetition = () => {
  return useFetchWithCache<Competition>('');
};

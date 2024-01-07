import { defineStore } from 'pinia';
import type { Competition } from '@prisma/client';

export type NewCompetition = Omit<Competition, 'uuid' | 'isPublished'>;

export const useCompetitionStore = defineStore('competition', () => {
  const competitions = ref<Competition[]>([]);
  const router = useRouter();
  const localePath = useLocalePath();

  async function getCompetition(uuid: string) {
    const data = await $fetch(`/api/competition/${uuid}`);

    return data;
  };

  async function getCompetitions() {
    const data = await $fetch('/api/competition');

    competitions.value = data;
  }

  async function createCompetition(newCompetition: NewCompetition) {
    const isCreateSuccess = await $fetch('/api/competition', {
      method: 'post',
      body: newCompetition,
    });

    if (isCreateSuccess) {
      await getCompetitions();
      router.push(localePath('/competition'));
    }
  }

  async function deleteCompetition(uuid: string) {
    const isDeleteSuccess = await $fetch(`/api/competition/${uuid}`, { method: 'delete' });

    if (isDeleteSuccess) {
      competitions.value = competitions.value.filter((item) => item.uuid !== uuid);
      return true;
    }

    return false;
  };

  return {
    competitions,
    getCompetition,
    getCompetitions,
    createCompetition,
    deleteCompetition,
  };
});
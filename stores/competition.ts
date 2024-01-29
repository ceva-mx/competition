import { defineStore } from 'pinia';
import type { Prisma, Competition } from '@prisma/client';

export const useCompetitionStore = defineStore('competition', () => {
  const competitions = ref<Competition[]>([]);
  const router = useRouter();
  const { localePath } = useLocalization();

  async function getCompetition(uuid: string) {
    const data = await $fetch(`/api/competition/${uuid}`);

    return data;
  }

  async function getCompetitionList() {
    const data = await $fetch('/api/competition/list');

    competitions.value = data;
  }

  async function createCompetition(competition: Prisma.CompetitionCreateInput) {
    const isCreateSuccess = await $fetch('/api/competition', {
      method: 'post',
      body: competition,
    });

    if (isCreateSuccess) {
      await getCompetitionList();
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
  }

  return {
    competitions,
    getCompetition,
    getCompetitionList,
    createCompetition,
    deleteCompetition,
  };
});

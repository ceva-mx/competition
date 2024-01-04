export const useCompetition = () => {
  async function getCompetitions() {
    const { data, error } = await useFetch('/api/competition');

    return data;
  }

  async function getCompetition(uuid: string) {
    const { data, error } = await useFetch(`/api/competition/${uuid}`);

    return data;
  }

  return {
    getCompetitions,
    getCompetition,
  };
};

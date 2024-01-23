<template>
  <div v-if="item">
    <div>Event name: {{ item.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition';

const userStore = useUserStore();

const route = useRoute();

if (Object.keys(route.query).includes('preview')) {
  // проверить есть ли у текущего юзера такой эвент
  // если нет то редирект на ошибку

  
}

const uuid = route.params.uuid as string;
const { getCompetition } = useCompetitionStore();
const item = await getCompetition(uuid);
</script>
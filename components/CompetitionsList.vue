<script setup lang="ts">
import { useCompetition } from '@/composables/useCompetition';

const { getCompetitions } = useCompetition();
const competitions = await getCompetitions();
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="item in competitions"
      :key="item.uuid"
      class="rounded-lg border mb-2 py-2 px-4 flex justify-between"
    >
      <NuxtLinkLocale
        :to="`/competition/${item.uuid}`"
      >{{ item.name }}</NuxtLinkLocale>
      <div class="flex gap-x-4 items-center">
        <i class="pi pi-pencil cursor-pointer" />
        <i class="pi pi-trash cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompetition } from '@/composables/useCompetition';

const { list } = useCompetition();
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="item in list"
      :key="item.id"
      class="rounded-lg border mb-2 py-2 px-4 flex justify-between"
    >
      <NuxtLinkLocale
        :to="`/event/${item.id}`"
      >{{ item.name }}</NuxtLinkLocale>
      <div class="flex gap-x-4 items-center">
        <i class="pi pi-pencil cursor-pointer" />
        <i class="pi pi-trash cursor-pointer" />
      </div>
    </div>
  </div>
</template>
~/composables/useCompetition
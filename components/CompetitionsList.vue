<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition';

const { t } = useI18n({ useScope: 'local' });

const competitionStore = useCompetitionStore();
// const { competitions, getCompetitions } = storeToRefs(competitionStore);

onMounted(() => {
  if (!competitionStore.competitions.length) {
    competitionStore.getCompetitions();
  }
});

function confirmDelete(event: MouseEvent, uuid: string) {
  // confirm.require({
  //   target: event.currentTarget as HTMLElement,
  //   header: 'Delete Confirmation',
  //   message: t('confirm_delete'),
  //   icon: 'pi pi-exclamation-triangle',
  //   accept: async () => {
  //     const result = await competitionStore.deleteCompetition(uuid);

  //     if (result) {
  //       toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
  //     } else {
  //       toast.add({ severity: 'error', summary: 'Error', detail: 'Something goes wrong!', life: 3000 });
  //     }
  //   },
  // });
}
</script>

<template>
  <div class="flex flex-col">
     <div
      v-for="item in competitionStore.competitions"
      :key="item.uuid"
      class="rounded-lg border mb-2 py-2 px-4 flex justify-between"
    >
      <NuxtLinkLocale
        :to="`/competition/${item.uuid}`"
      >{{ item.name }}</NuxtLinkLocale>

      <div class="flex gap-x-4 items-center">
        <NuxtLinkLocale
          :to="`/competition/${item.uuid}/edit`"
        >
          <i
            class="pi pi-pencil cursor-pointer"
          />
        </NuxtLinkLocale>

        <i
          class="pi pi-trash cursor-pointer"
          @click="($event) => confirmDelete($event, item.uuid)"
        />
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  confirm_delete: Do you want to delete this competition?
</i18n>
<template>
  <v-card>
    <v-list nav>
      <v-list-item
        v-for="item in competitionStore.competitions"
        :key="item.uuid"
        :title="item.name || item.uuid"
        :to="localePath(`/competition/${item.uuid}`)"
      >
        <template #append>
          <v-btn
            variant="text"
            icon="mdi-pencil"
            color="primary"
            :to="localePath(`/competition/${item.uuid}/edit`)"
          />

          <v-btn
            variant="text"
            icon="mdi-delete"
            color="red"
            @click.prevent="itemToDelete = item"
          />
        </template>
      </v-list-item>
    </v-list>

    <v-dialog
      v-model="isDialogVisible"
      width="500"
    >
      <template #default>
        <v-card>
          <v-card-title>Confirm delete</v-card-title>

          <v-card-text>{{ t('confirm_delete', [itemToDelete?.name]) }}</v-card-text>

          <v-card-actions>
            <v-btn
              color="red"
              :text="$t('sumbit')"
              :loading="loading"
              @click.prevent="deleteItem"
            />

            <v-btn
              :text="$t('cancel')"
              @click.prevent="itemToDelete = null"
            />
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import type { Competition } from '@prisma/client';
import { useCompetitionStore } from '@/stores/competition';

const { t } = useI18n({ useScope: 'local' });
const localePath = useLocalePath();
const competitionStore = useCompetitionStore();

onMounted(() => {
  if (!competitionStore.competitions.length) {
    competitionStore.getCompetitions();
  }
});

const itemToDelete = ref<Competition | null>(null);
const isDialogVisible = computed(() => !!itemToDelete.value);

const loading = ref(false);

async function deleteItem() {
  loading.value = true;
  await competitionStore.deleteCompetition(itemToDelete.value?.uuid || '');
  loading.value = false;
  itemToDelete.value = null;
}
</script>

<i18n lang="yaml">
en:
  confirm_delete: Do you want to delete {0}?
</i18n>

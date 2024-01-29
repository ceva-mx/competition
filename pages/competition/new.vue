<template>
  <v-card>
    <v-card-title>{{ transateLocal('title') }}</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          v-model="name"
          :rules="rules.name"
          :label="transateLocal('name_label')"
        />

        <v-text-field
          v-model="link"
          :label="transateLocal('link_label')"
        />

        <v-file-input
          label="File input"
        />

        <v-textarea
          :label="transateLocal('description_label')"
          :placeholder="transateLocal('description_placeholder')"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        type="submit"
        color="success"
        :text="transateGlobal('submit')"
        :loading="loading"
        @click.prevent="createCompetition"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition';

const competitionStore = useCompetitionStore();

const { transateLocal, transateGlobal } = useLocalization();
const name = ref('');
const link = ref('');
const description = ref('');
const loading = ref(false);

const rules = {
  name: [
    (value: string) =>{
      if (value) {
        return true;
      }

      return transateLocal('error.name');
    },
  ],
};

async function createCompetition() {
  loading.value = true;

  await competitionStore.createCompetition({
    name: name.value,
    link: link.value,
    description: description.value,
  });

  loading.value = false;
}
</script>

<i18n lang="yaml">
en:
  title: Create new competition
  name_label: Competition name
  link_label: Permanent link
  description_label: Description
  description_placeholder: Type some description about this competition

  error:
    name: You must enter a competition name
</i18n>

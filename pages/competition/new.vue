<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition';

const competitionStore = useCompetitionStore();
const { onFileUpload } = useUseFileUpload(); 

const { t } = useI18n({ useScope: 'local' });
const name = ref('');
const link = ref('');
const description = ref('');
const loading = ref(false);

const rules = {
  name: [
    (value: string) =>{
      if (value) return true

      return t('error.name');
    }
  ],
};

async function createCompetition() {
  loading.value = true;

  await competitionStore.createCompetition({
    name: name.value,
    link: link.value,
    description: description.value,
    posterUrl: '',
  });

  loading.value = false;
}
</script>

<template>
  <v-card>
    <v-card-title>{{ t('title') }}</v-card-title>

    <v-card-text>
      <v-form>
        <v-text-field
          v-model="name"
          :rules="rules.name"
          :label="t('name_label')"
        />

        <v-text-field
          v-model="link"
          :label="t('link_label')"
        />

        <v-file-input
          label="File input"
        />

        <v-textarea
          :label="t('description_label')"
          :placeholder="t('description_placeholder')"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        type="submit"
        color="success"
        :text="$t('submit')"
        :loading="loading"
        @click.prevent="createCompetition"
      />
    </v-card-actions>
  </v-card>
</template>

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
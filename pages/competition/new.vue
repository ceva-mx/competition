<script setup lang="ts">
import { useCompetitionStore } from '@/stores/competition';

const competitionStore = useCompetitionStore();
const { onFileUpload } = useUseFileUpload(); 

const { t } = useI18n({ useScope: 'local' });
const name = ref('');
const link = ref('');
const description = ref('');

function createCompetition() {
  competitionStore.createCompetition({
    name: name.value,
    link: link.value,
    description: description.value,
    posterUrl: '',
  });
}
</script>

<template>
  <div class="">
    <form
      class="flex flex-col gap-y-4"
      @submit.prevent="createCompetition"
    >
      <v-text-field
        v-model="name"
        :placeholder="t('name_placeholder')"
      />

      <v-text-field
        v-model="link"
        :placeholder="t('link_placeholder')"
      />

      <FileUpload
        mode="basic"
        name="demo[]"
        url="/api/upload"
        accept="image/*"
        :maxFileSize="1000000"
        @upload="onFileUpload"
      />


      <div>
        <ClientOnly>
          <Editor
            v-model="description"
            :placeholder="t('description_placeholder')"
          />
        </ClientOnly>
      </div>

      <Button>{{ $t('submit') }}</Button>
    </form>
  </div>
</template>

<i18n lang="yaml">
en:
  name_placeholder: Competition name
  link_placeholder: Permanent link
  description_placeholder: Type some description about this competition
</i18n>
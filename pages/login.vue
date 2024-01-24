<template>
  <div class="d-flex justify-center">
    <div
      class="d-flex flex-column gr-2"
      style="width: 250px"
    >
      <v-btn
        class="bg-black"
        prepend-icon="mdi-github"
        :text="t('github')"
        @click="loginWithGithub"
      />

      <v-btn
        prepend-icon="mdi-google"
        :text="t('google')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLoginProvider } from '@/composables/useLoginProvider';

definePageMeta({
  layout: 'login',
});

const { t } = useI18n({ useScope: 'local' });
const { loginWithGithub } = useLoginProvider();
</script>

<i18n lang="yaml">
en:
  github: Continue with Github
  google: Continue with Google
</i18n>

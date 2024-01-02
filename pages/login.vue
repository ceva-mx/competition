<script lang="ts" setup>
const { t } = useI18n({ useScope: 'local' });
import { useLoginProvider } from '@/composables/useLoginProvider';

definePageMeta({
  layout: 'login',
});

const { loginWithGithub } = useLoginProvider();
</script>

<template>
  <div class="flex flex-col w-64 gap-y-2">
    <PrimeButton
      class="bg-black"
      icon="pi pi-github"
      :label="t('github')"
      @click="loginWithGithub"
    />

    <PrimeButton
      icon="pi pi-google"
      :label="t('google')"
    />
  </div>
</template>

<i18n lang="yaml">
en:
  github: Continue with Github
  google: Continue with Google
</i18n>
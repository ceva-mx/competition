<template>
  <div>
    <v-snackbar
      v-model="isStackbarVisible"
      :text="snackbar"
      :timeout="2000"
      location="top right"
    />

    <div class="d-flex justify-center">
      <div class="d-flex flex-column gr-2 login-providers">
        <v-btn
          class="bg-black"
          prepend-icon="mdi-github"
          :text="transateLocal('github')"
          @click="onLogin('github')"
        />

        <v-btn
          prepend-icon="mdi-google"
          :text="transateLocal('google')"
          @click="onLogin('google')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Provider } from '@supabase/gotrue-js';

import { useLoginProvider } from '@/composables/useLoginProvider';

definePageMeta({
  layout: 'login',
});

const { transateLocal } = useLocalization();
const { login } = useLoginProvider();

const snackbar = ref<string>('');
const isStackbarVisible = ref(false);

async function onLogin(provider: Provider) {
  const { isSuccess, message } = await login(provider);

  if (!isSuccess && message) {
    snackbar.value = message;
    isStackbarVisible.value = true;
  }
}
</script>

<style>
.login-providers {
  width: 250px;
}
</style>

<i18n lang="yaml">
en:
  github: Continue with Github
  google: Continue with Google
</i18n>

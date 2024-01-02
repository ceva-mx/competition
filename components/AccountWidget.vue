<script lang="ts" setup>
import { useUserInfo } from '@/composables/useUserInfo';
import { useLoginProvider } from '@/composables/useLoginProvider';

const { user, userName } = useUserInfo(); 
const { t } = useI18n({ useScope: 'local' });
const { logout } = useLoginProvider();

const loginDialogVisible = ref(false);
</script>

<template>
  <div>
    <div
      v-if="user"
      class="flex items-center"
    >
      <UserAvatar class="mr-2" />

      <div class="flex flex-col items-end">
        <span class="text-white">{{ userName }}</span>
        <span
          class="hover:underline cursor-pointer text-xs text-gray-400	"
          @click="logout"
        >Logout</span>
      </div>
    </div>

    <div v-else>
      <NuxtLinkLocale
        to="/login"
        v-slot="{ href, navigate }"
        custom
      >
        <a
          v-ripple
          :href="href"
          @click="navigate"
          v-text="t('login')"
        />
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<style scoped></style>

<i18n lang="yaml">
en:
  login: Login
</i18n>
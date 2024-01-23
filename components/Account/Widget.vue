<template>
  <div>
    <AccountMenu v-if="userStore.user" />

    <div v-else>
      <NuxtLinkLocale
        v-slot="{ href, navigate }"
        to="/login"
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

<script lang="ts" setup>
const userStore = useUserStore();
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="yaml">
en:
  login: Login
</i18n>

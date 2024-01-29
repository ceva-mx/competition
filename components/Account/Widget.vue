<template>
  <div>
    <AccountMenu v-if="userStore.isUserLoggegIn" />

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
          v-text="transateLocal('login')"
        />
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const { transateLocal } = useLocalization();
</script>

<i18n lang="yaml">
en:
  login: Login
</i18n>

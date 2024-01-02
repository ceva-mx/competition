<script lang="ts" setup>
import type { AccountWidget } from '#build/components';

const { t } = useI18n({useScope: 'local'});

const links = ref([
  { to: '/', label: t('home') },
  { to: '/overview', label: t('overview') },
]);
</script>

<template>
  <PrimeMenubar class="prime-menubar" :model="links">
    <template #item="{ item, props }">
      <NuxtLinkLocale
        :key="item.to"
        :to="item.to"
        v-slot="{ href, navigate }"
        custom
      >
        <a
          v-ripple
          :href="href"
          v-bind="props.action"
          @click="navigate"
          v-text="item.label"
        />
      </NuxtLinkLocale>
    </template>

    <template #end>
      <ClientOnly>
        <AccountWidget />  
      </ClientOnly>
    </template>
  </PrimeMenubar>
</template>

<style scoped>
.prime-menubar {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
</style>

<i18n lang="yaml">
en:
  home: Home
  overview: Overview
</i18n>


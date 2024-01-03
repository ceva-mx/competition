<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
</script>

<template>
  <div>
    <div class="flex justify-end mb-4">
      <PrimeButton
        :label="t('create_event')"
        icon="pi pi-plus-circle"
      />
    </div>

    <EventList />
  </div>
</template>

<i18n lang="yaml">
en:
  create_event: Create event
</i18n>

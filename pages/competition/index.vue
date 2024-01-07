<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
const localePath = useLocalePath()
</script>

<template>
  <div>
    <div class="flex justify-end mb-4">
      <v-btn
        :to="localePath('/competition/new')"
        :text="t('create_event')"
      />
    </div>

    <CompetitionsList />
  </div>
</template>

<i18n lang="yaml">
en:
  create_event: Create event
</i18n>

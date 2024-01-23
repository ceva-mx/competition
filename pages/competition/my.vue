<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col align="end">
          <v-sheet>
            <v-btn
              :to="localePath('/competition/new')"
              :text="t('create_event')"
            />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <CompetitionsList />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' });
const localePath = useLocalePath();
</script>

<i18n lang="yaml">
en:
  create_event: Create event
</i18n>

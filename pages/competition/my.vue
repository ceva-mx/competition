<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col align="end">
          <v-sheet>
            <v-btn
              :to="localePath('/competition/new')"
              :text="transateLocal('create_event')"
            />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <CompetitionsList />
  </div>
</template>

<script setup lang="ts">
const { localePath, transateLocal } = useLocalization();
</script>

<i18n lang="yaml">
en:
  create_event: Create event
</i18n>

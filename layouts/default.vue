<template>
  <v-layout>
    <v-app-bar>
      <template #append>
        <v-btn
          :to="localePath('/')"
          :exact="true"
          :text="transateLocal('home')"
        />

        <v-btn
          class="ms-1"
          :to="localePath('/competition')"
          :exact="true"
          :text="transateLocal('competition')"
        />

        <v-divider
          class="mx-2 my-auto ms-2 me-3"
          inset
          vertical
        />

        <account-widget />
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-sheet>
              <slot />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
const { localePath, transateLocal } = useLocalization();
</script>

<i18n lang="yaml">
en:
  home: Home
  overview: Overview
  competition: Competitions
  login: Login
</i18n>

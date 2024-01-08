<script lang="ts" setup>
const { t } = useI18n({useScope: 'local'});
const localePath = useLocalePath()
</script>

<template>
  <v-layout>
    <v-app-bar
    >
      <template #append>
        <v-btn
          :to="localePath('/')"
          :exact="true"
          :text="t('home')"
        />

        <v-btn
          class="ms-1"
          :to="localePath('/competition')"
          :exact="true"
          :text="t('competition')"
        />

        <v-divider
          class="mx-2 my-auto ms-2 me-3"
          inset
          vertical
        />

        <v-btn
          color="primary"
          variant="outlined"
          class="text-none"
        >
          <span>{{ t('login') }}</span>
          <template v-slot:append>
            <v-icon
              color="primary"
              icon="mdi-login"
            />
          </template>
        </v-btn>
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

<style scoped></style>

<i18n lang="yaml">
  en:
    home: Home
    overview: Overview
    competition: Competitions
    login: Login
  </i18n>
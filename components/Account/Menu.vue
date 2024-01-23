<template>
  <v-menu>
    <template #activator="{ props }">
      <v-avatar
        v-ripple
        v-bind="props"
        :image="userStore.avatar"
        size="36px"
        class="cursor-pointer"
      />
    </template>
        
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <h3>{{ userStore.name }}</h3>

          <p class="text-caption mt-1">
            <span>{{ userStore.email }}</span>
          </p>

          <v-divider class="my-3" />

          <NuxtLinkLocale
            v-slot="{ href }"
            to="/competition/my"
            custom
          >
            <v-btn
              rounded
              :to="{ path: href }"
              variant="text"
              :text="t('my_competition')"
            />
          </NuxtLinkLocale>

          <v-divider class="my-3" />

          <v-btn
            rounded
            variant="text"
            @click="logout"
          >
            Logout
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const userStore = useUserStore();

const { logout } = useLoginProvider();
const { t } = useI18n({ useScope: 'local' });
</script>

<i18n lang="yaml">
en:
  my_competition: My competitions
</i18n>
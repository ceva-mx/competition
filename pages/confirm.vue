<template>
  <div class="d-flex align-center justify-center">
    <span>Waiting for login...</span>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login',
});

const user = useSupabaseUser();
const { query } = useRoute();
const userStore = useUserStore();

watch(user, async () => {
  if (user.value) {
    await userStore.login();

    const to = (query.redirectTo as string) ?? '/';

    return navigateTo(to, { replace: true });
  }
}, { immediate: true });
</script>

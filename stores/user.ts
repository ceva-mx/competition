import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref();
  const isUserLoggegIn = computed(() => !!user.value);

  async function login() {
    user.value = await $fetch('/api/user/login');
  }

  onMounted(() => {
    if (!user.value) {
      login();
    }
  });

  return {
    user,
    isUserLoggegIn,

    login,
  };
});

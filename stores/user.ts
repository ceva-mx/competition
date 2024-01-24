import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref();
  const isUserLoggegIn = computed(() => !!user.value);

  async function login() {
    const prismaUser = await $fetch('/api/user/login');

    user.value = prismaUser;
  }

  onMounted(() => {
    login();
  });

  return {
    user,
    isUserLoggegIn,

    login,
  };
});

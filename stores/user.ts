import { defineStore } from 'pinia';

import type { user, profile } from '@prisma/client';

export type Profile = Omit<user & profile, 'uuid' | 'createdAt'> | null;

export const useUserStore = defineStore('user', () => {
  const supabaseUser = useSupabaseUser();
  const profile = ref<Profile>(null);

  watch(supabaseUser, async () => {
    profile.value = await $fetch('/api/user');
  });

  // const user = computed<User>(() => {
  //   if (supabaseUser.value?.email) {
  //     return {
  //       avatar: supabaseUser.value?.user_metadata?.avatar_url || '',
  //       name: supabaseUser.value?.user_metadata?.user_name || '',
  //       email: supabaseUser.value?.email || '',
  //     }
  //   }

  //   return null;
  // });

  async function creatuUserIfNotExist() {
    // if (email.value) {
    //   const user = await $fetch('/api/user');
    //   console.log('user', user);
      
    // }

    // const newUser: NewUser = {
    //   name: name.value,
    //   email: email.value,
    // };
  
    // await useFetch('/api/user', {
    //   method: 'post',
    //   body: newUser,
    // });
  }

  const user = ref(null);

  return {
    user,
    profile,

    creatuUserIfNotExist,
  };
})

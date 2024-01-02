export const useUserInfo = () => {
  const user = useSupabaseUser();
  const avatar = computed((): string => user.value?.user_metadata?.avatar_url || '');
  const userName = computed((): string => user.value?.user_metadata?.user_name || '');

  return {
    user,
    avatar,
    userName,
  };
};

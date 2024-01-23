export const useLoginProvider = () => {
  const { auth } = useSupabaseClient();
  const userStore = useUserStore();

  const loginWithGithub = async () => {
    const { error } = await auth.signInWithOAuth({
      provider: 'github',
    });

    if (!error) {
      userStore.creatuUserIfNotExist();
    } else {
      console.warn(error);
    }
  };

  const logout = async () => {
    const { error } = await auth.signOut();

    if (error) {
      console.warn(error);
    }
  };

  return {
    loginWithGithub,
    logout,
  };
};

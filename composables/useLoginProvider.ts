export const useLoginProvider = () => {
  const { auth } = useSupabaseClient();

  const loginWithGithub = async () => {
    const { error } = await auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
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

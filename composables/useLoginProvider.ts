export const useLoginProvider = () => {
  const { auth } = useSupabaseClient();

  const loginWithGithub = async () => {
    const { error } = await auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/confirm',
      },
    });

    if (error) {
      throw createError({
        statusCode: 401,
        statusMessage: error.message,
      });
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

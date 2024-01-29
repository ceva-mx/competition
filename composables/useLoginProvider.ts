import type { Provider } from '@supabase/gotrue-js';

type LoginResult = {
  isSuccess: boolean,
  message?: string,
};

const supportedProviders = [
  'github',
];

export const useLoginProvider = () => {
  const { auth } = useSupabaseClient();

  async function login(provider: Provider): Promise<LoginResult> {
    if (!supportedProviders.includes(provider)) {
      return {
        isSuccess: false,
        message: `Login provider for ${provider} is not implemented yet!`,
      };
    }

    const { error } = await auth.signInWithOAuth({
      provider,
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

    return { isSuccess: true };
  }

  const logout = async () => {
    const { error } = await auth.signOut();

    if (error) {
      console.warn(error);
    }
  };

  return {
    login,
    logout,
  };
};

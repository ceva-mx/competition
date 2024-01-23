export default defineNuxtRouteMiddleware(async (to) => {
  const { data: hasAccess } = await useFetch(
    '/api/user/hasAccess',
    {
      headers: useRequestHeaders(['cookie']),
    }
  );

  if (hasAccess.value) {
    return;
  }

  return navigateTo(`/login?redirectTo=${to.path}`);
});
export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession();

  if (!loggedIn.value) {
    return navigateTo('/admin')
  }

  if (user.value?.rol !== "Staff") {
    throw createError({ statusCode: 403, message: "Acceso Denegado" });
  }
});
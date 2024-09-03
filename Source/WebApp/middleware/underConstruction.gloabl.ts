export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path == "/") {
    return navigateTo("/fixedcosts");
  }

  if (to.meta["underConstruction"]) {
    return navigateTo("/construction");
  }

  return navigateTo(to);
});

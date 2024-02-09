export default defineNuxtRouteMiddleware((to, from) => {
    if(to.meta["underConstruction"]){
        return navigateTo("/construction")
    };
    return navigateTo(to)
})
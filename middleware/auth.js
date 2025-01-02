export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $swal } = useNuxtApp();

  if (process.client) {
 

    return true;
  }
});

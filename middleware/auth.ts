import { authStore } from '@/store/auth';
const auth_store = authStore();
import { breadcrumbsStore } from '@/store/breadcrumbs';
const store_breadcrumbs = breadcrumbsStore();
const { setBreadcrumbs } = store_breadcrumbs;

export default defineNuxtRouteMiddleware((to, from) => {
    const user = auth_store.getUsuario;
    if (!user) {
        setBreadcrumbs([[ '8', 'Login', '/login','Página de Login' ]]);
      return navigateTo('/login');
    }
  });
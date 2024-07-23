import type { RouteLocationNormalized } from 'vue-router';

export const useRedirectDomain = async (fromDomain: string, toDomain: string, route: RouteLocationNormalized) => {
  const domain = useRequestURL().hostname;

  if (domain.includes(fromDomain)) {
    const redirectUrl = `https://${toDomain}${route.fullPath}`;

    await navigateTo(redirectUrl, {
      external: true,
      redirectCode: 301,
    });
  }
};

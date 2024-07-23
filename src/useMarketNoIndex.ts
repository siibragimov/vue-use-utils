export const useMarketNoIndex = () => {
  const { currentRoute } = useRouter();

  if (currentRoute.value.params.groupSlug) {
    useHead({
      meta: [{ name: 'robots', content: 'noindex, follow' }],
    });
  }
};

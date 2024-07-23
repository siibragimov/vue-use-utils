import { useDomainStore } from '~/store/domain';

export const useGoogleTag = (): void => {
  const { grantConsent } = useGtag();
  const domainStore = useDomainStore();

  if (domainStore.domain?.googleTagManagerId) {
    grantConsent(domainStore.domain?.googleTagManagerId);
  }
};

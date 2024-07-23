import type { UseSeoMetaInput } from '@unhead/vue';

export const usePageMetaSocial = ({
  title,
  description,
  imageUrl,
  imageAlt,
  siteUrl,
  twitterAccount,
}: {
  title: ComputedRef<Maybe<string>>;
  description: ComputedRef<Maybe<string>>;
  imageUrl: ComputedRef<Maybe<string>>;
  imageAlt: ComputedRef<string>;
  siteUrl: ComputedRef<Maybe<string>>;
  twitterAccount: ComputedRef<Maybe<string>>;
}): UseSeoMetaInput => ({
  title,
  description,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterSite: twitterAccount,
  twitterDescription: description,
  twitterImage: imageUrl.value
    ? {
        url: imageUrl.value,
        alt: imageAlt.value,
      }
    : null,
  ogType: 'website',
  ogTitle: title,
  ogUrl: siteUrl,
  ogImage: imageUrl.value
    ? {
        url: imageUrl.value,
        width: 800,
        height: 800,
        alt: imageAlt.value,
      }
    : null,
  ogDescription: description,
});

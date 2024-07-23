import type { Article } from '~/types';
import { defineArticle, defineOrganization, defineWebPage, defineWebSite, useSchemaOrg } from '@unhead/schema-org';

export const usePageMeta = (props?: {
  categoryTitle?: string;
  metaDescription?: string;
  article?: Maybe<Article.Model>;
}): void => {
  const { article } = props ?? {};
  const { currentRoute } = useRouter();

  const {
    title,
    description,
    descriptionFull,
    imageUrl,
    imageAlt,
    siteUrl,
    twitterAccount,
    siteName,
    domainMetaDescription,
    domainMetaTitle,
    domainMetaKeywords,
  } = usePageMetaData(props);

  useHead({
    title,
    titleTemplate: (chunk?: string) => {
      const currentTitle = article?.id ? 'SportsFeedHQ' : domainMetaTitle.value || siteName.value;

      return [chunk, currentTitle].filter(Boolean).join(' - ');
    },
    meta: [
      {
        name: 'keywords',
        content: domainMetaKeywords.value || '',
      },
    ],
  });

  useSeoMeta(
    usePageMetaSocial({
      title,
      description: description.value || domainMetaDescription.value,
      imageUrl,
      imageAlt,
      siteUrl,
      twitterAccount,
    })
  );

  useSchemaOrg([
    defineOrganization({
      name: siteName.value ?? '',
      url: siteUrl.value ?? '',
    }),
    defineWebSite({
      name: title.value ?? siteName.value ?? '',
      description: description.value ?? '',
      url: siteUrl.value ?? '',
    }),
    defineWebPage({
      name: title.value,
      description: description.value ?? '',
      url: `${siteUrl.value}${currentRoute.value.fullPath}`,
    }),
  ]);

  if (article) {
    useSchemaOrg([
      defineWebPage({
        image: imageUrl.value ?? '',
      }),
      defineArticle({
        headline: article.title,
        description: descriptionFull.value || domainMetaDescription.value || '',
        image: imageUrl.value || '',
        url: `${siteUrl.value}${currentRoute.value.fullPath}`,
        datePublished: article.publicationDateAt,
        dateModified: article.updatedAt,
      }),
    ]);
  }

  useCanonical({ article });
};

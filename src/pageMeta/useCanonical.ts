import type { Article } from '@thesix/dashboard-api/src/runtime/types';
import { useDomainStore } from '~/store/domain';

export const useCanonical = (params?: { article?: Maybe<Article.Model> }) => {
  const { article } = params ?? {};
  const domainStore = useDomainStore();
  const { currentRoute } = useRouter();

  const {
    path,
    params: { sportSlug, teamAbbreviation: teamSlug, groupSlug, category },
  } = currentRoute.value;

  const { permalink: articleLink = null } = article ? useArticleLinks(article) : {};

  const sportPath = sportSlug ? useSportRoute(sportSlug.toString()) : '';
  const groupPath = groupSlug ? useGroupRoute(groupSlug.toString()) : '';
  const teamPath = teamSlug ? useTeamRoute(teamSlug.toString()) : '';
  const articlePath = article ? useRouter().resolve(articleLink?.value ?? '').fullPath : '';
  const categoryPath = category ? useGetBaseUrl()(useSectionRoute(category?.toString() as Article.PublicType)) : '';

  const uniqPath = article
    ? articlePath
    : category
    ? categoryPath
    : groupSlug
    ? [groupPath, sportPath, teamPath].filter(Boolean).join('')
    : sportSlug
    ? [sportPath, teamPath].filter(Boolean).join('')
    : teamSlug
    ? teamPath
    : path;

  useHead(() => ({
    link: [
      {
        rel: 'canonical',
        href: `https://${domainStore.domain?.name}${uniqPath}`,
      },
    ],
  }));
};

import type { Article } from '~/types';
import type { Group } from '@thesix/dashboard-api/src/runtime/types';
import { useDomainStore } from '~/store/domain';

const DIVIDER = ' - ' as const;

export const usePageMetaData = (props?: {
  categoryTitle?: string;
  metaDescription?: string;
  article?: Maybe<Article.Model>;
}) => {
  const { categoryTitle, metaDescription, article } = props ?? {};
  const { currentRoute } = useRouter();
  const { teamAbbreviation, sportSlug, groupSlug } = currentRoute.value.params;
  const domainStore = useDomainStore();
  const { team } = useTeamData();
  const sports = useMenuSportItems(domainStore.domain?.teams ?? []);

  const siteName = computed<Maybe<string>>(() => domainStore.domain?.siteName || null);
  const domainMetaTitle = computed<string>(() => domainStore.domain?.metaTitle || '');
  const domainMetaKeywords = computed<string>(() => domainStore.domain?.metaKeywords || '');
  const groupName = computed<string>(() => domainStore.domain?.groupingName || 'Markets');

  const domainMetaDescription = computed<string>(
    () => [team.value?.sportTitle, domainStore.domain?.metaDescription].filter(Boolean).join(DIVIDER) || ''
  );

  const sportName = computed<Maybe<string>>(
    () => sports.find((sport) => sport.props?.key === sportSlug)?.props?.title || null
  );

  const groupItem = computed<Maybe<Group.Model>>(
    () => domainStore.domain?.teamGroups?.find((group) => group.slug === groupSlug) || null
  );

  const getTitleResultByParts = (parts: Maybe<string | undefined>[]): string => {
    const categoryTitlePart = article?.id ? useBlockTitle(article?.articleType) : categoryTitle;

    return [article?.title, categoryTitlePart, ...parts].filter(Boolean).join(DIVIDER);
  };

  const title = computed<string>(() => {
    const rootCategoryTitlePieces =
      currentRoute.value.name === 'index'
        ? []
        : teamAbbreviation
        ? [team.value?.name, team.value?.sportName]
        : sportSlug
        ? [sportName.value]
        : groupSlug
        ? [groupItem.value?.name, groupName.value]
        : [];

    return getTitleResultByParts(rootCategoryTitlePieces);
  });

  const titleShort = computed<string>(() => {
    const rootCategoryTitlePieces =
      currentRoute.value.name === 'index'
        ? []
        : teamAbbreviation
        ? [team.value?.name, team.value?.sportTitle]
        : sportSlug
        ? [sportName.value]
        : groupSlug
        ? [groupItem.value?.name, groupName.value]
        : [];

    return getTitleResultByParts(rootCategoryTitlePieces);
  });

  const descriptionFull = computed<Maybe<string>>(
    () => metaDescription || (article?.content ? useStripTags(article?.content) : null)
  );

  const description = computed<Maybe<string>>(() => descriptionFull.value?.split(' ')?.slice(0, 50).join(' ') || null);

  const imageUrl = computed<Maybe<string>>(
    () =>
      article?.headerImage?.mediumUrl ||
      team.value?.teamLogo?.thumbnailUrl ||
      groupItem.value?.groupLogoUrl ||
      domainStore.domain?.teamLogo ||
      null
  );

  const imageAlt = computed<string>(() => useTextShort(title.value) || title.value);

  const twitterAccount = computed<Maybe<string>>(() => {
    const accountName: Maybe<string> = domainStore.domain?.twitterUrl?.split('/').filter(Boolean).pop() || null;
    return accountName ? `@${accountName}` : null;
  });

  const siteUrl = computed<Maybe<string>>(() =>
    domainStore.domain?.name ? `https://${domainStore.domain?.name}` : null
  );

  return {
    title,
    titleShort,
    description,
    descriptionFull,
    imageUrl,
    imageAlt,
    siteUrl,
    twitterAccount,
    siteName,
    domainMetaTitle,
    domainMetaDescription,
    domainMetaKeywords,
  };
};

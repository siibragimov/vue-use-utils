import type { Article } from '~/types';
import { useSchemaOrg, defineItemList, defineListItem } from '@unhead/schema-org';

export const usePageMetaArticleList = (props?: { articleList?: Ref<Maybe<Article.Model[]>> }): void => {
  const { articleList } = props ?? {};
  const { siteUrl } = usePageMetaData();
  const router = useRouter();
  const { getPermalink } = useArticleLinks();

  if (articleList?.value?.length) {
    useSchemaOrg([
      defineItemList({
        itemListElement: articleList.value.map((article, index) => ({
          '@type': 'ListItem',
          ...defineListItem({
            position: index + 1,
            url: `${siteUrl.value}${router.resolve(getPermalink(article)).fullPath}`,
            name: article.title,
          }),
        })),
      }),
    ]);
  }
};

export const useStripTags = (html: string) => html.replace(/(<([^>]+)>)/gi, '');

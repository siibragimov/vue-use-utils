export const useTextFormatsConvert = () => {
  const textToHtml = (text: string) => {
    return text.replace(/\n/g, '<br>');
  };

  const replaceBr = (text: string, replaceValue = '') => text.replace(/<br\s*\/?>/gi, replaceValue);

  const htmlToText = (html: string): string => {
    // Replace <p>, <h1>, <h2>, <h3> tags with newlines
    html = html.replace(/<\/p>|<\/h1>|<\/h2>|<\/h3>/gi, '\n');

    // Replace <br> tags with newlines
    html = replaceBr(html, '\n');

    // Create a new DOM parser
    const parser: DOMParser = new DOMParser();

    // Parse the HTML string
    const doc: Document = parser.parseFromString(html, 'text/html');

    // Use the textContent property to get the plain text content of the HTML
    return doc.body.textContent || '';
  };

  return { textToHtml, htmlToText, replaceBr };
};

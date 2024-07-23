export const useTextShort = (text?: string, maxLength = 99): string | undefined => {
  const cutLn = maxLength - 3;

  return (text?.length ?? 0) < maxLength ? text : `${text?.slice(0, cutLn).trim()}...`;
};

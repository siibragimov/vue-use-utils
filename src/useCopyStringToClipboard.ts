export const useCopyStringToClipboard = async (value: string) =>
  navigator.clipboard.writeText(value).then(
    () => true,
    () => false
  );

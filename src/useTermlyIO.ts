import { useScriptTag } from '@vueuse/core';

export const useTermlyIO = () => {
  const runtimeConfig = useRuntimeConfig();
  useScriptTag(`https://app.termly.io/resource-blocker/${runtimeConfig.public.termlyIoApiKey}?autoBlock=on`);
};

import { useScriptTag } from '@vueuse/core';

export const useGoogleAdSense = () => {
  const runtimeConfig = useRuntimeConfig();
  useScriptTag(
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
      runtimeConfig.public.adSenseId || 'ca-pub-4708315842295573'
    }`,
    (el: HTMLScriptElement) => {
      el.setAttribute('crossorigin', 'anonymous');
    }
  );
};

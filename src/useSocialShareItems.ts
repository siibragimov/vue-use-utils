import type { ShareItem } from '~/types';

export const useSocialShareItems = (): ShareItem[] => {
  const currentURL = useRequestURL().href;
  const title = typeof document === 'object' ? document.title : '';

  return [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(currentURL)}`,
      label: 'Share on Facebook',
      icon: 'line-md:facebook',
      target: 'sharer',
      features: 'toolbar=1,status=1',
    },
    {
      name: 'X',
      url: `https://x.com/share?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(title)}`,
      label: 'Share on X',
      icon: 'line-md:twitter-x-alt',
      target: 'sharer',
      features: 'toolbar=1,status=1,menubar=1',
    },
    {
      name: 'Mail',
      url: `mailto:?&subject=${title}&body=${title} ${encodeURIComponent(currentURL)}`,
      label: 'Share by Mail',
      icon: 'line-md:email',
    },
  ];
};

export const useScrollTop = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  window.scrollTo(0, 0);
};

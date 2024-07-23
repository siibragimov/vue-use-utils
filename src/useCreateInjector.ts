export function createInjector<T>(key: InjectionKey<T>) {
  return (): T => {
    const injection = inject(key);

    if (!injection) {
      throw new Error(`Injection ${key.toString()} not found!`);
    }

    return injection;
  };
}

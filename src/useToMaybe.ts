export const useToMaybe = <T>(arg?: Maybe<T>): Maybe<T> => (arg !== undefined ? arg : null);

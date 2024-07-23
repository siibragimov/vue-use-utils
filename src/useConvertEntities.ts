import type { CamelCasedProperties, SnakeCasedProperties } from '../../types';

export const useToCamelCase = <T extends string>(str: string): T =>
  str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', '')) as T;

export const useToKebabCaseFromCamelCase = <T extends string>(value: string): T =>
  value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() as T;

export const useToKebabCaseFromSnakeCase = <T extends string>(value: string): T =>
  value.toLowerCase().replaceAll('_', '-') as T;

export const useToSnakeCaseFromKebabCase = <T extends string>(value: string): T =>
  value.toLowerCase().replaceAll('-', '_') as T;

export const useCapitalizeFirstLetter = <T extends string>(value: string): T =>
  `${value.charAt(0).toUpperCase()}${value.slice(1)}` as T;

export const useKeysToCamelCase = <T>(obj: T): CamelCasedProperties<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) => useKeysToCamelCase(v)) as unknown as CamelCasedProperties<T>;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [useToCamelCase(key)]: useKeysToCamelCase((obj as any)[key]),
      }),
      {} as CamelCasedProperties<T>
    );
  }
  return obj as CamelCasedProperties<T>;
};

export const useToSnakeCase = <T extends string>(str: string): T =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) as T;

export const useKeysToSnakeCase = <T>(obj: T): SnakeCasedProperties<T> => {
  if (Array.isArray(obj)) {
    return obj.map((v) => useKeysToSnakeCase(v)) as unknown as SnakeCasedProperties<T>;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [useToSnakeCase(key)]: useKeysToSnakeCase((obj as any)[key]),
      }),
      {} as SnakeCasedProperties<T>
    );
  }
  return obj as SnakeCasedProperties<T>;
};

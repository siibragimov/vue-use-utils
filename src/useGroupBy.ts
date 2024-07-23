export const useGroupBy = <T extends Record<keyof T, unknown>>(items: T[], groupBy: keyof T): Record<string, T[]> =>
  items.reduce((result, item) => {
    const key: string = item[groupBy] as string;

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);

    return result;
  }, {} as Record<string, T[]>);

export function toArray<T>(item?: T | T[]): T[] {
  if (typeof item === 'undefined') {
    return [];
  }

  if (Array.isArray(item)) {
    return item;
  }
  return [item];
}

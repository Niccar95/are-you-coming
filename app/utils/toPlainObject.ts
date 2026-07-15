export function toPlainObject<T>(item: { toJSON(): T }): T {
  return item.toJSON();
}

export function toPlainObjects<T>(items: { toJSON(): T }[]): T[] {
  return items.map((item) => item.toJSON());
}

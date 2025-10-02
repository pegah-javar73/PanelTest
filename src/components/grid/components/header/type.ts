export interface GridHeaderProps<T> {
  columns: Array<{ key: keyof T; title: string }>;
}

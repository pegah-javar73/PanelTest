export interface GridBodyProps<T> {
  data: T[];
  columns: Array<{
    key: keyof T;
    title: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
  }>;
}

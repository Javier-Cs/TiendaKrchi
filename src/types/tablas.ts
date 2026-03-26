export type Column<T> = {
  label: string;
  field?: keyof T;
  render?: (row: T) => string;
};
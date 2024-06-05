export enum Colors {
  Blue = 'blue',
  Brown = 'brown',
  Gray = 'gray',
  Green = 'green',
  Orange = 'orange',
  Pink = 'pink',
  Yellow = 'yellow',
  Purple = 'purple',
  Red = 'red',
}

export type ColorsVariant =
  | `${Colors}`
  | `${Colors}-lighten`
  | `${Colors}-darken`;

export type Themes = 'light' | 'dark';

export interface HasRef<T> {
  getRef?: React.Ref<T>;
}

export interface HasComponent {
  Component?: React.ElementType;
}

export interface HasRootRef<T> {
  getRootRef?: React.Ref<T>;
}

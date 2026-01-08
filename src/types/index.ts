export interface User {
  email: string;
  first_name: string;
  last_name: string;
  avatar_id: string;
  admin: boolean;
  accessToken: string;
  id: number;
}

export interface Paging {
  page: number;
  size: number;
}

export interface LabelValue<T = string, V = string> {
  label: T;
  value: V;
}

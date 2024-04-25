export interface Response<T = unknown> {
  code: number;
  msg: string;
  payload?: T;
}

export interface PaginationPayload<T = unknown> {
  total: number;
  data: T[];
}

export interface Requestparameter {
  user: DecodeToken;
}
export interface Headerparameter {
  lang: string;
  authorization: string;
  createdplatform: string;
}

export interface DecodeToken {
  isActive: boolean;
  phone: string;
  username: string;
  name: string;
  _id: string;
  currency?: string;
}

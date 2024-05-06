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
  authorization: string;
}

export interface DecodeToken {
  _id:string,
  username: string;
}

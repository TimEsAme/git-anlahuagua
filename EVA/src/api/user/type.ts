// // 请求参数

export interface LoginFormData {
  username: string;
  password: string;
}

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface LoginResponseData extends ResponseData {
  data: string;
}

export interface UserInfoResponseData extends ResponseData {
  data: {
    avatar: string;
    name: string;
    buttons: string[];
    roles: string[];
    routes: string[];
  };
}

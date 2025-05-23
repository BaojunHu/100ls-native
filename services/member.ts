import { http } from "./index";

export const memberServices = {
  login: async (param: TMemberLoginParam) => {
    return await http.post<TMemberLoginData>("/login", param);
  },
  register: async (param: TMemberRegisterParam) => {
    return await http.post('/signup', param);

  },
};

// └─ account	String	是	222	手机号
// └─ password	String	是	222	密码
// └─ loginType	String	是	paswd sms	密码登录或者短信登录默认是密码登录

export interface TMemberLoginParam {
  account: string;
  password: string;
  loginType: "paswd" | "sms";
}
export interface TMemberLoginData {
  authToken: string;
}

export interface TMemberRegisterParam {
  account: string;
  password: string;
}

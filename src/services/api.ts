import axios, { AxiosInstance, AxiosResponse } from "axios";
import { md5 } from "../utils/crypto";

// api 列表
export declare interface IAPI {
  getRole: (
    params: IParamsGetRole
  ) => Promise<AxiosResponse<IResponse<IResponseGetRole>>>;
  // 获取所有国家区号
  getCountryCode: () => Promise<AxiosResponse<IResponse<ICountry[]>>>;
  // 登录
  login: (
    params: IParamsLogin,
    role: RoleType
  ) => Promise<AxiosResponse<IResponse<IResponseLogin>>>;
  // 获取待处理订单列表
  getOrderPendingList: (
    params: IParamsGetOrderPendingList
  ) => Promise<AxiosResponse<IResponse<IResponseGetOrderPendingList>>>;
  // 获取历史订单列表
  getOrderHistoryList: (
    params: IParamsGetOrderPendingList
  ) => Promise<AxiosResponse<IResponse<IResponseGetOrderPendingList>>>;
  // userInfo
  getUserInfo: (role: RoleType) => Promise<AxiosResponse<IResponse<IUserInfo>>>;
  sendSms: (params: IParamsSendSms) => Promise<AxiosResponse<IResponse>>;
  // 更新提现密码
  updateWithdrawPassword: (
    params: IParamsUpdateWithdrawPassword,
    role: RoleType
  ) => Promise<AxiosResponse<IResponse>>;
  confirmWithdraw: (
    params: IParamsConfirmWithdraw
  ) => Promise<AxiosResponse<IResponse>>;
}

export function createAPI(services: AxiosInstance): IAPI {
  return {
    // 获取角色 测试角色 承兑商： 18848820304 商户：18848820305 区号: 86
    getRole(params: IParamsGetRole) {
      // getRole永远调用tad.1bitpay.tech
      const services = axios.create({
        baseURL: "https://tad.1bitpay.tech",
      });

      return services.request<IResponse<IResponseGetRole>>({
        url: "/api/common/getRole",
        method: "POST",
        data: params,
      });
    },
    // 获取所有国家区号
    getCountryCode() {
      return services.request<IResponse<ICountry[]>>({
        url: "/api/common/getCountry",
        method: "GET",
      });
    },
    login(params: IParamsLogin, role: RoleType) {
      return services.request<IResponse<IResponseLogin>>({
        url: `/api/${role}/login`,
        method: "POST",
        data: params,
      });
    },
    getOrderPendingList(params: IParamsGetOrderPendingList) {
      return services.request<IResponse<IResponseGetOrderPendingList>>({
        url: "/api/coin/order/pending",
        method: "POST",
        data: params,
      });
    },
    // 获取历史审批 /api/coin/order/history
    getOrderHistoryList(params: IParamsGetOrderPendingList) {
      return services.request<IResponse<IResponseGetOrderPendingList>>({
        url: "/api/coin/order/history",
        method: "POST",
        data: params,
      });
    },
    // 获取用户信息/api/${role}/userInfo
    getUserInfo(role: RoleType) {
      return services.request<IResponse<IUserInfo>>({
        url: `/api/${role}/userInfo`,
        method: "GET",
      });
    },
    // 发送验证码  /api/common/sendSms
    // 请求参数：{
    // "type":"1"   // 业务类型 type=0登陆， type=1 修改提币
    // }
    sendSms(params: IParamsSendSms) {
      return services.request<IResponse>({
        url: `/api/common/sendSms`,
        method: "POST",
        data: params,
      });
    },
    // 更新资金密码 /api/{$role}/update
    // 请求参数：{
    // "withdrawPassword":"123",
    // "code":"1234"
    // }
    updateWithdrawPassword(
      params: IParamsUpdateWithdrawPassword,
      role: RoleType
    ) {
      return services.request<IResponse>({
        url: `/api/${role}/update`,
        method: "POST",
        data: params,
      });
    },
    // 确认转出接口 /api/${role}/confirmWithdraw
    confirmWithdraw(params: IParamsConfirmWithdraw) {
      params.password = md5(params.password);
      return services.request<IResponse>({
        url: `/api/coin/order/confirmWithdraw`,
        method: "POST",
        data: params,
      });
    },
  };
}

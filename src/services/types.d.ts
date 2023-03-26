// copilot: 所有数据格式从 ./json-1.md 转换而来

declare interface IParamsGetRole {
  phoneNumber: string;
  regionCode: string;
}
declare interface IResponse<D = any> {
  code: number;
  data: D;
  msg: string;
}
declare type RoleType = "merchant" | "acceptor";
declare interface IResponseGetRole {
  baseUrl: string;
  role: RoleType;
}
declare interface ICountry {
  id: number;
  zh: string;
  en: string;
  phoneCode: number;
  sort: number;
  location: string;
  phoneCodeStr: string;
}
declare interface IParamsLogin {
  phoneNumber: string;
  regionCode: string;
  code: string;
}
declare interface IResponseLogin {
  uid: string;
  "Auth-Token": string;
}
declare interface Ipages {
  pageNum?: number;
  pageSize?: number;
}
declare interface IParamsGetOrderPendingList extends Ipages {}
declare interface IOrderPending {
  id: number;
  orgId: number;
  accountID: string;
  customerId: string;
  sysId: string;
  acceptorId: string;
  merchantId: string;
  name: string;
  orderNo: string;
  orderType: number;
  currency: string;
  amount: number;
  chain: string;
  hash: string;
  fromAddress: string;
  toAddress: string;
  orderTime: string;
  createTime: number;
  verifyTime: string;
  finishTime: string;
  invokeTime: string;
  orderStatus: number;
}
declare interface IResponseGetOrderPendingList {
  total: number;
  list: IOrderPending[];
}

// {"code":200,"message":"Success","data":{"id":8,"orgId":945,"accountId":"acc1c92b0319ef5b794","privateKey":"","apiKey":"jMmCVrknjmFVefOyMJHIzOIPNWJZmfWmJyoTUongxysXJIzWbc3136ef746c005f","areaCode":"+86","acceptorNo":"acc1c92b0319ef5b794","mobile":"18848820304","name":"Pony","idCard":"4172871928192827182","idCardType":1,"nickName":"Pony","userName":"18848820305","password":null,"cryptoMinAmount":null,"cryptoMaxAmount":null,"rateFloatLimit":0.10,"validTime":null,"withdrawPassword":"123456","blacklist":0,"businessLicenseImages":null,"registerTime":1679643545441,"dealSort":null,"withdrawLastOffset":null,"withdrawThreshold":3000.000000000000000000,"status":1}}
declare interface IUserInfo {
  id: number;
  orgId: number;
  accountId: string;
  privateKey: string;
  apiKey: string;
  areaCode: string;
  acceptorNo: string;
  mobile: string;
  name: string;
  idCard: string;
  idCardType: number;
  nickName: string;
  userName: string;
  password: string;
  cryptoMinAmount: number;
  cryptoMaxAmount: number;
  rateFloatLimit: number;
  validTime: number;
  withdrawPassword: string;
  blacklist: number;
  businessLicenseImages: string;
  registerTime: number;
  dealSort: number;
  withdrawLastOffset: number;
  withdrawThreshold: number;
  status: number;
}

// 发送验证码 参数
declare interface IParamsSendSms {
  phoneNumber: string;
  regionCode: string;
  type: string;
}

// 更新提现密码 参数
declare interface IParamsUpdateWithdrawPassword {
  code: string;
  withdrawPassword: string;
}
declare interface IParamsConfirmWithdraw {
  id: number;
  status: number; // 0 拒绝 1 通过
  password: string;
}

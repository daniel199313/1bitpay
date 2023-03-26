一、baseUrl : http://xxx/

二、公共的响应：
{
"code":200,
"message":"success",
"data":""
}

获取主域名以及角色接口
http://xxx/api/getRole  //这里域名到时候是确定的。调系统服务即可
请求参数：{
"regionCode":"+86",  //区号
"phoneNumber":"18848878919", //手机号
}
响应参数：{
"baseUrl":"xxx" //主域名 业务接口的域名
"role":"acceptor" // acceptor或者merchant  用于替换url里面的角色
}


三、业务接口：
1、登陆：
请求地址:  /api/acceptor/login
请求方式:  post
数据格式:  application/json
请求数据:  {
"regionCode":"+86",  //区号
"phoneNumber":"18848878919", //手机号
"code":"1234" //验证码
}

2、获取所有国家区号接口：
请求地址: /api/common/getCountry
请求方式: get
响应参数:{
"code": 200,
"message": "Success",
"data": [
{
"id": 1,
"zh": "阿富汗",
"en": "Afghanistan",
"phoneCode": 93,
"sort": 0,
"location": "0",
"phoneCodeStr": "+93"
}
]
}

3、交易审批列表
请求地址:  /api/coin/order/pending
请求方式:  get
数据格式:  application/json
请求参数：{"pageNum":1,"pageSize":10}
响应参数：{
"code":200,
"message":"成功",
"data":{"total":3,"list":[{"id":12,"orgId":911,"accountId":"1c92b0319ef5b794","customerId":null,"sysId":null,"acceptorId":5,"merchantId":null,"name":"Pony","orderNo":"dev326755668121882624","orderType":2,"currency":"USDT","amount":20.00000000,"chain":"TRC20","hash":null,"fromAddress":"123123","toAddress":null,"orderTime":null,"createTime":1679386222109,"verifyTime":null,"finishTime":null,"invokeTime":null,"orderStatus":0},{"id":13,"orgId":911,"accountId":"1c92b0319ef5b794","customerId":null,"sysId":null,"acceptorId":5,"merchantId":null,"name":"Pony","orderNo":"dev326757643290939392","orderType":2,"currency":"USDT","amount":20.00000000,"chain":"TRC20","hash":null,"fromAddress":"TXVcGVeq3kMvu9J1CehqvcUWj64LBCnfEJ","toAddress":"200123123","orderTime":null,"createTime":1679386693026,"verifyTime":null,"finishTime":null,"invokeTime":null,"orderStatus":0},{"id":15,"orgId":911,"accountId":"1c92b0319ef5b794","customerId":null,"sysId":null,"acceptorId":5,"merchantId":null,"name":"Pony","orderNo":"dev326759816263372800","orderType":2,"currency":"USDT","amount":10.00000000,"chain":"TRC20","hash":null,"fromAddress":"TXVcGVeq3kMvu9J1CehqvcUWj64LBCnfEJ","toAddress":"12312312","orderTime":null,"createTime":1679387211102,"verifyTime":null,"finishTime":null,"invokeTime":null,"orderStatus":0}],"pageNum":1,"pageSize":3,"size":3,"startRow":0,"endRow":2,"pages":1,"prePage":0,"nextPage":0,"isFirstPage":true,"isLastPage":true,"hasPreviousPage":false,"hasNextPage":false,"navigatePages":8,"navigatepageNums":[1],"navigateFirstPage":1,"navigateLastPage":1,"firstPage":1,"lastPage":1}
}

4、历史审批
请求地址:  /api/coin/order/history
请求方式:  get
数据格式:  application/json
请求参数：{"pageNum":1,"pageSize":10}
响应参数：{
"code":200,
"message":"成功",
"data":{"total":3,"list":[{"id":12,"orgId":911,"accountId":"1c92b0319ef5b794","customerId":null,"sysId":null,"acceptorId":5,"merchantId":null,"name":"Pony","orderNo":"dev326755668121882624","orderType":2,"currency":"USDT","amount":20.00000000,"chain":"TRC20","hash":null,"fromAddress":"123123","toAddress":null,"orderTime":null,"createTime":1679386222109,"verifyTime":null,"finishTime":null,"invokeTime":null,"orderStatus":0},{"id":13,"orgId":911,"accountId":"1c92b0319ef5b794","customerId":null,"sysId":null,"acceptorId":5,"merchantId":null,"name":"Pony","orderNo":"dev326757643290939392","orderType":2,"currency":"USDT","amount":20.00000000,"chain":"TRC20","hash":null,"fromAddress":"TXVcGVeq3kMvu9J1CehqvcUWj64LBCnfEJ","toAddress":"200123123","orderTime":null,"createTime":1679386693026,"verifyTime":null,"finishTime":null,"invokeTime":null,"orderStatus":0},{"id":15,"orgId":911,"accountId":"1c92b0319ef5b794","customerId":null,"sysId":null,"acceptorId":5,"merchantId":null,"name":"Pony","orderNo":"dev326759816263372800","orderType":2,"currency":"USDT","amount":10.00000000,"chain":"TRC20","hash":null,"fromAddress":"TXVcGVeq3kMvu9J1CehqvcUWj64LBCnfEJ","toAddress":"12312312","orderTime":null,"createTime":1679387211102,"verifyTime":null,"finishTime":null,"invokeTime":null,"orderStatus":0}],"pageNum":1,"pageSize":3,"size":3,"startRow":0,"endRow":2,"pages":1,"prePage":0,"nextPage":0,"isFirstPage":true,"isLastPage":true,"hasPreviousPage":false,"hasNextPage":false,"navigatePages":8,"navigatepageNums":[1],"navigateFirstPage":1,"navigateLastPage":1,"firstPage":1,"lastPage":1}
}
5、查询我的信息接口
请求地址:  /api/acceptor/userInfo
请求方式:  get
数据格式:  application/json
响应参数：{
"code":200,
"message":"成功",
"data":{
"nickName":"pony",
"mobile":"139400191910"
}

6、获取短信验证码
请求地址:  /api/common/sendSms
请求方式:  get
数据格式:  application/json
请求参数：{
"type":"1"   // 业务类型 type=0登陆， type=1 修改提币
}
响应参数：{
"code":200,
"message":"成功"
}

7、更新资金密码接口
请求地址:  /api/acceptor/update
请求方式:  get
数据格式:  application/json
请求参数：{
"withdrawPassword":"123",
"code":"1234"
}
响应参数：{
"code":200,
"message":"成功"
}

7、确认转出接口
请求地址:  /api/acceptor/confirmWithdraw
请求方式:  post
数据格式:  application/json
请求参数：{
"id":1,
"status":1 // 拒绝 status = 0  确认转出status =1
}
响应参数：{
"code":200,
"message":"成功"
}

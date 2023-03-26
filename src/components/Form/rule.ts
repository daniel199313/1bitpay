// 验证表单函数集合
export type RuleFunc = (value: string) => string | undefined;
type RuleMaker = (...params: any[]) => RuleFunc;
// 生成验证自定义正则表达式的rulefunc
export const regExp = (reg: string, msg: string) => {
  const regExp = new RegExp(reg);
  return (value: string) => {
    if (!regExp.test(value)) {
      return msg;
    }
  };
};
// 生成验证Email的rulefunc
export const email: RuleMaker = (msg = "请输入正确的邮箱") => {
  return regExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$", msg);
};
// 生成验证手机号的rulefunc
export const phone: RuleMaker = (msg = "请输入正确的手机号") => {
  return regExp("^1[3456789]\\d{9}$", msg);
};
// 生成验证必填项的rulefunc
export const required: RuleMaker = (msg = "必填项") => {
  return (value: string) => {
    if (!value) {
      return msg;
    }
  };
};

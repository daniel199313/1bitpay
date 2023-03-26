// 把长文本缩略显示,保留开头和结尾，中间用...显示,指定长度
export const shortText = (
  text: string,
  front: number = 10,
  back: number = 4,
  replaceStr: string = "..."
) => {
  if (text.length <= front + back) {
    return text;
  }
  return text.slice(0, front) + replaceStr + text.slice(-back);
};
// 格式化金额，用千分符分隔
export const formatMoney = (money: number) => {
  return money.toLocaleString();
};

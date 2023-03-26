// 合并两个class 字符串 中间用空格隔开
export function mergeClass(...args: (string | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

// map class {class名: boolean | 表达式 }
type ClassMap = { [key: string]: boolean | (() => boolean) };
export function mapClass(classMap: ClassMap) {
  return Object.entries(classMap)
    .filter(([_, value]) => (typeof value === "boolean" ? value : value()))
    .map(([key, _]) => key)
    .join(" ");
}
// 去除多余的空格, 用一个空格代替
export function trimClass(classString: string) {
  return classString.replace(/\s+/g, " ");
}
// 去除重复的class,并且按照字母顺序排列
export function dedupeClass(classString: string) {
  return Array.from(new Set(classString.split(" ").sort())).join(" ");
}

// 可以传入多个参数，如果参数是数组，就把数组中的元素合并成一个字符串，如果参数是对象，就判断对象中的值是否为true，如果为true就把key合并到字符串中用空格隔开,并且去除重复和多余的空格
export const classX = (
  ...args: (string | string[] | ClassMap | undefined)[]
) => {
  const classArray = args.map((arg) => {
    // 如果是undefined或者null，就返回空字符串
    if (arg === undefined) {
      return "";
    } else if (typeof arg === "string") {
      return arg;
    } else if (Array.isArray(arg)) {
      return arg.join(" ");
    } else {
      return mapClass(arg);
    }
  });
  return dedupeClass(trimClass(mergeClass(...classArray)));
};

// 工厂函数生成 pxToRem 函数
export function pxToRemFactory(baseFontSize: number) {
  return function (px: number) {
    return `${px / baseFontSize}rem`;
  };
}
export function px2rem_14(px: number) {
  return pxToRemFactory(14)(px);
}

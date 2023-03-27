import { classX } from "../../utils/css";

export enum IconType {
  "left" = "arrow-left",
  "fail" = "fail",
  "success" = "success",
  "close" = "close",
  "delete" = "delete",
  "right" = "right",
  "down" = "toBottom-fill",
  "home" = "Home",
  "profile" = "Profile",
}

interface IProps {
  className?: string;
  type: IconType;
}
export default ({ type, className }: IProps) => {
  return <i className={classX("iconfont", `icon-${type}`, className)}></i>;
};

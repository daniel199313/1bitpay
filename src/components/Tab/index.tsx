import { NavLink } from "react-router-dom";
import Icon, { IconType } from "../Icon";

// 计算class
const getClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? " text-tab-active" : "text-tab-default";
};

export default () => (
  <nav className="flex justify-around items-center bg-white w-full h-tab">
    <NavLink to="/pages/home" className={getClass}>
      <Icon type={IconType.home} className="text-[24px]" />
    </NavLink>
    <NavLink to="/pages/user" className={getClass}>
      <Icon type={IconType.profile} className="text-[24px]" />
    </NavLink>
  </nav>
);

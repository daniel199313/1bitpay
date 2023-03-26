import { NavLink } from "react-router-dom";

// 计算class
const getClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? " text-tab-active" : "text-tab-default";
};

export default () => (
  <nav className="flex justify-around items-center bg-white w-full h-tab">
    <NavLink to="/pages/home" className={getClass}>
      <i className="iconfont icon-Home text-[24px]"></i>
    </NavLink>
    <NavLink to="/pages/user" className={getClass}>
      <i className="iconfont icon-Profile text-[24px]"></i>
    </NavLink>
  </nav>
);

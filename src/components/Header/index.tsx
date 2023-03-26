import { useApp } from "../../providers/app";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const { state } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const back = () => {
    if (location.pathname === "/pages/home") {
      return;
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="h-header pb-[31px] flex items-end w-full px-[31px]">
      {location.pathname !== "/pages/home" && (
        <div onClick={back}>
          <i className="iconfont icon-arrow-left text-2xl"></i>
        </div>
      )}

      <div className="flex-1 text-center">
        <h1>{state.title}</h1>
      </div>
      <div className="w-4"></div>
    </div>
  );
};

import { useEffect } from "react";
import { useApp } from "../../providers/app";
import UserInfoCard from "./UserInfoCard";
import Cell from "../../components/Cell";
import { SecondaryButton } from "../../components/Buttons";
import { useServices } from "../../providers/services";
import { useNavigate } from "react-router-dom";

export default () => {
  const { state, setTitle, setUserInfo } = useApp();
  const { api } = useServices();

  useEffect(() => {
    setTitle("我的");
    if (state.role) {
      api.getUserInfo(state.role).then((res) => {
        if (res.data.code === 200) {
          setUserInfo(res.data.data);
        }
      });
    }
  }, []);

  const linkList1 = [
    {
      title: "历史审批",
      link: "history",
    },
    {
      title: "资金密码",
      link: "setPassword",
    },
  ];

  const linkList2 = [
    {
      title: "关于",
      link: "about",
    },
  ];
  const go = useNavigate();

  return (
    <div>
      <UserInfoCard />
      <Cell list={linkList1} />
      <Cell list={linkList2} />
      <SecondaryButton
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("baseURL");
          localStorage.removeItem("app_state");
          go("/login");
        }}
        className="h-[48px]"
      >
        退出登录
      </SecondaryButton>
    </div>
  );
};

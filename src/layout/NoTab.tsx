import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default () => {
  return (
    <div className=" bg-background fixed w-full h-full overflow-hidden flex flex-col items-center justify-between">
      <Header />
      <div className="content flex-1 overflow-x-hidden overflow-y-scroll w-full px-[30px]">
        <Outlet />
      </div>
    </div>
  );
};

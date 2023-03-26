import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../providers/app";

export default () => {
  const redirect = useNavigate();
  const { state } = useApp();
  useEffect(() => {
    if (state.token) {
      redirect("/home");
    } else {
      redirect("/login");
    }
  }, []);
  return (
    <div className="fixed h-full w-full flex justify-center items-center">
      loading...
    </div>
  );
};

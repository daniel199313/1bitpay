import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  redirect,
  Outlet,
} from "react-router-dom";
import Base from "./layout/Base";
import Home from "./pages/Home";
import User from "./pages/User";
import Index from "./pages/index";
import Login from "./pages/Login";
import About from "./pages/About";
import History from "./pages/History";
import NoTab from "./layout/NoTab";
import Detail from "./pages/Detail";
import SetPassword from "./pages/SetPassword";

const router = createHashRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="pages" element={<Base />}>
        <Route path="home" element={<Home />} />
        <Route path="user" element={<Outlet />}>
          <Route index element={<User />} />
          <Route path="about" element={<About />} />
          <Route path="history" element={<History />} />
          <Route path="setPassword" element={<SetPassword />} />
        </Route>
      </Route>
      <Route path="/transaction" element={<NoTab />}>
        <Route path=":id" element={<Detail />} />
      </Route>
      <Route
        path="*"
        element={
          <div className="text-4xl flex fixed w-full h-full justify-center items-center">
            404 | Not Found
          </div>
        }
      />
    </Route>
  )
);

export default router;

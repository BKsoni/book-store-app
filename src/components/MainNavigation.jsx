import RegistrationForm from "./register/RegistrationForm";
import LoginForm from "./login/LoginForm";
import Search from "./book/Search";
import { Route, Routes } from "react-router-dom";
import { nav } from "../assets/RoutePaths";
import Home from "./book/Home";
import RequireAuth from "./RequireAuth";
import DisplayAll from "./book/DisplayAll";
import BookManagementPage from "./book/BookManagementPage";
import ProfilePage from "./user/ProfilePage";
import UserManagementPage from "./user/UserManagementPage";
import Logout from "./user/Logout";
import CategoryMng from "./book/CategoryMng";
import CartPage from "./user/CartPage";

const RoutePath = () => {
  return (
      <Routes>
        <Route path={nav.Login} element={<LoginForm />} />
        <Route path={nav.Register} element={<RegistrationForm />} />  

          <Route path={nav.Home} element={<RequireAuth><Home /></RequireAuth>} />
          <Route path={nav.Search} element={<RequireAuth><Search /></RequireAuth>} />
          <Route path={nav.DisplayAll} element={<RequireAuth><DisplayAll /></RequireAuth>} />
          <Route path={nav.BookMng} element={<RequireAuth><BookManagementPage /></RequireAuth>} />
          <Route path={nav.Profile} element={<RequireAuth><ProfilePage /></RequireAuth>} />
          <Route path={nav.UserMng} element={<RequireAuth><UserManagementPage /></RequireAuth>} />
          <Route path={nav.Logout} element={<RequireAuth><Logout /></RequireAuth>} />
          <Route path={nav.CategoryMng} element={<RequireAuth><CategoryMng /></RequireAuth>} />
          <Route path={nav.Cart} element={<RequireAuth><CartPage /></RequireAuth>} />
      </Routes>
  );
};

export default RoutePath;
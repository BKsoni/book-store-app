import React from "react";
import { NavLink } from "react-router-dom";
import { nav } from "../assets/RoutePaths";
import { useStyles } from "./CommonStyle";
import { AppBar, Toolbar } from "@material-ui/core";
import { useAuth } from "../context/auth";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Navbar() {
  const classes = useStyles();
  const auth = useAuth();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logo}>Books4U</div>

        <nav className={classes.navItems}>
          {auth.user.email === "" && (
            <>
              <NavLink to={nav.Login} className={classes.navItem}>
                Login
              </NavLink>
              <NavLink to={nav.Register} className={classes.navItem}>
                Register
              </NavLink>
            </>
          )}
          {/* For Admin User */}
          {auth.user.roleId === 1 && (
            <>
              <NavLink to={nav.BookMng} className={classes.navItem}>
                Manage Books
              </NavLink>
              <NavLink to={nav.CategoryMng} className={classes.navItem}>
                Manage Category
              </NavLink>
              <NavLink to={nav.UserMng} className={classes.navItem}>
                Manage Users
              </NavLink>
              <NavLink to={nav.Profile} className={classes.navItem}>
                <AccountCircleIcon />
              </NavLink>
            </>
          )}

          {/* For Seller User */}
          {auth.user.roleId === 2 && (
            <>
              <NavLink to={nav.Search} className={classes.navItem}>
                Search
              </NavLink>
              <NavLink to={nav.DisplayAll} className={classes.navItem}>
                List Books
              </NavLink>  
              <NavLink to={nav.BookMng} className={classes.navItem}>
                Manage Books
              </NavLink>
              <NavLink to={nav.Profile} className={classes.navItem}>
                <AccountCircleIcon />
              </NavLink>
            </>
          )}

          {/* For Buyer User */}
          {auth.user.roleId === 3 && (
            <>
              <NavLink to={nav.Search} className={classes.navItem}>
                Search
              </NavLink>
              <NavLink to={nav.DisplayAll} className={classes.navItem}>
                List Books
              </NavLink>
              <NavLink to={nav.Cart} className={classes.navItem}>
                <ShoppingCartIcon />
              </NavLink>
              <NavLink to={nav.Profile} className={classes.navItem}>
                <AccountCircleIcon />
              </NavLink>
            </>
          )}

          {/* Logout Nav Item */}
          {auth.user.email !== "" && (
            <NavLink to={nav.Logout} className={classes.navItem}>
              <ExitToAppIcon />
            </NavLink>
          )}

        </nav>
      </Toolbar>
    </AppBar>
  );
}

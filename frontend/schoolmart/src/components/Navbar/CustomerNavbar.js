import { React, useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContactIcon from "@mui/icons-material/PermContactCalendar";
import StoreIcon from "@mui/icons-material/Store";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AdbIcon from "@mui/icons-material/Adb";

import profile_pic from "../../assets/images/male_profile.jpg";
import logo from "../../assets/images/logo_4.png";
import jwtDecode from "jwt-decode";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

import LoginService from "../../services/LoginService";

const footer_bg_texture =
  "https://www.transparenttextures.com/patterns/nistri.png";

const pages = ["Home", "Shop", "About Us", "Contact Us", "Cart"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const CustomerNavbar = (props) => {
  console.log(props);
  const { classes } = props;
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [value, setValue] = useState("");

  // const [isLogged, setIsLoggedUser] = useState(false);
  const [isLogged, setIsLogged] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });

  useEffect(() => {
    if (isLogged) {
      settings[3] = "Logout";
      navLinkStyle({ isActive: true });
    } else {
      settings[3] = "Login";
    }

    // console.log("---handling login in Navbar-----");
    // let token = localStorage.getItem("token");
    // console.log(token);
    // if (token) {
    //   props.handleLogin(true);
    // } else {
    //   props.handleLogin(false);
    // }
  });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goToDashboard = () => {
    //  navigate("/dashboard");
    navigate("/home");
  };

  function changePage(e) {
    setValue(e.target.innerText);
  }

  const handleLogout = () => {
    let token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.username);
    logoutUser(decodedToken.username);
  };

  const logoutUser = async (username) => {
    let res = await LoginService.logout(username);
    console.log(res);

    if (res.status === 200) {
      if (res.data.data) {
        // remove tokn from LS
        localStorage.removeItem("token");
        // localStorage.setItem("isLoggedOut", true);

        // set logout status in LS
        // localStorage.setItem("isLoggedOut", false);
        alert(res.data.message);

        console.log("------right before returning false from Navbar------");
        // props.handleLogin(false);
        handleCloseUserMenu();
        setIsLogged(false);
        navigate("/home");
      }
    } else {
      alert(res.response.data.message);
    }
  };

  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "#D25380" : "normal",
    };
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundImage: `url(${footer_bg_texture})`,
        width: "68%",
        margin: "auto",
      }}
    >
      <Container maxWidth="x3">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Avatar
            alt="Remy Sharp"
            src={logo}
            large
            style={{ marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Acme",
              fontWeight: 800,
              letterSpacing: ".3rem",
              // color: "inherit",
              color: "#AC7088",
              textDecoration: "none",
            }}
          >
            SchoolMart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="left">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tabs
              value={value}
              onChange={changePage}
              className={classes.nav__tabs}
            >
              {/* <Link to="/home" className={classes.nav__text}>
                <Tab
                  icon={<HomeIcon />}
                  className={classes.nav__text}
                  label="Home"
                />
              </Link> */}

              <NavLink
                smooth
                to="/home"
                className={classes.nav__text}
                style={navLinkStyle}
              >
                <Tab
                  icon={<HomeIcon />}
                  className={classes.nav__text}
                  label="Home"
                />
              </NavLink>

              <NavLink
                smooth
                to="/shop"
                className={classes.nav__text}
                style={navLinkStyle}
              >
                <Tab
                  icon={<StoreIcon />}
                  className={classes.nav__text}
                  label="Shop"
                />
              </NavLink>

              <NavLink
                smooth
                to="/about"
                className={classes.nav__text}
                style={navLinkStyle}
              >
                <Tab
                  icon={<LightbulbIcon />}
                  className={classes.nav__text}
                  label="About Us"
                />
              </NavLink>

              <NavLink
                smooth
                to="/contact"
                className={classes.nav__text}
                style={navLinkStyle}
              >
                <Tab
                  icon={<ContactIcon />}
                  className={classes.nav__text}
                  label="Contact Us"
                />
              </NavLink>

              {isLogged ? (
                <NavLink
                  smooth
                  to="/cart"
                  className={classes.nav__text}
                  style={navLinkStyle}
                >
                  <Tab
                    icon={<ShoppingCartIcon />}
                    className={classes.nav__text}
                    label="Cart"
                  />
                </NavLink>
              ) : null}
            </Tabs>
          </Box>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
          {isLogged ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={profile_pic} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) =>
                  setting === "Dashboard" ? (
                    <>
                      <MenuItem key={setting} onClick={goToDashboard}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    </>
                  ) : setting === "Logout" ? (
                    <MenuItem key={setting} onClick={handleLogout}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
          ) : (
            <Button
              // onClick={handleCloseNavMenu}
              onClick={() => {
                console.log("clciked login btn in navbar");
                navigate("/login");
                // props.handleLogin(false);
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
// export default Navbar;
export default withStyles(styleSheet)(CustomerNavbar);

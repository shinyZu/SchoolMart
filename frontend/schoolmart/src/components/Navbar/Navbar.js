import { React, useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContactIcon from "@mui/icons-material/PermContactCalendar";
import StoreIcon from "@mui/icons-material/Store";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import profile_pic from "../../assets/images/male_profile.jpg";
import logo from "../../assets/images/logo_5.png";

import { styleSheet } from "./styles";
import { withStyles } from "@mui/styles";

const pages = ["Home", "Shop", "About Us", "Contact Us", "Cart"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = (props) => {
  const { classes } = props;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLogged, setIsLoggedUser] = useState(true);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isLogged) {
      settings[3] = "Logout";
    } else {
      settings[3] = "Login";
    }
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

  function changePage(e) {
    setValue(e.target.innerText);
  }

  const navLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? "#D25380" : "normal",
    };
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
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
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button
              onClick={handleCloseNavMenu}
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
export default withStyles(styleSheet)(Navbar);

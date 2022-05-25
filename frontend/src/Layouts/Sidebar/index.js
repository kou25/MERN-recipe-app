import React from "react";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import ReactTooltip from "react-tooltip";
import "./style.css";

const iconStyle = (fontsize) => {
  return {
    fill: "transparent",
    stroke: "#1a1a2c",
    strokeWidth: 1,
    fontSize: fontsize
  };
};

const iconStyle2 = (fontsize) => {
  return {
    fill: "brown",
    stroke: "brown",
    strokeWidth: 1,
    fontSize: fontsize
  };
};

const Sidebar = () => {
  return (
    <div className={`sidebar`}>
      <div className="sidebar__icon">
        <FastfoodRoundedIcon style={iconStyle2(30)} />
      </div>
      <div className="sidebar__menu">
        <NavLink
          to="/"
          exact
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="Home"
          data-for="sidebarTooltip"
        >
          <HomeRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(36)}
          />
        </NavLink>
        <NavLink
          to="/add"
          className="sidebar__menuItem"
          activeClassName="active"
          data-tip="Add New Recipe"
          data-for="sidebarTooltip"
        >
          <PostAddRoundedIcon
            className="sidebar__menuIcon"
            style={iconStyle(34)}
          />
        </NavLink>
      </div>
      <NavLink
        to="/"
        className="sidebar__menuItem"
        activeClassName="active"
        data-tip="comming soon"
        data-for="sidebarTooltip"
      >
        <AccountCircleIcon className="sidebar__menuIcon" fontSize="large" />
      </NavLink>
      <ReactTooltip
        place="right"
        className="app__toolTip"
        id="sidebarTooltip"
        backgroundColor="#1a1a2cee"
        effect="solid"
      />
    </div>
  );
};

export default Sidebar;

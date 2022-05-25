import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
import { AddLeft } from "./components/AddLeft";
import { AddRight } from "./components/AddRight";
export const Add = () => {
  return (
    <div className="add-container ">
      {/* breadcrumps in the top */}
      <div className="breadcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            to="/"
            key="/"
            style={{ color: "rgb(230, 146, 87)" }}
          >
            Home
          </Link>
          <Typography color="text.primary">Add New Recipe</Typography>
        </Breadcrumbs>
      </div>
      <div className="add-container-main">
        {/* left div */}
        <AddLeft />
        {/* right div */}
        <AddRight />
      </div>
    </div>
  );
};

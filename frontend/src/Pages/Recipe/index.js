import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition, pageSlide } from "../../Common/animation";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
export const Recipe = () => {
  // backend api
  const BASE_URL = process.env.REACT_APP_API_URL;

  //to navigate to other page
  const history = useNavigate();

  //params to get id
  const params = useParams();

  //states
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("instruction");

  //fetch all the recipe here
  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/api/v1/recipe/${params.id}`);
      setRecipe(data?.data?.data);
      setLoading(false);
    };
    getRecipe();
  }, [BASE_URL, params.id]);

  //delete the recipe here
  const handleDelete = async () => {
    setLoading(true);
    await axios.delete(`${BASE_URL}/api/v1/recipe/${params.id}`);
    setLoading(false);
    history(`/`);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlide}
      transition={pageTransition}
    >
      <div className="details_section">
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
            <Typography color="text.primary">{recipe.name}</Typography>
          </Breadcrumbs>
        </div>
        {loading && (
          <p style={{ marginTop: "2rem", fontSize: "20px" }}>
            Loading ! Please wait...
          </p>
        )}
        <div className="details_display_wrapper">
          <div>
            <h2>{recipe.name}</h2>
            <img src={recipe?.photo?.secure_url} alt={recipe.name} lazy />
            <Button
              variant="outlined"
              color="error"
              sx={{ marginTop: "2rem" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
          <div className="details_info">
            <button
              className={activeTab === "instruction" ? "active" : ""}
              onClick={() => setActiveTab("instruction")}
            >
              Instruction
            </button>
            <button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </button>

            {activeTab === "instruction" ? (
              <div className="details-instruction">
                <p>
                  {recipe?.instruction
                    ?.replaceAll("\\n", " ")
                    .replaceAll("\\r", " ")}
                </p>
              </div>
            ) : (
              <div className="details-ingredients">
                {recipe.ingredients.length > 1 ? (
                  <>
                    <ul>
                      {recipe.ingredients.split(",").map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>No Ingredients found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

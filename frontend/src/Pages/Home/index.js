import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import { motion } from "framer-motion";
import { pageTransition, pageSlide } from "../../Common/animation";
import HomeLeft from "./components/homeLeft";
import HomeRight from "./components/homeRight";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {
  //get the backend url
  const BASE_URL = process.env.REACT_APP_API_URL;

  //ref for scrollIntoView
  const myRef = useRef(null);

  //function to scrollIntoView
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth" });

  //states
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  //fetch all the recipes here
  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      const data = await axios.get(`${BASE_URL}/api/v1/recipes`);
      setRecipes(data?.data?.data);
      setLoading(false);
    };
    getRecipes();
  }, [BASE_URL]);

  return (
    // animated entry
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlide}
      transition={pageTransition}
    >
      <div className="home_section">
        <div className="home_section-main">
          {/* left side  */}
          <HomeLeft executeScroll={executeScroll} />
          {/* right side  */}
          <HomeRight />
        </div>
      </div>
      {/* all recipes  */}
      <div className="home-recipe" ref={myRef}>
        <div className="home-recipe-main">
          <h1>
            Explore <span style={{ color: "chocolate" }}>Recipes</span> around
            the world
          </h1>
        </div>
        <div className="home-recipe-latest">
          <h3>Latest Recipes</h3>
          {/* check the api is in loading state or not */}
          {!loading ? (
            <>
              {/* check recipes is available in th DB */}
              {recipes.length ? (
                <>
                  <Box
                    sx={{
                      flexGrow: 1,
                      marginTop: "1rem",
                      marginBottom: "3rem"
                    }}
                  >
                    {recipes.length && (
                      <Grid container spacing={2}>
                        {/* Split the lastest recipe from the array */}
                        {recipes.slice(0, 1).map((data) => (
                          <Grid item xs={6} display="flex">
                            <Link to={`/recipe/${data._id}`}>
                              <div className="home-recipe-latest-largePost">
                                <img
                                  src={data?.photo?.secure_url}
                                  alt={"large"}
                                  lazy={true}
                                />
                                <h5>{data?.name}</h5>
                              </div>
                            </Link>
                          </Grid>
                        ))}
                        <Grid
                          item
                          xs={6}
                          display="flex"
                          flexDirection="column"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          {/* Split the 2nd and 3rd lastest recipe from the array */}
                          {recipes.slice(1, 3).map((data) => (
                            <div className="home-recipe-latest-othersmall">
                              <div className="home-recipe-latest-small-cards">
                                <Link
                                  to={`/recipe/${data._id}`}
                                  style={{ height: "100%" }}
                                >
                                  <img
                                    src={data?.photo?.secure_url}
                                    alt={"large"}
                                    lazy={true}
                                  />
                                </Link>
                              </div>
                              <div className="small-card-title">
                                <h5>{data?.name}</h5>
                              </div>
                            </div>
                          ))}
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                  {recipes.length > 3 && (
                    <>
                      <h3>Explore More</h3>
                      <div style={{ width: "100%", marginTop: "2rem" }}>
                        <Box
                          sx={{
                            display: "grid",
                            gap: 2,
                            gridTemplateColumns: "repeat(4, 1fr)"
                          }}
                        >
                          {/* ignore  lastest 3 recipes from the array */}
                          {recipes.slice(3).map((data) => (
                            <Link to={`/recipe/${data._id}`}>
                              <div className="other-card">
                                <div>
                                  <img
                                    src={data?.photo?.secure_url}
                                    alt={"small"}
                                    lazy={true}
                                  />
                                  <p>{data?.name}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </Box>
                      </div>
                    </>
                  )}
                </>
              ) : (
                // if no recieps available in the db
                <p style={{ marginTop: "2rem", fontSize: "20px" }}>
                  No recipes found.
                </p>
              )}
            </>
          ) : (
            // show loading state
            <p style={{ marginTop: "2rem", fontSize: "20px" }}>
              Loading ! Please wait...
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

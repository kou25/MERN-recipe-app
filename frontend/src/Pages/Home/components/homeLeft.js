import React from "react";
import Typewriter from "typewriter-effect";
const HomeLeft = ({ executeScroll }) => {
  const handleClick = () => {
    executeScroll();
  };
  return (
    <div className="home_section-left">
      <div className="home_text-container">
        <div className="home_tagline">
          {/* for typewriting effect */}
          <Typewriter
            options={{
              strings: ["#1 Best Reciepes Website", "New Recipes available"],
              autoStart: true,
              loop: true
            }}
          />
        </div>
        <h1>
          Tasty <span style={{ color: "chocolate" }}>Recipes</span> & flavour
        </h1>
        <div className="home_content">
          Discover, Explore various types and forms of recipes accross the
          globe. You can also contribute to your community.
        </div>
        <div className="home_section-button">
          {/* click to move to the recipes section */}
          <button onClick={handleClick}>Explore</button>
        </div>
      </div>
    </div>
  );
};

export default HomeLeft;

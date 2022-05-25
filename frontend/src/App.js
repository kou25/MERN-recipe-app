import { Routes, Route } from "react-router-dom";
import "./Assests/App.css";
import Sidebar from "./Layouts/Sidebar";
import { Add } from "./Pages/AddRecipe";
import { Home } from "./Pages/Home";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { Recipe } from "./Pages/Recipe";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="app__container">
        {/* For animation entry */}
        <AnimatePresence exitBeforeEnter>
          <AnimateSharedLayout>
            {/* Page routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </Routes>
          </AnimateSharedLayout>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import ImageUploader from "react-image-upload";
import axios from "axios";
import "react-image-upload/dist/index.css";
import { useNavigate } from "react-router-dom";

export const AddLeft = () => {
  //backedn api
  const BASE_URL = process.env.REACT_APP_API_URL;

  //to navigate to other apge
  const history = useNavigate();

  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [recipesInputs, setRecipeInputs] = useState({
    name: "",
    ingredients: "",
    instruction: "",
    photo: ""
  });

  //image library function to add
  const getImageFileObject = (imageFile, file) => {
    setRecipeInputs({ ...recipesInputs, photo: imageFile.file });
    setError(false);
  };

  //image library function to delete
  const runAfterImageDelete = (file) => {
    console.log({ onDele: file });
    setRecipeInputs({ ...recipesInputs, photo: "" });
  };

  //function to add new recipe
  const addRecipe = async (data) => {
    setLoading(true);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json",
        type: "formData"
      }
    };

    //convert to formdata to upload image
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("ingredients", data.ingredients);
    formData.append("instruction", data.instruction);
    formData.append("photo", data.photo);
    await axios.post(`${BASE_URL}/api/v1/recipe/new`, formData, config);
    setLoading(false);

    //naviagte back to home
    history(`/`);
  };

  //form submit function
  const handleSubmit = (evt) => {
    //to prevent page reload
    evt.preventDefault();

    //if photo missing show error
    if (recipesInputs.photo === "" || recipesInputs.photo === undefined) {
      setError(true);
    } else {
      addRecipe(recipesInputs);
    }
  };

  return (
    <div className="add-container-left">
      <div className="add-container-form">
        <form className="form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            {loading && (
              <p style={{ fontSize: "20px" }}>Loading ! Please wait...</p>
            )}
          </div>
          {/* image library */}
          <div style={{ marginBottom: "1rem" }}>
            <ImageUploader
              onFileAdded={(img) => getImageFileObject(img)} // function that runs to confirm that your image actually exists
              onFileRemoved={(img) => runAfterImageDelete(img)} // function runs on once you delete your image
            />
            {error && (
              <p style={{ fontSize: "16px", color: "#ff6863" }}>
                Image is required. Please upload
              </p>
            )}
          </div>
          {/* text field */}
          <TextField
            required
            fullWidth
            label="Name"
            name="name"
            placeholder="eg. chicken biriyani"
            sx={{ mb: 2, display: "block" }}
            value={recipesInputs.name}
            onChange={(event) =>
              setRecipeInputs({ ...recipesInputs, name: event?.target?.value })
            }
          />
          {/* text field */}
          <TextField
            required
            fullWidth
            label="Ingredients"
            name="ingredients"
            placeholder="eg. chicken, rice, etc."
            sx={{ mb: 2, display: "block" }}
            value={recipesInputs.ingredients}
            onChange={(event) =>
              setRecipeInputs({
                ...recipesInputs,
                ingredients: event?.target?.value
              })
            }
          />
          {/* text area */}
          <textarea
            required
            defaultValue={recipesInputs.instruction}
            onBlur={(event) =>
              setRecipeInputs({
                ...recipesInputs,
                instruction: event?.target?.value
              })
            }
            rows={8}
            placeholder={"Add instruction"}
          />
          {/* submit button */}
          <Button variant="contained" type="submit" disabled={loading}>
            Add Recipe
          </Button>
        </form>
      </div>
    </div>
  );
};

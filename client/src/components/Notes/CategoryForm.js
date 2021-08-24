import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_CATEGORY } from "../../utils/mutations";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';
import { Container } from "@material-ui/core";

const CategoryForm = () => {
  const [categoryError, setCategoryError] = useState(false);
  const history = useHistory();
  const [addCategory, { error }] = useMutation(ADD_CATEGORY);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCategory({
        variables: { name: newCategory },
      });

      history.push("/");
      window.location.reload();
    } catch (err) {
      setCategoryError(true);
      console.error(err);
    }
  };
  const categories = [
    "Home Task",
    "Work Task",
    "School Task",
    "Shopping Task",
    "Other Task",
  ];
  
  return (
    <div className="create-note">
      {Auth.loggedIn() ? (

  const [newCategory, setNewCategory] = useState("");
  return (
    <Container>
    <form>
      <select
        onChange={(e) => setNewCategory(e.target.value)}
        value={newCategory}
      >
        <option>Choose categories...</option>
        {categories.map((categories) => (
          <option key={categories} value={categories}>
            {categories}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleFormSubmit}>
        Add Category
      </button>
      {categoryError ? (
        <button
          onClick={(e) => {
            setCategoryError(false);
          }}
        >
          That category already exists
        </button>
      ) : (
        ""
      )}
    </form>
    
    <Link to='/'>
    <IconButton aria-label="Return to Dashboard" style={{marginLeft: '100px'}}>
        <DashboardIcon /><p style={{ marginLeft: '10px'}}>Go Back to Dashboard</p>
    </IconButton>
    </Link>
    </Container>
    <p>
          You need to be logged in to use lightning notes. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
        )}
    </div> 
  );
};

export const NoteProvider = ({ children }) => {};
export default CategoryForm;

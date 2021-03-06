
import React from "react";
import Button from '@material-ui/core/Button';

import Category from "../components/Notes/Category";
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../utils/queries';
import { Link } from 'react-router-dom';

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px'
}

const Home = () => {

  const { loading, data } = useQuery( QUERY_CATEGORIES);
  const categories = data?.categories || [];
  console.log(data);

  if (!categories.length) {
    return (
    <main>
      <h3>No categories yet ...</h3>
      <div style={buttonStyle}>
        <Link to= '/create-category'>
        <Button variant="contained">Select a new category</Button>
        </Link>
      </div>
    </main>  

    )
  }
  let chooseColor = (category) => {
    let newColor = '';
      if (category.name === "Home Task") {
         return newColor = {backgroundColor: '#DAF7A6'}
      } else if (category.name === "Work Task") {
         return newColor = {backgroundColor: '#FFC300'}
      } else if (category.name === "School Task") {
        return newColor = {backgroundColor: '#33E0FF'}
      } else if (category.name === "Shopping Task") {
         return newColor = {backgroundColor: '#D8A6DF'}
      } else if (category.name === "Other Task") {
         return newColor = {backgroundColor: '#F5CBA7'}
      } 
  
    }



  return (
    <main>
      
        <div>
        {loading ? (
            <div>Loading...</div>
          ) : (

              categories.map((category) =>
              <Link to ={`/categories/${category._id}`}>
                <Category
                  key={category._id}
                  id={category._id}
                  name={category.name}
                  bgColor={chooseColor(category)}
              />
              </Link>

              )
          )
        }
        </div>
        <div style={buttonStyle}>
          <Link to= '/create-category'>
          <Button variant="contained">Select a new category</Button>
          </Link>
          
        </div>
      
    </main>
  );
};

export default Home;


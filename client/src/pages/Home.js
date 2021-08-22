
import React, { useState } from "react";
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Category from "../components/Notes/Category";
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../utils/queries';



// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px'
}

const Home = () => {

  // eslint-disable-next-line no-unused-vars
  const [ useCategory, updateCategory ] = useState ([

    {
      categoryName: "Home Task",
      id: 1,
      bgColor: {backgroundColor: '#DAF7A6'}
    },
    {
      categoryName: "Work Task",
      id: 2,
      bgColor: {backgroundColor: '#FFC300'}
    },
    {
      categoryName: "School Task",
      id: 3,
      bgColor: {backgroundColor: '#33E0FF'}
    },
    {
      categoryName: "Shopping Task",
      id: 4,
      bgColor: {backgroundColor: '#D8A6DF'}
    },
    {
      categoryName: "Other Task",
      id: 5,
      bgColor: {backgroundColor: '#F5CBA7'}
    }
  ]);
  //const classes = useStyles();

  const { loading, data } = useQuery( QUERY_CATEGORIES);
  const categories = data?.categories || [];
  console.log(data);
  if (!categories.length) {
    return <h3>No categories yet ...</h3>
  }

  return (
    <main>
      
        <div>
        {loading ? (
            <div>Loading...</div>
          ) : (
            
              categories.map((category) => {
                if (category.name === "Home Task") {
                  category.bgColor = {backgroundColor: '#DAF7A6'}
                } else if (category.name === "Work Task") {
                  category.bgColor = {backgroundColor: '#FFC300'}
                } else if (category.name === "School Task") {
                  category.bgColor = {backgroundColor: '#33E0FF'}
                } else if (category.name === "Shopping Task") {
                  category.bgColor = {backgroundColor: '#D8A6DF'}
                } else if (category.name === "Other Task") {
                  category.bgColor = {backgroundColor: '#F5CBA7'}
                }


              <Category
              key={category._id}
              id={category._id}
              name={category.name}
              bgColor={category.bgColor}
              />
              }) 
              
            
          )}
        {/* {useCategory.map((category) => (

          <Category name = { category.categoryName } key={category.id} bgColor={category.bgColor}/>
        ))} */}
        </div>
        <div style={buttonStyle}>
          <Button variant="contained">Select a new category</Button>
        </div>
      
    </main>
  );
};

export default Home;


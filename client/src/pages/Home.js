
import React, { useState } from "react";
//import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Category from "../components/Notes/Category";



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

  return (
    <main>
      
        <div>
        {useCategory.map((category) => (

          <Category name = { category.categoryName } key={category.id} bgColor={category.bgColor}/>
        ))}
        </div>
        <div style={buttonStyle}>
          <Button variant="contained">Select a new category</Button>
        </div>
      
    </main>
  );
};

export default Home;


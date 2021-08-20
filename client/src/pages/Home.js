
import React from "react";
//import Button from '@material-ui/core/Button';

import Category from "../components/Notes/Category";

const categoryCard = [

  {
    categoryName: "Home Task",
    id: 1
  },
  {
    categoryName: "Work Task",
    id: 2
  },
  {
    categoryName: "School Task",
    id: 3
  },
  {
    categoryName: "Shopping Task",
    id: 4
  },
  {
    categoryName: "Other Task",
    id: 5
  }
];

const Home = () => {


  return (
    <main>
      
        <div>
        {categoryCard.map((category) => (

          <Category name = { category.categoryName } key={category.id}/>
        ))}
        </div>
      
    </main>
  );
};

export default Home;


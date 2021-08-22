import React, { useState } from "react";

const CategoryForm = () => {
  const categories = [
    "Home Task",
    "Work task",
    "School Task",
    "Shopping Task",
    "Other Task",
  ];
  const [newCategory, setNewCategory] = useState("");
  return (
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
    </form>
  );
};

export const NoteProvider = ({ children }) => {};
export default CategoryForm;

// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import CardActions from "@material-ui/core/CardActions";
// import IconButton from "@material-ui/core/IconButton";
// import CheckIcon from "@material-ui/icons/Check";

// export default function SimpleMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
//         Choose a Category
//       </Button>
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Home Task</MenuItem>
//         <MenuItem onClick={handleClose}>Work Task</MenuItem>
//         <MenuItem onClick={handleClose}>School Task</MenuItem>
//         <MenuItem onClick={handleClose}>Shopping Task</MenuItem>
//         <MenuItem onClick={handleClose}>Other Task</MenuItem>
//       </Menu>
//       <CardActions disableSpacing>
//         <IconButton aria-label="save your category">
//           <CheckIcon />
//         </IconButton>
//       </CardActions>

//     </div>
//   );
// }

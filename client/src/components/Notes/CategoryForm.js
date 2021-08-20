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

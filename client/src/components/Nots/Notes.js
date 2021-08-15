import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";

// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';

// import { ADD_NOTE } from '../../utils/mutations';
// import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';

// import Auth from '../../utils/auth';

const Notes = () => {
  return (
    <Router>
      <div className="notes-page">Notes Component</div>
    </Router>
  );
};

export default Notes;

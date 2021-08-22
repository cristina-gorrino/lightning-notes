import Note from "./Note";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from '@material-ui/icons/Dashboard';
import Button from '@material-ui/core/Button';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { NOTES_BY_CATEGORY, QUERY_SINGLE_CATEGORY } from '../../utils/queries';
import { Link } from 'react-router-dom';

import Auth from "../../utils/auth";
import { Container } from "@material-ui/core";


const NotesList = ( ) => {

  const {categoryId} = useParams();

  const categoryQuery = useQuery(QUERY_SINGLE_CATEGORY, {variables: { categoryId},});
  const { loading, data } = useQuery( NOTES_BY_CATEGORY, {
    variables: {categoryId},
  });
  const notes = data?.notesCat || [];
  const category = categoryQuery.data?.category ||[];

  return (
    <Container style={{ height: '100%', display: 'flex', flexWrap: 'wrap', margin: '20px'}}>
    <div className="notes-list">
      {categoryQuery.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
        <h1>Category: {category.name}</h1>
        </div>

      )}
                {loading ? (
            <div>Loading...</div>
          ) : (
            
              notes.map((note) => 
              <Note
              key={note._id}
              id={note._id}
              title={note.title}
              text={note.text}
              createdAt={note.createdAt}
              />
              ) 
              
            
          )}
      <Link to= '/'>
      <IconButton aria-label="Return to Dashboard" style={{marginLeft: '100px'}}>
          <DashboardIcon /><p style={{ marginLeft: '10px'}}>Go Back to Dashboard</p>
      </IconButton>
      </Link>
      <Link to={{pathname: "/create-note", hash: `${categoryId}`}}>
      <Button variant="contained">Add a new note</Button>
      </Link>

    </div>
    </Container>

  );
};

export default NotesList;

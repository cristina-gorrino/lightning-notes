import Note from "./Note";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_NOTES, QUERY_SINGLE_CATEGORY } from '../../utils/queries';
import Auth from "../../utils/auth";


const NotesList = ( ) => {
  const {categoryId} = useParams();
  console.log(categoryId);
  console.log(useQuery(QUERY_SINGLE_CATEGORY, {variables: {categoryId},}));
  const categoryQuery = useQuery(QUERY_SINGLE_CATEGORY, {variables: { categoryId},});
  const { loading, data } = useQuery( QUERY_NOTES, {
    variables: {username: Auth.getProfile().data.username },
  });
  const notes = data?.notes || [];
  const category = categoryQuery.data?.category ||[];
  console.log(category)

  return (
    <div className="notes-list">
<<<<<<< HEAD
      {categoryQuery.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
        <h1>Category: {category.name}</h1>
        </div>

      )}
=======
      
>>>>>>> 76549af0e3c6e9d11321b72e045ac3ccf7ebfc89
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
      
      <IconButton aria-label="Return to Dashboard">
          <DashboardIcon />
      </IconButton>
    </div>

  );
};

export default NotesList;

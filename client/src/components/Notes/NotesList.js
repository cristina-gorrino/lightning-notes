import Note from "./Note";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useQuery } from '@apollo/client';
import { QUERY_NOTES } from '../../utils/queries';
import Auth from "../../utils/auth";


const NotesList = ( ) => {

  const { loading, data } = useQuery( QUERY_NOTES, {
    variables: {username: Auth.getProfile().data.username },
  });
  const notes = data?.notes || [];
  console.log(data)

  return (
    <div className="notes-list">
      
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

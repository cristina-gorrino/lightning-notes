import Note from "./Note";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useQuery } from '@apollo/client';
import { QUERY_NOTES } from '../../utils/queries';
import Auth from "../../utils/auth";
import { Container } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


const NotesList = ( ) => {

  const { loading, data } = useQuery( QUERY_NOTES, {
    variables: {username: Auth.getProfile().data.username },
  });
  const notes = data?.notes || [];
  console.log(data)

  return (
    <Container style={{ height: '100%', display: 'flex', flexWrap: 'wrap', margin: '20px'}}>
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
      
      <IconButton aria-label="Return to Dashboard" style={{marginLeft: '100px'}}>
          <DashboardIcon /><p style={{ marginLeft: '10px'}}>Go Back to Dashboard</p>
      </IconButton>
      <IconButton aria-label="Return to Dashboard" style={{marginLeft: '100px'}}>
          <AddCircleOutlineIcon /><p style={{ marginLeft: '10px'}}>Create a new Note</p>
      </IconButton>
      
    </div>
    </Container>

  );
};

export default NotesList;

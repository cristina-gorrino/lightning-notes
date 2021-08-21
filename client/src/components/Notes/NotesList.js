import Note from "./Note";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from '@material-ui/icons/Dashboard';

const noteCards = [
  {
    id: 1,
    title: 'First note',
    text: 'testing to post',
    date: '08-21-2021'
  },
  {
    id: 2,
    title: 'Second note',
    text: 'testing to post',
    date: '08-21-2021'
  },
  {
    id: 3,
    title: 'Third note',
    text: 'testing to post',
    date: '08-21-2021'
  },
  {
    id: 4,
    title: 'Fourth note',
    text: 'testing to post',
    date: '08-21-2021'
  },
  {
    id: 5,
    title: 'Fifth note',
    text: 'testing to post',
    date: '08-21-2021'
  },

]

const NotesList = ( ) => {
  return (
    <div className="notes-list">
      {noteCards.map((note) => (
        <Note
          key={note.id}
          title={note.title}
          text={note.text}
          date={note.date}
          
        />
      ))}
      
      <IconButton aria-label="Return to Dashboard">
          <DashboardIcon />
      </IconButton>
    </div>

  );
};

export default NotesList;

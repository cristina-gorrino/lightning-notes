import Note from "./Note";
import AddNote from "./AddNote";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from '@material-ui/icons/Dashboard';

// const noteCards = [
//   {
//     id: 1,
//     title: 'First note',
//     text: 'testing to post',
//     date: '08-21-2021'
//   },
//   {
//     id: 2,
//     title: 'Second note',
//     text: 'testing to post',
//     date: '08-21-2021'
//   },

// ]

const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
      <IconButton aria-label="Return to Dashboard">
          <DashboardIcon />
      </IconButton>
    </div>

  );
};

export default NotesList;

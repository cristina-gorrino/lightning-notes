// import { MdDeleteForever } from "react-icons/md";

// const Note = ({ id, text, date, handleDeleteNote }) => {
//   return (
//     <div className="note">
//       <span>{text}</span>
//       <div className="note-footer">
//         <small>{date}</small>
//         <MdDeleteForever
//           onClick={() => handleDeleteNote(id)}
//           className="delete-icon"
//           size="1.3em"
//         />
//       </div>
//     </div>
//   );
// };

// export default Note;

import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from '@material-ui/icons/Update';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Note(props) {
  const classes = useStyles();

  console.log(props)
 

  return (
    <Card className={classes.root}>
      <CardHeader title= {props.title} />
      <p>{props.text}</p>
      <p>Created: {props.createdAt}</p>
      <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Due Date"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="save your note">
          <CheckIcon />
        </IconButton>
        <Link to={`/notes/${props.id}`}>
        <IconButton aria-label="Update your note">
          <UpdateIcon />
        </IconButton>
        </Link>

        <IconButton aria-label="mark as important">
          <StarBorderIcon />
        </IconButton>
        <IconButton aria-label="Return to Dashboard">
          <DashboardIcon />
        </IconButton>
        <IconButton aria-label="delete your note">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
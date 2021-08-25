import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import StarNote from './StarNote'
import UpdateIcon from '@material-ui/icons/Update';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    flex: '1 0 33%',
    marginBottom: '10px'
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Note(props) {

  const dbtime = new Date(props.createdAt)
  const today = new Date()
  console.log(props.createdAt)
  console.log(dbtime)
  console.log(today);
  console.log(today.getTimezoneOffset());
  const classes = useStyles();

  return (
    <Container
      style={{
        display: "flex",
        flex: "1 0 33.3%"
      }}
    >
      <CardContent
        className={classes.root}
        style={{  backgroundColor: "#F5ECAE" }}
      >
        <p style={{ textAlign: "center", fontSize: "9px", marginTop: "10px" }}>
          Created: {props.createdAt}
        </p>
        <CardHeader title={props.title} style={{ textAlign: "center" }} />
        <p
          style={{ textAlign: "left", marginLeft: "15px", marginRight: "15px" }}
        >
          {props.text}
        </p>

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
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>
      </CardContent>
      <CardActions disableSpacing style={{justifyContent: 'center'}}>
        <Link to={`/notes/${props.id}`}>
          <IconButton aria-label="Update your note">
            <UpdateIcon />
          </IconButton>
        </Link>

          <StarNote noteId={props.id}/>
          <Link to={`/note-delete/${props.id}`}>
            <IconButton aria-label="delete your note">
              <DeleteIcon />
            </IconButton>
          </Link>
        </CardActions>
        </CardContent>
      </Container>
  );
}

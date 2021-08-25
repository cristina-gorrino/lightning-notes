import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { EDIT_NOTE } from "../../utils/mutations";
import { QUERY_SINGLE_NOTE } from "../../utils/queries";
import { useHistory, useParams } from "react-router-dom";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DashboardIcon from '@material-ui/icons/Dashboard';
import StarNote from './StarNote'
import CardActions from "@material-ui/core/CardActions";

import Auth from "../../utils/auth";

const EditNoteForm = () => {
  const history = useHistory();
  const noteId = useParams().id;

  const [updateNote, { error }] = useMutation(EDIT_NOTE);
  const { loading, data } = useQuery(QUERY_SINGLE_NOTE, {
    variables: { noteId },
  });
  const note = data?.note || [];
  console.log(note);

  const [noteText, setNoteText] = useState({
    title: "",
    text: "",
    createdAt: "",
    dueDate:""
  });
  useEffect(() => {
    setNoteText({ title: note.title, text: note.text, dueDate:note.dueDate });
  }, [note.title, note.text, note.dueDate]);

  console.log(noteText);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateNote({
        variables: {
          noteId: note._id,
          title: noteText.title,
          text: noteText.text,
          dueDate: noteText.dueDate,
          category: note.category._id,
          starred:note.starred
        },
      });
      console.log(data);

      setNoteText("");

      //history.push(`/categories/${note.category._id}`);
      //window.location.reload();
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.error(err);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setNoteText({
      ...noteText,
      [name]: value,
    });
  };

  return (
    <div className="create-note">
      {Auth.loggedIn() ? (
          <Container style={{ alignItems: "center" }}>
            <Card
              style={{
                maxWidth: 545,
                marginTop: "10px",
                backgroundColor: "#F5ECAE",
              }}
            >
              <form onSubmit={handleFormSubmit} autoComplete="off">
                <div>
                  <label
                    htmlFor="title"
                    style={{ margin: "10px", paddingLeft: "15px" }}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    value={noteText.title}
                    id="title"
                    name="title"
                    required
                    onChange={onChangeInput}
                    style={{ marginTop: "10px", padding: "5px", width: "60%" }}
                  />
                </div>
                <div
                  className="row"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label htmlFor="content">
                    Content
                  </label>
                  <textarea
                    type="text"
                    value={noteText.text}
                    id="text"
                    name="text"
                    required
                    rows="10"
                    cols="10"
                    placeholder="Type to add a note..."
                    onChange={onChangeInput}
                    style={{ margin: "5px", width: "75%" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="createdAt"
                    style={{ margin: "10px", paddingLeft: "15px" }}
                  >
                    Due Date:
                  </label>
                  <input
                    type="date"
                    value={noteText.dueDate}
                    id="dueDate"
                    name="dueDate"
                    required
                    onChange={onChangeInput}
                    style={{ margin: "10px", padding: "5px" }}
                  />
                </div>
                <CardActions disableSpacing style={{justifyContent: 'center'}}>
                <button
                  type="submit"
                  style={{ margin: "20px" }}
                >
                  Save
                </button>
                {error && <div>{error.message}</div>}
                <StarNote/>
                </CardActions>
                <Link to="/">
                  <IconButton
                    aria-label="Return to Dashboard"
                    style={{ justifyContent: 'center' }}
                  >
                    <DashboardIcon />
                    <p style={{ marginLeft: "10px" }}>Go Back to Dashboard</p>
                  </IconButton>
                </Link>
                
              </form>
            </Card>
          </Container>
      ) : (
        <p>
          You need to be logged in to use lightning notes. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default EditNoteForm;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { ADD_NOTE } from "../../utils/mutations";
import { QUERY_NOTES } from "../../utils/queries";

import Auth from "../../utils/auth";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from '@material-ui/icons/Dashboard';

const CreatNoteForm = () => {
  // Getting category ID from the hash passed in via URL
  const tmp = window.location.hash;
  const temp = tmp.split("#");
  const categoryId = temp[1];
  console.log(categoryId);

  const history = useHistory();

  const [noteText, setNoteText] = useState("");


  const [addNote, { error }] = useMutation(ADD_NOTE, {
    update(cache, { data: { addNote } }) {
      console.log(cache);
      console.log(
        cache.readQuery({
          query: QUERY_NOTES,
          variables: { username: Auth.getProfile().data.username },
        })
      );
      try {
        const { notes = [] } = cache.readQuery({ query: QUERY_NOTES }) || {};
        console.log(notes);
        cache.writeQuery({
          query: QUERY_NOTES,
          data: { notes: [addNote, ...notes] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(Auth.getProfile().data.username);
    console.log(noteText);
    console.log(noteText.title);
    console.log(noteText.text);

    try {
      const { data } = await addNote({
        variables: {
          title: noteText.title,
          text: noteText.text,
          noteAuthor: Auth.getProfile().data.username,
          category: categoryId,
        },
      });
      console.log(data);

      setNoteText("");

      //history.push(`/categories/${categoryId}`);
      //window.location.reload();
    } catch (err) {
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
                marginTop:'10px',
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
                    style={{ margin: "10px", padding: "5px", width: "60%" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label htmlFor="text">
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
                    style={{ margin: "5px", width: "80%" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="createdAt"
                    style={{ margin: "10px", paddingLeft: "15px" }}
                  >
                    Date: {noteText.createdAt}
                  </label>
                  <input
                    type="date"
                    value={noteText.createdAt}
                    id="createdAt"
                    name="createdAt"
                    required
                    onChange={onChangeInput}
                    style={{ margin: "10px", padding: "5px" }}
                  />
                </div>
                <button
                  type="submit"
                  style={{ margin: "30px", marginLeft: "100px" }}
                >
                  Save
                </button>
                {error && <div>{error.message}</div>}
                <Link to="/">
                  <IconButton
                    aria-label="Return to Dashboard"
                    style={{justifyContent: 'center'}}
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

export default CreatNoteForm;

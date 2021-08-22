import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_NOTE } from "../../utils/mutations";
import { QUERY_NOTES } from "../../utils/queries";

import Auth from "../../utils/auth";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DashboardIcon from '@material-ui/icons/Dashboard';

const CreatNoteForm = () => {
  const [noteText, setNoteText] = useState("");
  // {
  //   title: "",
  //   text: "",
  //   createdAt: "",
  // }

  // const [characterCount, setCharacterCount] = useState(0);

  const [addNote, { error }] = useMutation(ADD_NOTE, {
    update(cache, { data: { addNote } }) {
      console.log(cache);
    console.log(cache.readQuery({ query: QUERY_NOTES, variables: {username: Auth.getProfile().data.username}}));
      try {
        const { notes = [] } = cache.readQuery({ query: QUERY_NOTES })|| {};
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
          // ...noteText,
          title: noteText.title,
          text: noteText.text,
          noteAuthor: Auth.getProfile().data.username,
        },
      });
      console.log(data);

      setNoteText("");
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeInput = (e) => {
    // const { name, value } = e.target;
    // // && value.length <= 280
    // console.log(name);
    // if (name === "noteText" && value.length <= 280) {
    //   setNoteText(value);
    //   setCharacterCount(value.length);
    // }
    const { name, value } = e.target;

    setNoteText({
      ...noteText,
      [name]: value,
    });
  };

  return (
    <div className="create-note">
      {Auth.loggedIn() ? (
        <>

          <Container style={{alignItems: 'center'}}>
          <Card style={{maxWidth: 545, margin: '50px', backgroundColor: '#F5ECAE'}}>
          <form onSubmit={handleFormSubmit} autoComplete="off">
            <div className="row">
              <label htmlFor="title" style={{margin: '20px', paddingLeft: '25px',}}>Title</label>
              <input
                type="text"
                value={noteText.title}
                id="title"
                name="title"
                required
                onChange={onChangeInput}
                style={{margin: '20px', padding: '10px', width: '70%'}}
              />
            </div>
            <div className="row">
              <label htmlFor="text" style={{margin: '20px', paddingLeft: '25px'}}>Content</label>
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
                style={{margin: '10px', width: '66%'}}
              />
            </div>
            <div className="row">
              <label htmlFor="createdAt" style={{margin: '20px', paddingLeft: '25px',}}>Date: {noteText.createdAt}</label>
              <input
                type="date"
                value={noteText.createdAt}
                id="createdAt"
                name="createdAt"
                required
                onChange={onChangeInput}
                style={{margin: '20px', padding: '10px'}}
              />
            </div>
            <button type="submit" style={{margin: '30px', marginLeft: '100px'}}>Save</button>
            {error && <div>{error.message}</div>}
            <IconButton aria-label="mark as important">
          <StarBorderIcon />
        </IconButton>
        <IconButton aria-label="Return to Dashboard">
          <DashboardIcon />
        </IconButton>
          </form>
          
          </Card>
          </Container>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CreatNoteForm;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_NOTE } from "../../utils/mutations";
import { QUERY_NOTES } from "../../utils/queries";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DashboardIcon from '@material-ui/icons/Dashboard';

import Auth from "../../utils/auth";

const EditNoteForm = () => {
  const [noteText, setNoteText] = useState("");
  //   {
  //     title: "",
  //     content: "",
  //     createdAt: "",
  //   }

  const [characterCount, setCharacterCount] = useState(0);

  const [addNote, { error }] = useMutation(ADD_NOTE, {
    update(cache, { data: { addNote } }) {
      try {
        const { notes = [] } = cache.readQuery({ query: QUERY_NOTES })|| {};

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

    try {
      const { data } = await addNote({
        variables: {
          // ...noteText,
          noteText,
          noteAuthor: Auth.getProfile().data.username,
        },
      });

      setNoteText("");
    } catch (err) {
      console.error(err);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    if (name === "noteText" && value.length <= 280) {
      setNoteText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="create-note">
      {Auth.loggedIn() ? (
        <>
        <Container style={{alignItems: 'center'}}>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
            style={{marginLeft: '100px', marginTop: '20px', paddingTop: '20px'}}
          >
            Character Count: {characterCount}/280
          </p>
          {/* <Container style={{alignItems: 'center'}}> */}
          <Card style={{maxWidth: 545, margin: '20px', backgroundColor: '#F5ECAE'}}>
          <form onSubmit={handleFormSubmit} autoComplete="off">
            <div >
              <label htmlFor="title" style={{margin: '20px', paddingLeft: '25px',}}>Title</label>
              <input
                type="text"
                value={noteText.title}
                id="title"
                name="title"
                required
                onChange={onChangeInput}
                style={{margin: '20px', padding: '10px', width: '50%'}}
              />
            </div>
            <div className="row" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <label htmlFor="content" style={{margin: '20px', paddingLeft: '25px'}}>Content</label>
              <textarea
                type="text"
                value={noteText.content}
                id="content"
                name="content"
                required
                rows="10"
                cols="10"
                placeholder="Type to add a note..."
                onChange={onChangeInput}
                style={{margin: '5px', width: '66%'}}
              />
            </div>
            <div >
              <label htmlFor="createdAt" style={{margin: '20px', paddingLeft: '20px',}}>Date: {noteText.createdAt}</label>
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
            <button type="submit" style={{margin: '20px', marginLeft: '100px'}}>Save</button>
            {error && <div>{error.message}</div>}
            <IconButton aria-label="mark as important">
          <StarBorderIcon />
        </IconButton>
        <Link to='/'>
      <IconButton aria-label="Return to Dashboard" style={{marginLeft: '100px'}}>
          <DashboardIcon /><p style={{ marginLeft: '10px'}}>Go Back to Dashboard</p>
      </IconButton>
      </Link>
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

export default EditNoteForm;

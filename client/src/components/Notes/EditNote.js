import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { EDIT_NOTE } from "../../utils/mutations";
import { QUERY_SINGLE_NOTE } from "../../utils/queries";
import { useParams } from 'react-router-dom';
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DashboardIcon from '@material-ui/icons/Dashboard';

import Auth from "../../utils/auth";

const EditNoteForm = () => {

  const noteId = useParams().id;

  //const [characterCount, setCharacterCount] = useState(0);
  const [updateNote, {error}] = useMutation(EDIT_NOTE);
  const { loading, data } = useQuery( QUERY_SINGLE_NOTE, {
    variables: {noteId},
  });
  console.log(data);
  const note = data?.note || [];
  console.log(note);

  const [noteText, setNoteText] = useState(
    {
      title: note.title,
      text: note.text,
      createdAt: "",
    }
    );

  // const [addNote, { error }] = useMutation(ADD_NOTE, {
  //   update(cache, { data: { addNote } }) {
  //     try {
  //       const { notes = [] } = cache.readQuery({ query: QUERY_NOTES })|| {};

  //       cache.writeQuery({
  //         query: QUERY_NOTES,
  //         data: { notes: [addNote, ...notes] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
      
  //   },
  // });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(note._id);
    console.log(noteText.title);
    console.log(noteText.text);
    console.log(Auth.getProfile().data.username);
    console.log(note.category._id);

    //still in progress
    try {
      const { data } = await updateNote({
        variables: {
          // ...noteText,
          noteId: note._id,
          title: noteText.title,
          text: noteText.text,
          category: note.category._id
        },
      });
      console.log(data);

      setNoteText("");
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
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
        <>
        <Container style={{alignItems: 'center'}}>
          {/* <p
            // className={`m-0 ${
            //   characterCount === 280 || error ? "text-danger" : ""
            // }`}
            style={{marginLeft: '200px', marginTop: '20px', paddingTop: '20px'}}
          >
            Character Count: {characterCount}/280
          </p> */}
          <Card style={{maxWidth: 545, margin: '20px', backgroundColor: '#F5ECAE'}}>
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
              <label htmlFor="content" style={{margin: '20px', paddingLeft: '25px'}}>Content</label>
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

export default EditNoteForm;

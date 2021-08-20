import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_NOTE } from "../../utils/mutations";
import { QUERY_NOTES, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const CreatNoteForm = () => {
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
        const { notes } = cache.readQuery({ query: QUERY_NOTES });

        cache.writeQuery({
          query: QUERY_NOTES,
          data: { notes: [addNote, ...notes] },
        });
      } catch (e) {
        console.error(e);
      }
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, notes: [...me.notes, addNote] } },
      });
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
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </p>

          <form onSubmit={handleFormSubmit} autoComplete="off">
            <div className="row">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                value={noteText.title}
                id="title"
                name="title"
                required
                onChange={onChangeInput}
              />
            </div>
            <div className="row">
              <label htmlFor="content">Content</label>
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
              />
            </div>
            <div className="row">
              <label htmlFor="createdAt">Date: {noteText.createdAt}</label>
              <input
                type="date"
                value={noteText.createdAt}
                id="createdAt"
                name="createdAt"
                required
                onChange={onChangeInput}
              />
            </div>
            <button type="submit">Save</button>
            {error && <div>{error.message}</div>}
          </form>
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

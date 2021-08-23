import React from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import { DELETE_NOTE } from "../../utils/mutations";
import { QUERY_NOTES } from "../../utils/queries";

const DeleteNote = () => {
  const noteId = useParams().id;
  console.log(noteId);
  const [deleteNote] = useMutation(DELETE_NOTE, {
    update(cache, { data: { deleteNote } }) {
      const { notes = [] } = cache.readQuery({ query: QUERY_NOTES }) || {};
      cache.writeQuery({
        query: QUERY_NOTES,
        data: { notes: notes.filter((e) => e.id !== noteId) },
      });
    },
  });

  const deleteNoteHandler = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      console.log("something");
      const { data } = await deleteNote({
        variables: {
          id: noteId,
        },
      });
      console.log(data);
      console.log("Hi");
    } catch (err) {
      console.error(err);
      console.log("by");
    }
  };

  return <button onClick={deleteNoteHandler}>Delete</button>;
};

export default DeleteNote;

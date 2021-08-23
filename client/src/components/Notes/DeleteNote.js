import React from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import { DELETE_NOTE } from "../../utils/mutations";
import { QUERY_NOTES } from "../../utils/queries";

const DeleteNote = () => {
  const noteId = useParams().id;
  console.log(noteId);
  const [deleteNote, { error }] = useMutation(DELETE_NOTE, {
    update(cache, { data: { deleteNote } }) {
      const { notes } = cache.readQuery({ query: QUERY_NOTES });
      cache.writeQuery({
        query: QUERY_NOTES,
        data: { notes: notes.filter((e) => e.id !== noteId) },
      });
    },
  });

  return (
    <button
      onClick={() => {
        deleteNote({
          variables: {
            _id: noteId,
          },
        });
      }}
    >
      Delete
    </button>
  );
};

export default DeleteNote;

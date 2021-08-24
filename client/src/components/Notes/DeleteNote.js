import React from "react";
import { useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { DELETE_NOTE } from "../../utils/mutations";
import { QUERY_NOTES } from "../../utils/queries";

const DeleteNote = () => {
  const history = useHistory();
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
      const { data } = await deleteNote({
        variables: {
          noteId: noteId,
        },
      });

      history.push(`/`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={deleteNoteHandler}>Delete</button>
      <Link to="/" exact>
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default DeleteNote;

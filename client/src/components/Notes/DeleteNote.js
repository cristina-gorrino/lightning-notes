import React from "react";
import { Mutation } from "react-apollo";

import { DELETE_NOTE } from "../../utils/mutations";
import { QUERY_NOTES } from "../../utils/queries";

const DeleteNote = ({ id }) => {
  return (
    <Mutation
      mutation={DELETE_NOTE}
      update={(cache, { data: { deleteNote } }) => {
        const { notes } = cache.readQuery({ query: QUERY_NOTES });
        cache.writeQuery({
          query: QUERY_NOTES,
          data: { notes: notes.filter((e) => e.id !== id) },
        });
      }}
    >
      {(deleteNote, { data }) => (
        <button
          onClick={(e) => {
            deleteNote({
              variables: {
                id,
              },
            });
          }}
        >
          Delete
        </button>
      )}
    </Mutation>
  );
};

export default DeleteNote;

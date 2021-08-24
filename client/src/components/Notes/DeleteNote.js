import React from "react";
import { Mutation } from "react-apollo";
import Auth from "../../utils/auth";
import { DELETE_NOTE } from "../../utils/mutations";
import { QUERY_NOTES } from "../../utils/queries";
import { Link } from "react-router-dom";

const DeleteNote = ({ id }) => {
  return (
    <div className="create-note">
      {Auth.loggedIn() ? (
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
      ) : (
        <p>
          You need to be logged in to use lightning notes. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default DeleteNote;

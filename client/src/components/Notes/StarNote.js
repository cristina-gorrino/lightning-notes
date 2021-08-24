import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { EDIT_NOTE } from "../../utils/mutations";
import { QUERY_SINGLE_NOTE } from "../../utils/queries";


const StarNote = (props) => {
  const noteId = useParams().id || props.noteId;
  console.log(noteId);

  const [updateNote, {error}] = useMutation(EDIT_NOTE);
  const { loading, data } = useQuery( QUERY_SINGLE_NOTE, {
    variables: {noteId},
  });
  const note = data?.note || [];
  console.log(note);


const currentStar = note.starred;


  const starNoteHandler = async (e) => {
    e.preventDefault();

    try {
        const { data } = await updateNote({
          variables: {
            // ...noteText,
            noteId: note._id,
            title: note.title,
            text: note.text,
            category: note.category._id,
            starred: !currentStar
          },
        });
        console.log(data);
  
        
      } catch (err) {
        console.log(JSON.stringify(err, null, 2))
        console.error(err);
      }
  };

  return (
      <div>
          <IconButton aria-label='mark as important' onClick={starNoteHandler}>
              {note.starred ? (
                <StarIcon />
              ) : (
                <StarBorderIcon />
              )}
          
        </IconButton>
      </div>
  )
  //<button onClick={starNoteHandler}>Delete</button>;
};

export default StarNote;

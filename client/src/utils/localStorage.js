// export const getSavedNote = () => {
//   const savedNote = localStorage.getItem("saved_notes")
//     ? JSON.parse(localStorage.getItem("saved_notes"))
//     : [];

//   return savedNote;
// };

// export const saveNote = (noteArr) => {
//   if (noteArr.length) {
//     localStorage.setItem("saved_notes", JSON.stringify(noteArr));
//   } else {
//     localStorage.removeItem("saved_notes");
//   }
// };

// export const removeNote = (note) => {
//   const savedNote = localStorage.getItem("saved_notes")
//     ? JSON.parse(localStorage.getItem("saved_notes"))
//     : null;

//   if (!savedNote) {
//     return false;
//   }

//   const updatedSavedNote = savedNote?.filter((savedNote) => savedNote !== note);
//   localStorage.setItem("saved_notes", JSON.stringify(updatedSavedNote));

//   return true;
// };

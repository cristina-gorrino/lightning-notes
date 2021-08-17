const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  
});

const Note = model('Note', noteSchema);

module.exports = Note;

const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
      type: String,
      required: true,
  },
  noteAuthor: {
      type: String,
      required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  starred: {
      type: Boolean,
      required: true,
      default: false
  },
  category: 
  {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },

  
});

const Note = model('Note', noteSchema);

module.exports = Note;

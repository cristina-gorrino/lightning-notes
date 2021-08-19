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
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  starred: {
      type: Boolean,
      required: true
  },
  category: 
  {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },

  
});

const Note = model('Note', noteSchema);

module.exports = Note;

const { Schema, model } = require('mongoose');

const nameSchema = new Schema({
  property: {
    type: String,
    required: true,
    unique: true,
  },
});

const nameOfModel = model('nameOfModel', nameSchema);

module.exports = nameOfModel;

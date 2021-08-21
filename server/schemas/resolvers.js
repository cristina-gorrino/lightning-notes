const { User, Note, Category } = require('../models');
const {signToken} = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('notes');
    },
    notes: async (parent, { username }) => {
      const params = username ? { username } : {};
      console.log(username);
      return await Note.find({noteAuthor: params.username}).sort({ createdAt: -1 });

    },
    me: async (parent, args, context) => {
      console.log(context.user._id)
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('notes');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
  },
  Mutation: {
    addUser: async (parent, {username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addNote: async (parent, { title, text, noteAuthor }) => {
      const note = await Note.create({ title, text, noteAuthor });
      
    
      await User.findOneAndUpdate(
        { username: noteAuthor },
        { $addToSet: { notes: note._id } }
      );
    
      return note;
    },

    addCategory: async (parent, { name }) => {
      const category = await Category.create({ name });
      return category;
    },
  },


};



module.exports = resolvers;

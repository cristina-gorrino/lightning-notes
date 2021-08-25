const { User, Note, Category } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("notes");
    },
    note: async (parent, { noteId }) => {
      const params = noteId ? { noteId } : {};
      return await Note.findOne({_id: params.noteId}).populate('category').sort({ createdAt: -1 });
    },
    notes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return await Note.find({ noteAuthor: params.username })
        .populate("category")
        .sort({ createdAt: -1 });
    },
    notesCat: async (parent, { category }) => {
      const params = category ? { category } : {};
      return await Note.find({category: params.category}).populate('category').sort({ starred: -1, createdAt: -1 });
    },
    categories: async (parent, args) => {
      return await Category.find({});
    },
    category: async (parent, { categoryId }) => {
      return await Category.findOne({ _id: categoryId });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addNote: async (parent, { title, text, noteAuthor, category, dueDate }) => {
      const note = await Note.create({ title, text, noteAuthor, category, dueDate });

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

    deleteNote: async (parent, { noteId }) => {
      console.log(noteId);

      const note = await Note.findOneAndDelete({ _id: noteId });
      return note;
    },
    editNote: async (parent, {noteId, title, text, dueDate, category, starred}) => {
      const note = await Note.findByIdAndUpdate(
        noteId, 
        {
          title: title,
          text: text,
          dueDate: dueDate,
          category: category,
          starred: starred,
        },
        {new:true}
      ).populate('category');
      return note;
    }
    
  },
};

module.exports = resolvers;

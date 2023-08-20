const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('./models'); // Import your Mongoose models

const resolvers = {
  Query: {
    // Define your query resolvers here
    me: async (_, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('savedBooks');
        return user;
      }
      throw new AuthenticationError('You are not logged in');
    },
  },
  Mutation: {
    // Define your mutation resolvers here
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user with this email found');
      }

      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: bookData } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      }
      throw new AuthenticationError('You are not logged in');
    },
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      }
      throw new AuthenticationError('You are not logged in');
    },
  },
};

module.exports = resolvers;

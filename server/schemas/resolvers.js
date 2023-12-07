const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id).select(
          '-__v -password'
        );

        return userData;
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    login: async (parent, args) => {
      const user = await User.findOne({email: args.email });

      const correctPass = await user.isCorrectPassword(args.password);

      if (!user || !correctPass) {
        return { message: `Wrong user/password!` };
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create({
        username: args.username,
        email: args.email,
        password: args.password,
      });

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const addedBook = await User.findByIdAndUpdate(
          context.user._id,
          {
            $addToSet: {
              savedBooks: {
                bookId: args.bookId,
                description: args.description,
                title: args.title,
                image: args.image,
                link: args.link,
                authors: args.authors,
              },
            },
          },
          { new: true }
        );

        return addedBook;
      }

      throw AuthenticationError;
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const removeBook = await User.findByIdAndUpdate(
          context.user._id,
          {
            $pull: { savedBooks: { bookId: args.bookId } },
          },
          { new: true }
        );
        return removeBook;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
const { AuthenticationError} = require('apollo-server-express');
const {User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async() => {
            return User.findOne({});

        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id}).populate('-_v -password')
                return userData;
            }
            throw new AuthenticationError ('You need to log in!');
        },

    },

    Mutation: {
        addUser: async (parent, {username,email,password}) => {
            const user = await User.create({username, email,password});
            const token = signToken(user);
            return { token,user};
        },
        login: async (parent, {email, password }) => {
            const user = await User.findOne({email});

            if (!user){
                throw new AuthenticationError('No user with this email');
            }
            const correctPassword =await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            return { token, user};
        },
        saveBook: async(parent,{ user, body }, context) => {
            if (context.user){
              const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
              return updatedUser;
            } 
              throw new AuthenticationError('You need to log in!');
            }
        },
        deleteBook: async (parent, { user, params }, context) => {
            if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { $pull: { savedBooks: { bookId: params.bookId } } },
              { new: true }
            );
            
            return updatedUser;
        }
    },
}

module.exports = resolvers;
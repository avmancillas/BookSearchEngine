const { AuthenticationError} = require('apollo-server-express');
const {User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        user: async() => {
            return User.find({});

        },

        me: async (parent, context) => {
            if (context.user) {
                return User.find({_id: context.user._id}).populate('-_v -password')
            }
            throw new AuthenticationError ('You need to log in!');
        },

    },

    Mutation: {
        
        login: async (parent, {email, password }) => {
            const user = await User.find({email});

            const correctPassword =await user.isCorrectPassword(password);

            const token = signToken(user);
            return { token, user};
        },
        
        addUser: async (parent, {username,email,password}) => {
            const user = await User.create({username, email,password});
            const token = signToken(user);
            return { token,user};
        },
        
        saveBook: async(parent,{ user, body }, context) => {
              const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
              return updatedUser;
            }, 
        
        deleteBook: async (parent, { user, params }, context) => {
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
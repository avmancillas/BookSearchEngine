const { gql } = require('apollo-server-express');

const typeDefs = gql `
   type User {
       _id: ID
       username: String
       email: String
       bookCount: Int
       savedBooks: [Book]
    }
    type Book {
        bookID: String
        author:String
        description:String 
        title: String
        image: String
        link:String
        
    }
    type Auth{
        token: ID!
        user: User
    }
    type Query{
        users: [User]
        user(username: String!): User
        me: User
    }
    type Mutation{
        addUser(username: String!, email: String!, password: String!: Auth)
        login(email: String!, password: String!): Auth
        saveBook(book: SavedBookInput): User
        deleteBook(bookId: String!): User
    }
    type SavedBookInput{
        authors: [String]
        description: String
        bookID: String
        image: String
        link:String
    }
`;
module.exports = typeDefs;
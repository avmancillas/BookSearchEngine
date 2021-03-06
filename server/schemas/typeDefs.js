const { gql } = require('apollo-server-express');

const typeDefs = gql `
   type User {
       _id: ID
       username: String
       email: String
       bookCount: Int
       savedBooks: [Book]
    }
    type Auth{
        token: ID!
        user: User
    }

    type Book {
        bookID: String
        author:String
        description:String 
        title: String
        image: String
        link:String
        
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
`;    
    
module.exports = typeDefs;
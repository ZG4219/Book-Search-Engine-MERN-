const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => {
      // logic to fetch books from a data source
    },
  },
};
module.exports = {
    typeDefs,
    resolvers,
  };
  
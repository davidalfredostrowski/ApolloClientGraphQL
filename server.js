ubuntu@ip-172-31-33-160:~/graphql-sample-server$ cat server.js
const cors = require('cors')
const express = require('express')
const graphqlHTTP   = require('express-graphql').graphqlHTTP;
const {
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString,
        GraphQLList,
        GraphQLInt,
        GraphQLNonNull
} = require('graphql')

const app = express()
app.use(cors())

const authors = [
        { id: 1, name: 'J. K. Rowling' },
        { id: 2, name: 'J. R. R. Tolkien' },
        { id: 3, name: 'Brent Weeks' }
]

const books = [
        { id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
        { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
        { id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
        { id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
        { id: 5, name: 'The Two Towers', authorId: 2 },
        { id: 6, name: 'The Return of the King', authorId: 2 },
        { id: 7, name: 'The Way of Shadows', authorId: 3 },
        { id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const BookType = new GraphQLObjectType({
        name: 'Book',
        description: 'This represents a books written by an author',
        fields: () => ({
                id: { type: GraphQLInt },
                name: { type: GraphQLString},
                authorId: { type: GraphQLInt }

                })
})

const RootQueryType = new GraphQLObjectType({
        name: 'Query',
        description: 'Root Query',
        fields: () => ({
                books: {
                        type: new GraphQLList(BookType),
                        description: 'List of All Books',
                        resolve: () => books
                }
        })
})


const schema  = new GraphQLSchema({
        query: RootQueryType,
})


//const schema = new GraphQLSchema({
//      query: new GraphQLObjectType({
//              name: 'HelloWorld',
//              fields: () => ({
//                      message: {
//                                      type: GraphQLString,
//                                      resolve: () => 'Hello World'
//                      }
//              })
//      })
//})

app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
}));




app.listen(4000., () => console.log('Server Running'))



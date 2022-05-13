//import React from 'react';
//import GetUsers from './GetUsers';
//import "./App.css";
import {
        ApolloClient,
        InMemoryCache,
        ApolloProvider,
        HttpLink,
        from
} from "@apollo/client";


import { onError } from '@apollo/client/link/error'



import React, { useEffect } from 'react'
import { useQuery,  gql} from '@apollo/client';
//import { LOAD_USERS } from '../GraphQL/Queries'

function GetUsers() {

const { error, loading, data } = useQuery(LOAD_USERS)


useEffect(() => {
                console.log(data);
        },[data])
        return  <div></div>
}

//export default GetUsers

//import {gql} from '@apollo/client'

export const LOAD_USERS = gql`
        query {
                books {
                        id
                        name
                }
        }
`




const errorLink = onError(({ graphqlErrors, networkError }) => {
        if (graphqlErrors) {
                graphqlErrors.map(({ message, location, path })=> {
                        alert(`Graphql error ${message}`);
                });
        }
});

const link = from([
        errorLink,
        new HttpLink({ uri: "http://ec2-34-217-2-202.us-west-2.compute.amazonaws.com:4000/graphql" }),
])
const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: link
});

function App(){
        return (

                <ApolloProvider client={client}>
                {" "}
                <GetUsers />
                </ApolloProvider>
        );
}

export default App;





//import React from 'react';

//const App = () => {
//      return (
//              <div>hi</div>
//      );
//}
//
//export default App

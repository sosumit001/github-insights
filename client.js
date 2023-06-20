import { ApolloClient,createHttpLink,InMemoryCache } from "@apollo/client";
import {setContext} from "@apollo/client/link/context"
import { GITHUB_ACCESS_TOKEN } from "./config";
const httpLink = createHttpLink({
    uri:'https://api.github.com/graphql'
})
const authLink = setContext((_,{headers})=> {
    return {
        headers: {
            ...headers,
            authorization:`Bearer ${GITHUB_ACCESS_TOKEN}`
        }
    }
})
const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client
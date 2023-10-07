import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import CreateHabitForm from "./views/CreateHabitForm";

const httpLink = createHttpLink({
  uri: "http://4.tcp.ngrok.io:12416/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiODJjODNiNzVmNGFiZTljMTNlY2YiLCJfaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY5NjcwNzAyMywiZXhwIjoxNjk2NzUwMjIzfQ.6JvRK7mZ7YMvfFZazUj7RbfcV9tNTm_V7iYaur3riJM";

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-auth-token": token ?? "",
    },
  };
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CreateHabitForm />
    </ApolloProvider>
  );
}

export default App;

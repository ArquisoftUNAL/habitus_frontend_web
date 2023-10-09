import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { MainPageTable } from "./components/MainPageTable";

const httpLink = createHttpLink({
  uri: "https://habitusgw-4rd4uo9b.b4a.run/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiODJjODNiNzVmNGFiZTljMTNlY2YiLCJfaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY5Njg3MjQ1MiwiZXhwIjoxNjk2OTE1NjUyfQ.3CdDNv89iDvf96Cq5TXrUDMNQVMXt4NeqhyZ4oXL4N0";

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
      <MainPageTable />
    </ApolloProvider>
  );
}

export default App;

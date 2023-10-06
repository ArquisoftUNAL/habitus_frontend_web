import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
// import LoginForm from "./views/LoginForm";
// import RegisterForm from "./views/RegisterForm";
import { NavBar } from "./components/NavBar";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://habitusgw-4rd4uo9b.b4a.run/" }),
]);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <NavBar />
    </ApolloProvider>
  );
}
export default App;

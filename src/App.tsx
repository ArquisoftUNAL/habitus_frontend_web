import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { setContext } from "@apollo/client/link/context";
import { MainPageTable } from "./components/MainPageTable";
import CreateHabitForm from "./views/CreateHabitForm";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";

const httpLink = createHttpLink({
  uri: "https://habitusgw-4rd4uo9b.b4a.run/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("x-auth-token");

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
      <Router>
        <Routes>
          <Route path="/" element={<MainPageTable />} />
          <Route path="/addHabit" element={<CreateHabitForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;

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
import { RadarChart } from "./components/RadarChart";

const httpLink = createHttpLink({
  uri: "https://habitusgw-4rd4uo9b.b4a.run/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFiODJjODNiNzVmNGFiZTljMTNlY2YiLCJfaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY5NzAyOTQzNiwiZXhwIjoxNjk3MDcyNjM2fQ.744MimABE64x4UBPIq1p3zokHjU5VRlx6-nbjoP02Rc";

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
          <Route path="/statistic" element={<RadarChart />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;

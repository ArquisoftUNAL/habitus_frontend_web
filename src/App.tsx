import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setContext } from "@apollo/client/link/context";
import CreateHabitForm from "./views/CreateHabitForm";
import LoginForm from "./views/LoginForm";
import RegisterForm from "./views/RegisterForm";
import CalendarView from "./views/CalendarView";
import { RadarChart } from "./components/RadarChart";
import MainPage from "./views/MainPage";
import Notifications from "./views/Notifications";
import StatisticsView from "./views/StatisticsView";
import AchievementsView from "./views/AchievementsView";

const httpLink = createHttpLink({
  //uri: "https://habitus-gateway-ik25vlw3ta-rj.a.run.app/",
  uri: "http://localhost:4000/",
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
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/addHabit" element={<CreateHabitForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/statistic" element={<RadarChart />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/statistics" element={<StatisticsView />} />
          <Route path="/achievements" element={<AchievementsView />} />
        </Routes >
      </Router >
    </ApolloProvider >
  );
}

export default App;

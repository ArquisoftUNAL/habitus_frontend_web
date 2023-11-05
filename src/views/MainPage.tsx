import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useLazyQuery } from "@apollo/client";

import { MainPageTable } from "../components/MainPage/MainPageTable";
import { NavBar } from "../components/NavBar";

import { toast } from 'react-toastify';

import "./../styles/GeneralStyles.css";

import { GET_USER } from "./../graphql/UserQueries";
import LoadingView from "../views/LoadingView";

const MainPage = () => {

  const navigate = useNavigate();

  const [fetchUser, { data, loading, error }] = useLazyQuery(GET_USER);

  useEffect(
    () => {
      const token = localStorage.getItem("x-auth-token");
      if (!token) {
        toast.warning("User is not logged in!");
        navigate("/login");
        return;
      }

      fetchUser();
    }
    ,
    []
  )

  if (loading || (!data && !error)) {
    return <LoadingView />;
  }

  if (error) {
    localStorage.removeItem("x-auth-token");
    navigate("/login");
  }

  return (
    <div>
      <NavBar />
      <div className="col-12 text-center habitus-page-title habitus-with-bottomline">
        Main Page
      </div>
      <div className="habitus-separator"></div>
      <div className="row">
        <div className="col-4 offset-4 text-center">
          <a className="btn" href="/addHabit" style={{ marginTop: "20px", color: "white" }}>
            Add habit
          </a>
        </div>
      </div>
      <MainPageTable />
    </div>
  );
};

export default MainPage;

import { MainPageTable } from "../components/MainPage/MainPageTable";
import { NavBar } from "../components/NavBar";

import "./../styles/GeneralStyles.css";

const MainPage = () => {
  return (
    <div>
      <NavBar />
      <div className="col-12 text-center habitus-page-title habitus-with-bottomline">
        Main Page
      </div>
      <div className="habitus-separator"></div>
      <a className="btn" href="/addHabit" style={{ marginTop: "20px", color: "white" }}>
        Add habit
      </a>
      <MainPageTable />
    </div>
  );
};

export default MainPage;

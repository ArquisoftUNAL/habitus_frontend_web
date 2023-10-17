import { MainPageTable } from "../components/MainPage/MainPageTable";
import { NavBar } from "../components/NavBar";

const MainPage = () => {
  return (
    <div>
      <NavBar />
      <a className="btn" href="/addHabit" style={{marginTop: "20px", color: "white"}}>
        Add habit
      </a>
      <MainPageTable />
    </div>
  );
};

export default MainPage;

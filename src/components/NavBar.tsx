import logoImage from "../assets/Logo.svg";
import userIcon from "../assets/user.png";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <img src={logoImage} alt="Habitus Logo" width="60" height="54" className="logo-image" />
        <a className="navbar-brand text-white" href="#">
          Habitus
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Statistics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Achievements
              </a>
            </li>
          </ul>
        </div>
        <img src={userIcon} alt="User icon" width="40" height="35" id="user-icon" />
      </div>
    </nav>
  );
};

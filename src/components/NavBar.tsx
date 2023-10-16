import logoImage from "../assets/Logo.svg";
import userIcon from "../assets/user.png";
import "../styles/NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <img
          src={logoImage}
          alt="Habitus Logo"
          width="60"
          height="54"
          className="logo-image"
        />
        <a className="navbar-brand text-white" href="/">
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
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/statistics">
                Statistics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/achievements">
                Achievements
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/calendar">
                Calendar
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/notifications">
                Notifications
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown-center">
          <img
            data-bs-toggle="dropdown"
            aria-expanded="false"
            src={userIcon}
            alt="User Icon"
            width="30"
            height="30"
            id="user-icon"
          />
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  );
};

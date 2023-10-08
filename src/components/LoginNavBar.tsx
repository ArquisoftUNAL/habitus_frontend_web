import logoImage from "../assets/Logo.svg";
import userIcon from "../assets/user.png";
import "../styles/NavBar.css";

export const LoginNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <div>
            <img
              src={logoImage}
              alt="Habitus Logo"
              width="60"
              height="54"
              className="logo-image"
            />
            <a className="navbar-brand text-white" href="#">
              Habitus
            </a>
        </div>
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
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

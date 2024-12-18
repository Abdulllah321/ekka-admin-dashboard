import UserImage from "../../assets/img/user/user.png";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="ec-main-header" id="header">
      <nav className="navbar navbar-static-top navbar-expand-lg">
        <button
          id="sidebar-toggler"
          className="sidebar-toggle"
          onClick={toggleSidebar}
        ></button>
        <div className="search-form d-lg-inline-block">
          <div className="input-group">
            <input
              type="text"
              name="query"
              id="search-input"
              className="form-control"
              placeholder="search.."
              autoComplete="off"
            />
            <button
              type="button"
              name="search"
              id="search-btn"
              className="btn btn-flat"
            >
              <i className="mdi mdi-magnify"></i>
            </button>
          </div>
          <div id="search-results-container">
            <ul id="search-results"></ul>
          </div>
        </div>

        <div className="navbar-right">
          <ul className="nav navbar-nav">
            <li className="dropdown user-menu mr-3">
              <button
                className="dropdown-toggle nav-link ec-drop"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={UserImage} className="user-image" alt="User Image" />
              </button>
              <ul className="dropdown-menu dropdown-menu-right ec-dropdown-menu">
                <li className="dropdown-header">
                  <img
                    src={UserImage}
                    className="img-circle"
                    alt="User Image"
                  />
                  <div className="d-inline-block">
                    John Deo{" "}
                    <small className="pt-1">john.example@gmail.com</small>
                  </div>
                </li>
                <li>
                  <a href="user-profile.html">
                    <i className="mdi mdi-account"></i> My Profile
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="mdi mdi-email"></i> Message
                  </a>
                </li>
                <li>
                  <a href="#">
                    {" "}
                    <i className="mdi mdi-diamond-stone"></i> Projects{" "}
                  </a>
                </li>
                <li className="right-sidebar-in">
                  <a href="javascript:0">
                    {" "}
                    <i className="mdi mdi-settings-outline"></i> Setting{" "}
                  </a>
                </li>
                <li className="dropdown-footer">
                  <a href="index.html">
                    {" "}
                    <i className="mdi mdi-logout"></i> Log Out{" "}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

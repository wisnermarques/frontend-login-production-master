import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {
  const navigate = useNavigate();

  const { signout, signed } = useAuth();

  const handleSignOut = () => {
    signout();

    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
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

          <Link className="navbar-brand" to="/">
            Meu App
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/lista">
                  Lista
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contato">
                  Contato
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sobre">
                  Sobre
                </Link>
              </li>
            </ul>

            {signed ? (
              <button
                className="btn btn-danger ms-auto mb-2"
                onClick={handleSignOut}
              >
                <i className="bi bi-person"></i>
                &nbsp;Sair
              </button>
            ) : (
              <Link className="btn btn-primary ms-auto mb-2" to="/login">
                <i className="bi bi-person"></i>
                &nbsp;Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

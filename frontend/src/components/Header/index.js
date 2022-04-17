import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaChartArea,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../../state/actions/user.js";

function Header() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const onLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        {user && (
          <ul>
            <li>
              <Link to="/">
                <FaHome /> Trackings
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaChartArea />
                Dashboard
              </Link>
            </li>
          </ul>
        )}
      </div>

      <ul>
        {user ? (
          <>
            <li>
              <span>Welcome:{user.name} </span>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;

import { FC, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import UserContext from "../../context/UserContext";
import styles from "./TopBar.module.css";
import * as authService from "../../services/auth";
import { handleServerError } from "../../utils";

const TopBar: FC = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  async function handleLogout() {
    try {
      await authService.logOut();
      history.push("/login");
    } catch (error) {
      handleServerError(error);
    }
  }

  return (
    <header className={styles.topbar}>
      <Link to="/">Wishlistify</Link>
      <nav>
        <ul>
          <li>
            {user === null && <Link to="/login">Log In</Link>}
            {user && <button onClick={handleLogout}>Log Out</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TopBar;

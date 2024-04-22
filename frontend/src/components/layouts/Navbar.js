import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import Logo from "../../assets/img/logo.jpeg";

// Context
import { Context } from "../../context/UserContext";

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Link to="/">
          <img src={Logo} alt="Manthano" />
        </Link>
      </div>
      <h3>Manthano</h3>
      <ul className={styles.navbar_links}>
        <li>
          <Link to="/posts">Home</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
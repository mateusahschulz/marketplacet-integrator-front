import { Link } from "react-router-dom";

import "../assets/css/sass/sidebar.scss"
import classNames from "classnames";

interface SideBar {
  hideMenu: () => void;
  isMenuHidden: boolean;
}

export default function SideBar({ hideMenu, isMenuHidden }: SideBar) {

  return (
    <div className={classNames("sidebar", { "menu-hidden": isMenuHidden })}>
      <div className="hamburger" onClick={hideMenu}>
        ☰
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/app/about">About</Link>
          </li>
          <li>
            <Link to="/app/itemList">Produtos</Link>
          </li>
          <li>
            <Link to="/app/infoUser/1">Informações de usuário</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
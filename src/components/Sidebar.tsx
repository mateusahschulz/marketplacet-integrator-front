import { Link, useLocation } from "react-router-dom";

import "../assets/css/sass/sidebar.scss"
import classNames from "classnames";
import LogoutSVG from "../assets/svg/logout";
import InfoUserSVG from "../assets/svg/infoUser";
import SearchSVG from "../assets/svg/search";
import HamburguerMenuSVG from "../assets/svg/hamburguerMenu";

interface SideBar {
  hideMenu: () => void;
  isMenuHidden: boolean;
}

export default function SideBar({ hideMenu, isMenuHidden }: SideBar) {
  const { pathname } = useLocation();

  return (
    <div className={classNames("sidebar", { "menu-hidden": isMenuHidden })}>
      <div className="hamburger" onClick={hideMenu}>
        <HamburguerMenuSVG />
      </div>
      <nav className="nav">
        <ul>
          <li className={classNames({ "selected": pathname.includes("itemList") })}>
            <SearchSVG />
            <Link to="/app/itemList">Pesquisas</Link>
          </li>
          <li className={classNames({ "selected": pathname.includes("infoUser") })}>
            <InfoUserSVG />
            <Link to="/app/infoUser/1">Informações de usuário</Link>
          </li>
          <li>
            <LogoutSVG />
            <Link to="/app/infoUser/1">Desconectar</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
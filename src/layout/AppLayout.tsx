import { ReactNode, useState } from "react";
// import { useLocation } from "react-router-dom";
import SideBar from "../components/Sidebar";
import classNames from "classnames";

interface AppLayout {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayout) {
  // const { pathname } = useLocation();

  const [hide, setHide] = useState(false);

  const hideMenu = () => {
    setHide((prev) => !prev);
  }

  return (
    <div id="app-container" /* className={containerClassnames}*/>
      {/* <TopNav /> */}
      <SideBar hideMenu={hideMenu} isMenuHidden={hide} /* pathname={pathname} */ />
      <main className={classNames("container-main", {
        "menu-hidden": hide,
      })}>
        <div className="container-fluid">{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
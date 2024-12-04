import { lazy } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import ListItens from "../views/listItens";
import ItemRegistry from "../views/itemRegistry";
import InfoUser from "../views/infoUser";

const AppView = lazy(() => import("../views/index"))
const LoginView = lazy(() => import("../views/login"))
const SignUpView = lazy(() => import("../views/signup"))


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />
        {/* TODO chamar aqui o index que tenha a sidebar */}
        <Route path="/app" element={<AppView />}>
          <Route index path="itemList" element={<ListItens />}/>
          <Route path="itemRegistry" element={<ItemRegistry />}/>
          <Route path="infoUser/:id" element={<InfoUser />}/>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login" element={<LoginView />}/>
        <Route path="/signup" element={<SignUpView />}/>
      </Routes>
    </BrowserRouter>
  );
}


const NotFound = () => <h1>404 - Not Found</h1>;
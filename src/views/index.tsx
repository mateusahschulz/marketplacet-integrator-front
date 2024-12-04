import { Suspense } from "react";
import { AppLayout } from "../layout/AppLayout";
import { /*  Navigate, */ Outlet } from "react-router-dom";
// import { getCurrentUser } from "../helpers/utilities";

export default function AppComponent() {

  /* TODO validar aqui se estou logado  */
  // if(!getCurrentUser()) {
  //   return <Navigate replace /* state={{ pathname }} */ to="/login" />;
  // }

  return (
    <AppLayout>
      <Suspense fallback={<div className='loading'/>}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
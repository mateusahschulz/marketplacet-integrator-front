import { NavLink, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

interface BreadCrumbProps {
  heading: string;
}

export default function BreadCrumb({ heading }: BreadCrumbProps) {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <h1>{heading}</h1>
      <Breadcrumb className="d-inline-block p-4">
        <BreadcrumbItem>
          <NavLink to="/">Home</NavLink>
        </BreadcrumbItem>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <BreadcrumbItem active key={name}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem key={name}>
              <NavLink to={routeTo}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </NavLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      {/* <Separator /> */}
    </>
  );
}
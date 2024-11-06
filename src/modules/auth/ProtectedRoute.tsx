import { Navigate, PathRouteProps, useLocation } from "react-router-dom";
import { useAppSelector } from "../../configs/store";

interface IOwnProps extends PathRouteProps {
  hasAnyRoles?: string[];
  children: React.ReactNode;
}

export const hasAnyRole = (roles: string[], hasAnyRoles: string[]) => {
  if (roles && roles.length !== 0) {
    if (hasAnyRoles.length === 0) {
      return true;
    }
    return hasAnyRoles.some((role) => roles.includes(role));
  }
  return false;
};

export const ProtectedRoute: React.FC<IOwnProps> = ({
  children,
  hasAnyRoles = [],
  ...rest
}: IOwnProps) => {
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated,
  );
  const sessionHasBeenFetched = useAppSelector(
    (state) => state.authentication.sessionHasBeenFetched,
  );
  const roles = useAppSelector((state) => state.authentication.roles);

  const isAuthorized = hasAnyRole(roles, hasAnyRoles);
  const location = useLocation();

  if (!children) {
    throw new Error(
      `A component needs to be specified for private route for path ${
        (rest as any).path
      }`,
    );
  }

  if (isAuthenticated) {
    if (isAuthorized) {
      return <div>{children}</div>;
    }
    return (
      <div className="insufficient-authority">
        <div className="alert alert-danger">
          You are not authorized to access this page.
        </div>
      </div>
    );
  }

  return (
    <Navigate
      to={{
        pathname: "/",
        search: location.search,
      }}
      replace
      state={{ from: location }}
    />
  );
};

export default ProtectedRoute;

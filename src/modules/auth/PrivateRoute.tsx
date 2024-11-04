import { PathRouteProps, Route } from "react-router-dom";

interface IOwnProps extends PathRouteProps {
  roles?: string[];
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<IOwnProps> = ({
  children,
  roles = [],
  ...rest
}: IOwnProps) => {
  return <Route></Route>;
};

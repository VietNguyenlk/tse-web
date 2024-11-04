import { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../configs/store";
import { logout } from "./authentication.reducer";

const Logout: React.FC = () => {
  const authentication = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(logout());

    if (authentication.logoutUrl) {
      window.location.href = authentication.logoutUrl;
    } else if (!authentication.isAuthenticated) {
      window.location.href = "/";
    }
  });

  return (
    <div>
      <h4>Logged out successfully!</h4>
    </div>
  );
};

export default Logout;

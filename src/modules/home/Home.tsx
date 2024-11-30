import React from "react";
import { useLocation } from "react-router-dom";
import { JwtPayload } from "../../shared/utils/jwt-utils";
import { userService } from "../../services/user.service";
import { useEffect } from "react";
import { IUser } from "../../shared/models/user.model";
import SideBarMenuMembers from "../../components/sidebars/SideBarMenuMembers";
// import { UserEntity } from

export const Home: React.FC = () => {
  const location = useLocation();
  // const userInfo = location.state?.userInfo as JwtPayload;
  // userInfo là String
  const userInfo = location.state.userInfo as string;
  // console.log("dd",userInfo);
  const [user, setUser] = React.useState<IUser | null>(null);
  // get user info api lay userInfo.sub
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await userService.getUserInfo(userInfo.sub);
        const data = await userService.getUserInfo(userInfo);
        setUser(data.userInfo);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
    // }, [userInfo.sub]);
  }, [userInfo]);
  return (
    <div className="bg-slate-500  ">
      <SideBarMenuMembers user={user} />
      {/* <SideBarMenuMembers  /> */}
      {/* <h1 className="text-white text-2xl">{userInfo.username}</h1> */}
    </div>
  );
};

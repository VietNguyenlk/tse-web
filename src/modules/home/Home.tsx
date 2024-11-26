import React from "react";
import SideBarMenuMembers from "../../components/sidebars/SideBarMenuMembers";
// import { useLocation } from "react-router-dom";
// import { JwtPayload } from "../types/jwt.types";
// import {userService} from "../services/user.service";
// import { useEffect } from "react";
// import { UserEntity } from 

export const  Home: React.FC = () => {
  // const location = useLocation();
  // const userInfo = location.state?.userInfo as JwtPayload;
  // const [user, setUser] = React.useState<UserEntity | null>(null);
  // get user info api lay userInfo.sub
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await userService.getUserInfo(userInfo.sub);
  //       setUser(data.userInfo);
  //     } catch (error) {
  //       console.error("Failed to fetch data", error);
  //     }
  //   }
  //   fetchData();
  // }, [userInfo.sub]);
  return (
  <div className="bg-slate-500  ">

    {/* <SideBarMenuMembers user={user} /> */}
    <SideBarMenuMembers  />
    {/* <h1 className="text-white text-2xl">{userInfo.username}</h1> */}

    </div>
    );
};


import { ArrowForward, Check, Close, DoneAll } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IUser } from "../../../shared/models/user.model";
import UserIntro from "../../administration/user-management/users/UserIntro";
import { useAppDispatch, useAppSelector } from "../../../configs/store";
import { activateUsers, resetState } from "./account-activate.reducer";
import { useNotifications } from "../../../shared/hooks/notification.hook";
import Notification from "../../../components/notifications/Notification";
import LoadingIndicator from "../../../components/loading/LoadingIndicator";
import EmptyList from "../../../components/loading/EmptyList";
import LoadingOverlay from "../../../components/loading/LoadingOverlay";
import {userService} from "../../../services/user.service";

interface RegistrationProps {
  headers: string[];
  users: ReadonlyArray<IUser>;
  isLoading: boolean;
  setReload: () => void;
}

const RegistrationTable: React.FC<RegistrationProps> = ({
  headers,
  users,
  isLoading,
  setReload,
}) => {
  const notificationTimeOut = 5000;
  const { addNotification, notifications, removeNotification } = useNotifications();
  const dispatch = useAppDispatch();
  const activateSelector = useAppSelector((state) => state.activateUser);
  const [isRowHover, setRowHover] = useState(false);
  const [userHover, setUserHover] = useState<string>("");
  const [usersSelected, setUsersSelected] = useState<string[]>([]);
  const [allUserSelected, toggleAllUserSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleActivateUsers = (userId?: string) => {
    if (usersSelected.length < 2) {
      dispatch(activateUsers([userId]));
    } else {
      dispatch(activateUsers(usersSelected));
    }
  };

  useEffect(() => {
    if (
      activateSelector.changeActivationFailure &&
      activateSelector.changeActivationErrorMessage
    ) {
      addNotification(
        "ERROR",
        "Có lỗi xảy ra",
        activateSelector.changeActivationErrorMessage,
      );
      dispatch(resetState());
    }

    if (
      activateSelector.changeActivationSuccess &&
      activateSelector.changeActivationSuccessMessage
    ) {
      addNotification(
        "SUCCESS",
        "Thành công",
        activateSelector.changeActivationSuccessMessage,
      );
      dispatch(resetState());
      setReload();
    }
  }, [
    activateSelector.changeActivationSuccess,
    activateSelector.changeActivationFailure,
    activateSelector.changeActivationErrorMessage,
    activateSelector.changeActivationSuccessMessage,
  ]);
  // deni register userIds: string[]
  // viết hàm denyRegisterRequest để gọi api từ userService
  const denyRegisterRequest = async (userIds: string[]) => {
    try {
      await userService.denyRegisterRequest(userIds);
      addNotification("SUCCESS", "Thành công", "Từ chối yêu cầu đăng ký thành công");
      setReload();
    } catch (error) {
      addNotification("ERROR", "Có lỗi xảy ra", error.message);
    }
  };
  return (
    <>
      <div className="fixed top-0 right-0 z-50">
        {notifications.map((notification, index) => (
          <Notification
            isShow={notification.show}
            key={notification.id}
            {...notification}
            index={index}
            onClose={() => removeNotification(notification.id)}
            duration={notificationTimeOut}
            autoClose={true}
          />
        ))}
      </div>

      <div className="relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-base text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={allUserSelected}
                    className="hover:cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => {
                      setUsersSelected(
                        allUserSelected ? [] : users.map((user) => user.userId),
                      );
                      toggleAllUserSelected(!allUserSelected);
                    }}
                  />
                </div>
              </th>
              {headers.map((header, index) => (
                <th scope="col" className=" py-3" key={index}>
                  <div className="flex items-center">
                    <button onClick={() => console.log("sort")}>
                      <svg
                        className="w-3 h-3 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </button>
                    {header}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length <= 0 ? (
              <tr>
                <td colSpan={headers.length + 1}>
                  <EmptyList />
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                  onMouseEnter={() => {
                    setRowHover(true);
                    setUserHover(user.userId);
                  }}
                  onMouseLeave={() => {
                    setRowHover(false);
                    setUserHover("");
                  }}
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        checked={usersSelected.includes(user.userId)}
                        onChange={() => {
                          if (usersSelected.includes(user.userId)) {
                            setUsersSelected(
                              usersSelected.filter((id) => id !== user.userId),
                            );
                          } else {
                            setUsersSelected([...usersSelected, user.userId]);
                          }
                          toggleAllUserSelected(false);
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="text-base">{user.userId}</td>
                  <td>
                    <div className="h-20 min-w-20 flex items-center">
                      {userHover === user.userId ? (
                        <div className="relative overflow-hidden bg-transition border hover:border-transparent rounded-lg group">
                          <div
                            className={`absolute top-0 left-0 w-[150%] h-full
                     bg-gradient-to-r from-violet-500 to-fuchsia-500
                     -translate-x-full group-hover:translate-x-0
                     transition-transform duration-500 ease-in-out`}
                          ></div>
                          <button
                            className="relative px-4 py-4 text-black hover:text-white flex items-center space-x-2"
                            onClick={() => {
                              console.log("View user: ", user.userId);
                            }}
                          >
                            <ArrowForward />
                            <span className="text-base font-medium">
                              Xem thông tin
                            </span>
                          </button>
                        </div>
                      ) : (
                        <UserIntro
                          email={user.email}
                          name={user.firstName + user.lastName}
                        />
                      )}
                    </div>
                  </td>
                  <td className=" text-base">{user.userType}</td>
                  <td className=" text-base">{user.faculty}</td>
                  <td>
                    <div
                      className={`bg-blue-500 inline-block text-base uppercase px-4 py-2 rounded text-white font-semibold`}
                    >
                      {{ PENDING_APPROVAL: "Chờ duyệt" }[user.status]}
                    </div>
                  </td>
                  {usersSelected.length > 1 && index === 0 ? (
                    <td rowSpan={users.length} className=" text-base space-x-3 ">
                      <div className="flex justify-center space-x-3">
                        <button
                          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                          onClick={() => {
                            handleActivateUsers();
                          }}
                        >
                          <DoneAll />
                          &nbsp;Chấp nhận
                        </button>
                        <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
                          <Close /> Từ chối
                        </button>
                      </div>
                    </td>
                  ) : usersSelected.length <= 1 ? (
                    <td className=" text-base space-x-3">
                      <button
                        className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                        onClick={() => {
                          handleActivateUsers(user.userId);
                        }}
                      >
                        <Check />
                        Chấp nhận
                      </button>
                      <button
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                        onClick={() => {
                          denyRegisterRequest([user.userId]);
                        }}
                      >
                        <Close /> Từ chối
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <LoadingOverlay isLoading={activateSelector.loading} minTimeout={100} />
      </div>
      {/* <UserActionModal
        selectedUser={selectedUser}
        setSelectedUser={() => setSelectedUser(null)}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></UserActionModal> */}
    </>
  );
};

export default RegistrationTable;

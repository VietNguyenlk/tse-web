interface UserIntroProps {
  imgUrl?: string;
  name: string;
  email: string;
}

const UserIntro: React.FC<UserIntroProps> = ({ email, name, imgUrl }) => {
  return (
    <div className="flex items-center py-4 text-gray-900 whitespace-nowrap dark:text-white">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-red-200">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="ps-3">
        <div className="text-base font-semibold text-sm">{name}</div>
        <div className="font-normal text-gray-500 text-xs">{email}</div>
      </div>
    </div>
  );
};

export default UserIntro;

interface UserIntroProps {
  imgUrl?: string;
  name: string;
  email: string;
}

const UserIntro: React.FC<UserIntroProps> = ({ email, name, imgUrl }) => {
  return (
    <div className="flex items-center py-4 text-gray-900 whitespace-nowrap dark:text-white">
      <img
        className="w-10 h-10 rounded-full"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/1920px-React_Logo_SVG.svg.png"
        alt="Jese"
      />
      <div className="ps-3">
        <div className="text-base font-semibold text-sm">Neil Sims</div>
        <div className="font-normal text-gray-500 text-xs">
          neil.sims@flowbite.com
        </div>
      </div>
    </div>
  );
};

export default UserIntro;

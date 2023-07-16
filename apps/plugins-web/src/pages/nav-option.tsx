import { Link } from "react-router-dom";

type NavOptionProps = {
  active: boolean;
  tabName: string;
  id: string;
  icon: string;
  onClick: () => void;
};


const NavOption = ({ active, tabName, icon, id, onClick }: NavOptionProps) => {
  return (
    <Link to={`tab/${id}`} onClick={onClick}>
      <div
        className={`${
          active
            ? "bg-white border-l-[5px] border-red-600"
            : "hover:bg-slate-50"
        } flex items-center pl-4 transition-all hover:cursor-pointer`}
      >
        {icon}
        <h6 className="mt-3 mb-3 font-normal">{tabName}</h6>
      </div>
    </Link>
  );
};

export default NavOption;

import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export type NavOptionProps = {
  active: boolean;
  tabName: string;
  id: string;
  onClick: () => void;
};

export const NavOption = ({
  active,
  tabName,
  children,
  id,
  onClick,
}: PropsWithChildren<NavOptionProps>) => {
  return (
    <Link to={`tab/${id}`} onClick={onClick}>
      <div
        className={`${
          active
            ? "bg-white border-l-[5px] border-red-600"
            : "hover:bg-slate-50"
        } flex items-center pl-4 transition-all hover:cursor-pointer`}
      >
        {children}
        <h6 className="mt-3 mb-3 font-normal">{tabName}</h6>
      </div>
    </Link>
  );
};
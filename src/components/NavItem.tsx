import React from "react";

interface NavItemProps {
  onClick: () => void;
  icon: JSX.Element;
  label: string;
}

export default function NavItem({ onClick, icon, label }: NavItemProps) {
  return (
    <button className="flex items-center space-x-3 hover:bg-gray-700 rounded-md p-2" onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

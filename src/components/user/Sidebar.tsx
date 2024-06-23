// Sidebar.tsx
import React from "react";

interface SidebarProps {
  onNavigation: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigation }) => {
  const handleNavigation = (section: string) => {
    onNavigation(section);
  };

  return (
    <div className="bg-gray-800 text-white w-64 p-6 flex flex-col">
      <div className="mb-6">
        <img
          alt="Company Logo"
          className="mx-auto"
          height={48}
          src="/placeholder.svg"
          style={{
            aspectRatio: "48/48",
            objectFit: "cover",
          }}
          width={48}
        />
        <h2 className="mt-4 text-center text-2xl font-bold">User Dashboard</h2>
      </div>
      <nav className="flex-1 space-y-4">
        <button
          className="flex items-center space-x-3 hover:bg-gray-700 rounded-md p-2"
          onClick={() => handleNavigation("courses")}
        >
          <span>My Courses</span>
        </button>
        <button
          className="flex items-center space-x-3 hover:bg-gray-700 rounded-md p-2"
          onClick={() => handleNavigation("profile")}
        >
          <span>Profile</span>
        </button>
        <button
          className="flex items-center space-x-3 hover:bg-gray-700 rounded-md p-2"
          onClick={() => handleNavigation("payments")}
        >
          <span>Payments</span>
        </button>
        <button
          className="flex items-center space-x-3 hover:bg-gray-700 rounded-md p-2"
          onClick={() => handleNavigation("notifications")}
        >
          <span>Notifications</span>
        </button>
        <button
          className="flex items-center space-x-3 hover:bg-gray-700 rounded-md p-2"
          onClick={() => handleNavigation("settings")}
        >
          <span>Settings</span>
        </button>
      </nav>
      <div className="mt-auto">
        <button className="flex items-center space-x-3 hover:bg-gray-700 rounded-md p-2">
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

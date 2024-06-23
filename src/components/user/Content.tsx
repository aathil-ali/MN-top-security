// Content.tsx
import React from "react";

interface ContentProps {
  activeSection: string;
}

const Content: React.FC<ContentProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "courses":
        return (
          <section>
            <h2>My Courses</h2>
            {/* Your courses content goes here */}
          </section>
        );
      case "profile":
        return (
          <section>
            <h2>Profile</h2>
            {/* Your profile content goes here */}
          </section>
        );
      case "payments":
        return (
          <section>
            <h2>Payments</h2>
            {/* Your payments content goes here */}
          </section>
        );
      case "notifications":
        return (
          <section>
            <h2>Notifications</h2>
            {/* Your notifications content goes here */}
          </section>
        );
      case "settings":
        return (
          <section>
            <h2>Settings</h2>
            {/* Your settings content goes here */}
          </section>
        );
      default:
        return null;
    }
  };

  return <div className="flex-1 bg-gray-100 p-8">{renderContent()}</div>;
};

export default Content;

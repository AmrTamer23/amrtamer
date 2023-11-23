import React, { useState } from "react";
import clsx from "clsx";

interface NavBarProps {
  path: string;
}

type Sections = "home" | "projects" | "contact";

const navItemStyle = "text-5xl cursor-pointer transition-opacity";
const navBarStyle = "fixed top-0 z-10 px-48";

const NavBar: React.FC<NavBarProps> = ({ path }) => {
  const [hoveredItem, setHoveredItem] = useState<Sections | Sections[]>([
    "home",
    "projects",
    "contact",
  ]);

  const handleMouseEnter = (item: Sections) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(["home", "projects", "contact"]);
  };

  return (
    <nav
      className={`${navBarStyle} w-full flex justify-between bg-rich_black/90 pt-10 pb-5`}
    >
      <a
        href="#"
        onMouseEnter={() => handleMouseEnter("home")}
        onMouseLeave={handleMouseLeave}
      >
        <h3
          className={clsx(
            navItemStyle,
            hoveredItem.includes("home") ? "opacity-100" : "opacity-30"
          )}
        >
          Home
        </h3>
      </a>
      <a
        href="#projects"
        onMouseEnter={() => handleMouseEnter("projects")}
        onMouseLeave={handleMouseLeave}
      >
        <h3
          className={clsx(
            navItemStyle,
            hoveredItem.includes("projects") ? "opacity-100" : "opacity-30"
          )}
        >
          Projects
        </h3>
      </a>
      <span
        onMouseEnter={() => handleMouseEnter("contact")}
        onMouseLeave={handleMouseLeave}
      >
        <h3
          className={clsx(
            navItemStyle,
            hoveredItem.includes("contact") ? "opacity-100" : "opacity-30"
          )}
        >
          Contact
        </h3>
      </span>
    </nav>
  );
};

export default NavBar;

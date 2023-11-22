interface NavBarProps {
  path: string;
}

const navItemStyle = "text-3xl cursor-pointer";

const NavBar: React.FC<NavBarProps> = ({ path }) => {
  return (
    <nav className="flex justify-between">
      <span>
        <h3 className={navItemStyle}>Home</h3>
        {path === "/" && <div className="h-0.5 w-full bg-flame"></div>}
      </span>
      <span>
        <h3 className={navItemStyle}>Projects</h3>
        {path === "/projects" && <div className="h-0.5 w-full bg-flame"></div>}
      </span>
      <span>
        <h3 className={navItemStyle}>About</h3>
        {path === "/about" && <div className="h-0.5 w-full bg-flame"></div>}
      </span>
    </nav>
  );
};

export default NavBar;

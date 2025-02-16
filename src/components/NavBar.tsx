import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { clsx } from 'clsx';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

const Navigation = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const navItemStyle = 'text-md cursor-pointer transition-opacity font-medium';

  const [hoveredItem, setHoveredItem] = useState<Section | Section[]>(['home', 'projects', 'work', 'blog']);
  const [isOnNav, setIsOnNav] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleMouseEnter = (item: Section) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    if (!isOnNav && typeof hoveredItem === 'string') {
      setHoveredItem(['home', 'projects', 'work', 'blog']);
    }
  };

  const NavLink = ({ href, section }: { href: string; section: Section }) => (
    <a
      href={href}
      onMouseEnter={() => handleMouseEnter(section)}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col gap-2"
    >
      <span
        className={clsx(
          navItemStyle,
          Array.isArray(hoveredItem)
            ? hoveredItem.includes(section) ? 'opacity-100' : 'opacity-30'
            : hoveredItem === section ? 'opacity-100' : 'opacity-30'
        )}
      >
        {section.charAt(0).toUpperCase() + section.slice(1)}
      </span>
      {currentPath === href && (
        <div className="bg-secondary h-0.5 w-full"></div>
      )}
    </a>
  );

  return (
    <nav className="fixed top-0 z-30 flex h-fit w-full items-center justify-between px-8 pt-10 pb-5 lg:px-20">
      <a href="/">
        <span className="text-primary z-50 text-lg font-extrabold" id="logo">
          AT23
        </span>
      </a>

      {isLargeScreen ? (
        <div
          className="*:text-primary/70 flex [&_a]:px-4"
          onMouseEnter={() => setIsOnNav(true)}
          onMouseLeave={() => {
            setIsOnNav(false);
            handleMouseLeave();
          }}
          role="navigation"
        >
          <NavLink href="/" section="home" />
          <NavLink href="/projects" section="projects" />
          <NavLink href="/work" section="work" />
          <NavLink href="/blog" section="blog" />
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Navigation Menu"
            className="p-2"
          >
            <Menu className="h-6 w-6" />
          </button>

          {isMenuOpen && (
            <div className="border-primary bg-background absolute right-0 mt-2 w-48 rounded-md shadow-2xl">
              <div className="py-1">
                <a href="/" className="block px-4 py-2 hover:bg-gray-100">Home</a>
                <a href="/projects" className="block px-4 py-2 hover:bg-gray-100">Projects</a>
                <a href="/work" className="block px-4 py-2 hover:bg-gray-100">Work</a>
                <a href="/blog" className="block px-4 py-2 hover:bg-gray-100">Blog</a>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
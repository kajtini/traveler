import { FaSuitcase } from "react-icons/fa";
import { Outlet, Link, NavLink } from "react-router-dom";

interface Page {
  id: number;
  title: string;
  path: string;
}

const Header = () => {
  const pages: Page[] = [
    {
      id: 0,
      title: "Home",
      path: "/",
    },
    {
      id: 1,
      title: "Destinations",
      path: "/destinations",
    },
  ];

  return (
    <>
      <header className="flex items-center justify-between border-b border-slate-800 py-7">
        <Link to="/" className="flex items-center gap-3">
          <FaSuitcase size={25} className="fill-sky-500" />
          <p className="text-xl font-bold">Traveler</p>
        </Link>

        <nav>
          <ul className="flex items-center gap-5 text-slate-400">
            {pages.map((page) => (
              <li
                key={page.id}
                className="cursor-pointer hover:text-indigo-500"
              >
                <NavLink
                  to={page.path}
                  style={({ isActive }) => ({
                    color: isActive ? "#6366f1" : "#94a3b8",
                  })}
                >
                  {page.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;

import { FaSuitcase } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Outlet, Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppDispatch } from "../app/hooks";
import { logOut } from "../features/user/userSlice";

interface Page {
  id: number;
  title: string;
  path: string;
}

const Header = () => {
  const dispatch = useAppDispatch();

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(logOut());
    } catch (err) {
      console.error(`Error while signing out: ${err}`);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between border-b border-slate-800 py-7">
        <Link to="/" className="flex items-center gap-3">
          <FaSuitcase size={25} className="fill-indigo-500" />
          <p className="text-xl font-bold">Traveler</p>
        </Link>

        <div className="flex items-center gap-2 sm:gap-5">
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
                      fontWeight: isActive ? 700 : 400,
                    })}
                  >
                    {page.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="hover:bg-indigo-7 00 ml-auto rounded-3xl bg-indigo-500 px-3 py-2 sm:px-5"
            onClick={handleSignOut}
          >
            <BiLogOut />
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Header;

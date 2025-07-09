import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = ({ themeIdx, setThemeIdx, themes }) => {
    const user = useSelector((state) => state.userReducer.users);

    const linkClass =
        "relative text-lg font-bold tracking-wide px-4 py-2 rounded-xl transition-all duration-300 hover:text-yellow-700 hover:scale-110 hover:drop-shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400";
    const underlineEffect =
        "after:content-[''] after:absolute after:left-1/2 after:bottom-1 after:-translate-x-1/2 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-yellow-400 after:to-orange-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-4/5";

    return (
        <nav className="mb-10 flex justify-center items-center gap-x-8 py-4 px-8 w-full bg-white/80 shadow-xl rounded-b-3xl  top-0 z-50 backdrop-blur-xl border-b-2 border-yellow-100 relative">
            <NavLink
                to="/"
                className={`${linkClass} ${underlineEffect}`}
            >
                <span className="mr-2">🏠</span> Home
            </NavLink>

            {user ? (
                <>
                    {user?.isAdmin && (
                        <NavLink
                            to="/admin/create-product"
                            className={`${linkClass} ${underlineEffect}`}
                        >
                            <span className="mr-2">➕</span> Create Product
                        </NavLink>
                    )}

                    <NavLink
                        to="/admin/user-profile"
                        className={`${linkClass} ${underlineEffect}`}
                    >
                        <span className="mr-2">🙍‍♂️</span> User Profile
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={`${linkClass} ${underlineEffect}`}
                    >
                        <span className="mr-2">🛒</span> Cart
                    </NavLink>
                </>
            ) : (
                <NavLink
                    to="/login"
                    className={`${linkClass} ${underlineEffect}`}
                >
                    <span className="mr-2">🔐</span> Login
                </NavLink>
            )}

           
            <button
                onClick={() => setThemeIdx((themeIdx + 1) % themes.length)}
                className={`absolute right-8 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full shadow-lg border-2 border-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${themes[themeIdx].btn}`}
                style={{ minWidth: "44px", minHeight: "44px" }}
                aria-label="Change theme"
                title="Change theme"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                    />
                </svg>
            </button>
        </nav>
    );
};

export default Nav;
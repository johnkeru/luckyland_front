import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import useUser from '../../hooks/useUser';
import BurgerDrawer from "./BurgerDrawer";
import TopNav from "./TopNav";

export const navigations = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Services",
        frag: "#services",
    },
    {
        name: "Location",
        frag: "#location",
    },
    {
        name: "Contact",
        frag: "#contact",
    },
    {
        name: "About",
        frag: "#about",
    },
];

const Navigation = () => {
    const router = useNavigate();
    const { user } = useUser();

    return (
        <div className="absolute z-30 top-0 left-0 w-full">
            <TopNav />
            <div className="top-0 left-0 w-full flex justify-between px-4 md:px-8 items-start">
                <img
                    width='130px'
                    onClick={() => router("/")}
                    src="/logo/logo1.png"
                    alt="/logo"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                />

                {/* DESKTOP NAVIGATION */}
                <div className="hidden sm:ml-6 lg:block mt-5">
                    <div className="flex space-x-4 text-white">
                        {navigations.map((nav) => {
                            if (nav.frag) {
                                return <a
                                    key={nav.name}
                                    href={nav.frag}
                                    className="px-2 py-2 text-[1.2rem] font-medium"
                                    aria-current="page"
                                >
                                    {nav.name}
                                </a>
                            }
                            return <NavLink
                                key={nav.name}
                                to={nav.path}
                                className="px-2 py-2 text-[1.2rem] font-medium cursor-pointer"
                            >{nav.name}</NavLink>
                        })}
                        {user ? <NavLink
                            to='/dashboard'
                            className="px-2 py-2 text-[1.2rem] font-medium cursor-pointer"
                        >Dashboard
                        </NavLink> : <NavLink
                            to='/login'
                            className="px-2 py-2 text-[1.2rem] font-medium cursor-pointer"
                        >Login
                        </NavLink>}
                    </div>
                </div>

                {/* MOBILE NAVIGATION */}
                <BurgerDrawer />
            </div>
        </div>
    );
};

export default Navigation;
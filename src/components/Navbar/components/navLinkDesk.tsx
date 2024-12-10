import { animeStore } from "../../../store/animeStore";
import { useNavigate } from "react-router-dom";

type NavLinksDeskProps = {
    active?: string;
}

export const NavlinksLarge = ({active} : NavLinksDeskProps) => {
    // Theme Toggle
    const {isCheckedTheme} = animeStore()
    // Page Navigator
    const navigate = useNavigate();

    return(
        <div className={`hidden lg:flex gap-x-10  ${isCheckedTheme ? 'text-gray-500 ' : 'text-black '}`}>
        {/* Home */}
        <li 
            className={`text-base list-none cursor-pointer hover:text-custom-gray-1 
                custom-transition-duration disable-highlight active:scale-95 font-normal
                ${active === "Home" && isCheckedTheme ? 'text-gray-500  font-semibold' : active === "Home" && !isCheckedTheme ? 'font-semibold' : 'font-normal'}`}
            onClick={() => navigate("/")}
        >
            Home
        </li>
        {/* Trending */}
        <li 
            className={`text-base list-none cursor-pointer hover:text-custom-gray-1 
                custom-transition-duration disable-highlight active:scale-95 font-normal
                ${active === "Trending" && isCheckedTheme ? 'text-gray-500  font-semibold' : active === "Trending" && !isCheckedTheme ? 'font-semibold' : 'font-normal'}`}
            onClick={() => navigate("/Trending")}
        >
            Trending
        </li>
        {/* Latest */}
        <li 
            className={`text-base list-none cursor-pointer hover:text-custom-gray-1 
                custom-transition-duration disable-highlight active:scale-95 font-normal
                ${active === "Latest" && isCheckedTheme ? 'text-gray-500  font-semibold' : active === "Latest" && !isCheckedTheme ? 'font-semibold' : 'font-normal'}`}
            onClick={() => navigate("/Latest")}
        >
            Latest
        </li>
        {/* Popular */}
        <li 
            className={`text-base list-none cursor-pointer hover:text-custom-gray-1 
                custom-transition-duration disable-highlight active:scale-95 font-normal
                ${active === "Popular" && isCheckedTheme ? 'text-gray-500  font-semibold' : active === "Popular" && !isCheckedTheme ? 'font-semibold' : 'font-normal'}`}
            onClick={() => navigate("/Popular")}
        >
            Popular
        </li>
        {/* My List */}
        <li 
            className={`text-base list-none cursor-pointer hover:text-custom-gray-1 
                custom-transition-duration disable-highlight active:scale-95 font-normal
                ${active === "My List" && isCheckedTheme ? 'text-gray-500  font-semibold' : active === "My List" && !isCheckedTheme ? 'font-semibold' : 'font-normal'}`}
            onClick={() => navigate("/Bookmarks")}
        >
            My List
        </li>
    </div>
    )
}
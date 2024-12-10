import  Tooltip, { tooltipClasses,TooltipProps } from "@mui/material/Tooltip";
import { animeStore } from "../../store/animeStore";
import { HamburgerMenu } from "../../widgets/HamburgerMenu/hamburgerMenu";
import { ThemeToggle } from "../../widgets/themeToggle/themeToggle";
import {styled} from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search"
import { NavlinksLarge } from "./components/navLinkDesk";
import { useNavigate } from "react-router-dom";

type NavBarProps = {
    active?: string;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: "1rem",
    },
}))
export const Navbar = ( { active } : NavBarProps ) => {
    // Theme Toggle
    const {isCheckedTheme} = animeStore()
    // Page Navigator
    const navigate = useNavigate()

  return (
    <nav 
        className={`px-7 lg:px-12 py-5 flex items-center justify-between z-10
            sticky inset-0 custom-shaddow-bottom custom-transition-duration 
            ${isCheckedTheme ? 'bg-black' : 'bg-white'}`}
    >
        <div className="flex items-center gap-x-14">
          
            <p className={`text-xl 360size:text-2xl custom-font-moonrocks tracking-wide 
                disable-highlight cursor-pointer active:scale-95 custom-transition-duration 
                ${isCheckedTheme ? 'text-white' : 'text-black'}`
               }
               onClick={() => navigate("/")}
            >
                ANIME
                <span className={`text-xl 360size:text-2xl ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>STREAMER</span>
            </p>

          
            <NavlinksLarge active = {active}/>
        </div>
        <div className="hidden lg:flex items-center gap-x-5">
            <LightTooltip title="Click here to search">
                <SearchIcon 
                    sx={{fontSize:'30px'}}
                    className={`cursor-pointer hover:opacity-80 active:scale-y-95 disable-highlight 
                    scale-x-[-1] ${isCheckedTheme ? 'text-white' : 'text-black '}`}
                    onClick = {() => navigate("/Search")}
                />
            </LightTooltip>
            <ThemeToggle/>
        </div>

       
        <HamburgerMenu/>
    </nav>
  )
}

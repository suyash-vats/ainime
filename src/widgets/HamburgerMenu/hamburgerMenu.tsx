import { useState, MouseEvent } from "react";
import { NavlinksSmall } from "../../components/Navbar/components/navLinkSmall";
import { animeStore } from "../../store/animeStore";
import "./HambugerMenu.css";

export const HamburgerMenu = () => {
  const {isCheckedTheme} = animeStore();

  const [isOpen, setIsOpen] = useState(false);
  const handleCheckboxChange = (e: MouseEvent<HTMLInputElement>) => {
    setIsOpen(!isOpen);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  return(
    <div className="flex lg:hidden">
      <label className="hamburger-menu"  aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>

<input type="checkbox" checked={isOpen} onChange={handleCheckboxChange}/>
        <svg viewBox="0 0 32 32">
          <path className={`line line-top-bottom ${isCheckedTheme ? 'stroke-[white]' : 'stroke-[black]'}`} d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
          <path className={`line ${isCheckedTheme ? 'stroke-[white]' : 'stroke-[black]'}`} d="M7 16 27 16"></path>
        </svg>

              </label>

              <NavlinksSmall
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
              />
    </div>
  )
}
import { useEffect } from "react"
import { animeStore } from "../../store/animeStore"
import "./themeToggle.css"

export const ThemeToggle = () => {
    // Theme Toggle
    const {isCheckedTheme, setIsCheckedTheme} = animeStore()
    const themeToggle = () => {
       const newValue : boolean = !isCheckedTheme
       setIsCheckedTheme(newValue)
       localStorage.setItem('theme', newValue.toString())
    }
    useEffect(() => {
       const isDarkModeEnabled = localStorage.getItem('theme') || 'true'
       setIsCheckedTheme(isDarkModeEnabled === 'true')
    }, [])

  return (
    
    <div className="switch">
        <input type="checkbox" className="switch__input" id="Switch" checked={isCheckedTheme} onChange={themeToggle}/>
        <label className="switch__label" htmlFor="Switch">
            <span className="switch__indicator"></span>
            <span className="switch__decoration"></span>
        </label>
    </div>

  )
}
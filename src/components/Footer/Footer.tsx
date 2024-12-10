import { animeStore } from "../../store/animeStore"

export const Footer = () => {
  const {isCheckedTheme} = animeStore()

  return (
    <footer 
        className={`py-14 custom-transition-duration
        border-t-2 border-custom-gray-1
        ${isCheckedTheme ? 'bg-black' : 'bg-white'}`}
    >
        <div className="max-w-[80%] sm:max-w-none w-10/12 mx-auto flex flex-col items-center">

            <p className={`text-xl 360size:text-3xl custom-font-moonrocks tracking-wide  ${isCheckedTheme ? 'text-white' : 'text-black'}
                disable-highlight cursor-pointer active:scale-95 custom-transition-duration`}
            >
                ANIME
                <span className={`text-xl 360size:text-3xl custom-transition-duration ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>STREAMER</span>
            </p>

            <p className={`mt-3 text-base ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>{new Date().getFullYear()} - AnimeStreamer. All rights reserved.</p>
        </div>
    </footer>
  )
}
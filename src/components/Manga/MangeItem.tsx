import { animeStore } from "../../store/animeStore"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type AnimeItemProps = {
    id : string
    title : string
    image : string
    genres? : string[]
    episodeNumber? : number | string
    releaseDate? : string
}

export const AnimeItem = ({id, title, image, genres, episodeNumber, releaseDate} : AnimeItemProps ) => {
    // Theme Toggle
    const {isCheckedTheme} = animeStore()

    // Page Navigator
    const navigate = useNavigate()

    // Blur Effect in Lazy load
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  return (
    <div 
        className={`w-full max-w-[17rem] sm:max-w-none mx-auto sm:mx-0 cursor-pointer hover:${isCheckedTheme ? 'opacity-80' : 'opacity-95'}`}
        onClick={() => navigate(`/Anime/${id}`)}
    >
        <div>
            <LazyLoadImage
              onLoad={() => setImageLoaded(true)}
              wrapperClassName={imageLoaded ? '' : 'blur-up'}
              className={`rounded-2xl w-full h-[20rem] 1220size:h-[17rem] 2xl:h-[20rem] object-cover ${!isCheckedTheme && 'custom-shadow-button'}`}
              alt="Anime Image"
              src={image}
            
            />

            {/* Name */}
            <p className={`text-base font-semibold mt-2 custom-transition-duration text-center 
                sm:text-left ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}
            >
                {title}
            </p>

            {/* Sub Details */}
            <div className={`mt-1 flex gap-x-2 flex-wrap justify-center sm:justify-start ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>
                {genres ? 
                    genres.map((genre, index) =>  index < 3 && <p key={index} className={`text-sm ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>• {genre}</p>)
                :
                episodeNumber ?
                    <p className={`text-sm ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>• {episodeNumber} {episodeNumber === 1 ? 'episode' : 'episodes'}</p>
                :
                releaseDate &&
                    <p className={`text-sm ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>• {releaseDate}</p>
                }
            </div>
        </div>
    </div>
  )
}
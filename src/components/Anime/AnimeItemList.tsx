import { animeStore } from "../../store/animeStore"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { removeFromMyList } from "../../helpers/data"

type AnimeItemListProps = {
    id : string
    title : string
    image : string
    episodeNumber? : number | string
}

export const AnimeItemList = ({id, title, image, episodeNumber} : AnimeItemListProps ) => {
    // Theme Toggle
    const {isCheckedTheme} = animeStore()

    // Page Navigator
    const navigate = useNavigate()

    // Blur Effect in Lazy load
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

  return (
    <div>
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

                {/* Total Episodes */}
                <p className="text-sm text-custom-gray-1 text-center sm:text-left mt-1">• {episodeNumber} {episodeNumber === 1 ? 'episode' : 'episodes'}</p>
            </div>
        </div>

        <p className="text-center sm:text-left text-sm text-custom-gray-1 mt-1 cursor-pointer hover:underline hover:text-custom-gray-1"
            onClick={() => removeFromMyList(id)}
        >
            Remove from list
        </p>
    </div>
  )
}
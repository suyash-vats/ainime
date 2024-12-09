import { animeStore, useMyListDataPersist } from "../../store/animeStore"
import { useEffect, useState } from "react"
import { SkeletonLoading } from "../Skeleton/Loading"
import { AnimeItem } from "../Anime/AnimeItem"
import { ItemListType } from "../../types/itemTypes"

type MyAnimeListContainerProps = {
  title : string
  description : string
  spacing? : string
  hasSeeAll? : boolean
}

export const MyAnimeListContainer = ({ title, description, spacing } : MyAnimeListContainerProps) => {
    // Theme Toggle
    const {isCheckedTheme} = animeStore()

    // My list Storage Data
    const { myListDetails } = useMyListDataPersist()

    // Setting timeout for skeleton
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
      setIsLoading(true)
      if(myListDetails){
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
      }
    }, [])
           
  return (
    <section className={`min-h-[50rem] w-full custom-transition-duration pb-20 lg:pb-0 ${isCheckedTheme ? 'bg-custom-dark-1' : 'bg-white'}`}>
        <div className={`max-w-[80%] sm:max-w-none w-10/12 mx-auto relative ${spacing}`}>

            {/* Headers */}
            <h1 className={`text-4xl font-semibold text-center lg:text-left pt-10 lg:pt-0 
              custom-transition-duration ${isCheckedTheme ? 'text-custom-gray-4 ' : 'text-custom-dark-1'}`}
            >
              {title}
            </h1>

            <div className="flex flex-col lg:flex-row justify-between items-center border-b-2 border-custom-gray-1 pb-5 gap-x-10 mt-4 lg:mt-0">
                <p className={`text-base  text-center lg:text-left custom-transition-duration ${isCheckedTheme ? 'text-custom-gray-1' : 'text-custom-dark-2'}`}>
                  {description}
                </p>
            </div>

            {/* Anime Container */}
            <div className="mt-10 grid gap-x-7 gap-y-10 grid-cols-1 sm:grid-cols-2 870size:grid-cols-3 1220size:grid-cols-5 1920size:grid-cols-6">
                {/* Anime data mapping */
                  isLoading ? 
                    <SkeletonLoading size = {12}/>
                  :
                  myListDetails.length === 0 ?
                    <div className="w-full absolute">
                      <p className={`text-base ${isCheckedTheme ? 'text-custom-gray-4 ' : 'text-custom-dark-2'}`}>You have no item in your list.</p>
                    </div>
                  :
                  myListDetails.map((res: ItemListType) => (
                    <AnimeItem
                      key = {res?.animeId}
                      id = {res?.animeId}
                      title = {res?.animeName}
                      image = {res?.animeImage}
                      episodeNumber = {res?.totalEpisodes}
                    />
                  ))
                }
            </div>
        </div>
    </section>
  )
}
import { useNavigate, useParams } from "react-router-dom"
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"
import { useQuery } from "react-query"
import { getAnime, getAnimeEpisode } from "../../services/apiFetchAnimeList"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { AnimeListContainer } from "../../components/AnimeList/AnimeListContainer"
import { EpisodeList } from "../../components/EpisodeList/EpisodeList"
import { WatchPageSection } from "./components/watchPageSection"
import { ratingData } from "../../helpers/fakeRating"

export const Watch = () => {
    // Params ID
    const { dataId, episodeId} = useParams()
    const myDataId = dataId || ""
    const myEpisodeId = episodeId || ""

    // Page Navigator
    const navigate = useNavigate()

    // Getting Anime Data  
    const { data: animeData, isFetched: isAnimeDataFetch, isError: isAnimeDataError } = useQuery(
      ["animeDataKey", myDataId, myEpisodeId],
      () => getAnime(myDataId)
    )

    // Gettin Current Episode Stream URL
    const { data: episodeData, isFetched: isEpisodeFetch, isError: isEpisodeDataError } = useQuery(
      ["episodeDataKey", myDataId, myEpisodeId],
      () => getAnimeEpisode(myEpisodeId)
    )
    
    // Getting Random Rating
 
    const [fakeRating, setFakeRating] = useState<number>()
    
    // Setting up fake rating once the page is loaded
    useEffect(() => {
      const randomNumber = Math.random() * ratingData.length
      setFakeRating(ratingData[Math.floor(randomNumber)])
    },[])
    
    // Setting timeout for skeleton
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
      setIsLoading(true)
      if(isAnimeDataFetch && isEpisodeFetch && !isAnimeDataError && !isEpisodeDataError){
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
      }
      else if(isAnimeDataError || isEpisodeDataError){
        toast.error("The request is invalid. Please try again!")
        navigate("/")
      }
    },[isAnimeDataFetch, isEpisodeFetch, dataId])

    
  return (
    <>

        <Navbar/>


        <WatchPageSection 
          animeData = {animeData} 
          episodeData = {episodeData}
          fakeRating = {fakeRating}
          isLoading = {isLoading}
          dataId = {dataId}
          myEpisodeId = {myEpisodeId}
        />


        {/* Episodes Container */
        animeData?.type !== "MOVIE" &&
          <EpisodeList
            anime = {animeData} 
            isLoading = {isLoading}
            myEpisodeId = {myEpisodeId}
          />
        }

        {/* Popular Now Section */}
        <AnimeListContainer 
          fetchCategory = "recent-episodes"
          type = "Latest"
          title = "Latest Release"
          description = "Keep yourself informed and in the loop with the most recent releases!"
          spacing = "lg:pt-10 lg:pb-20"
          hasSeeAll
        />

        {/* Footer Section */}
        <Footer/>
    </>
  )
}
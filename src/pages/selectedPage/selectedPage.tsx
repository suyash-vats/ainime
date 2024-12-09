import { useNavigate, useParams } from "react-router-dom"
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"
import {SelectedPageSection} from "./components/selectedPageSection"
import { useQuery } from "react-query"
import { getAnime } from "../../services/apiFetchAnimeList"
import { useEffect, useState } from "react"
import { EpisodeList } from "../../components/EpisodeList/EpisodeList"

import { AnimeListContainer } from "../../components/AnimeList/AnimeListContainer"
import { toast } from "react-toastify"
import { ratingData } from "../../helpers/fakeRating"

export const SelectedPage = () => {
    // Params ID
    const { dataId } = useParams()
    const id = dataId || ""

    // Page Navigator
    const navigate = useNavigate()
    
    // Getting Anime Data  
    const { data: animeData, isFetched: isAnimeDataFetch, isError: isAnimeDataError } = useQuery(
      ["animeDataKey", id],
      () => getAnime(id)
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
      if(isAnimeDataFetch && !isAnimeDataError){
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 500)
        return () => clearTimeout(timer)
      }
      else if(isAnimeDataError){
        toast.error("The request is invalid. Please try again!")
        navigate("/")
      }
    },[isAnimeDataFetch, isAnimeDataError, dataId])
    
  return (
    <>

      <Navbar/>


      <SelectedPageSection 
        animeData = {animeData} 
        fakeRating = {fakeRating}
        isLoading = {isLoading}
      />

      {
      animeData?.type !== "MOVIE" &&
        <EpisodeList
          anime = {animeData} 
          isLoading = {isLoading}
        />
      }


      <AnimeListContainer 
        fetchCategory = "popular"
        type = "Popular"
        title = "Popular Now"
        description = "Stay updated and connected with the latest trends by immersing in the most popular shows available!"
        spacing = "lg:pt-10 lg:pb-20"
        hasSeeAll
      />


      <Footer/>
    </>
  )
}
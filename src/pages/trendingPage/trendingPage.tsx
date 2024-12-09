import { AnimeListContainer } from "../../components/AnimeList/AnimeListContainer";
import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/Navbar";

export const TrendingPage = () => {

    return (
      <>

        <Navbar active = "Trending"/>
  

        <AnimeListContainer 
         fetchCategory = "top-airing"
         type = "Trending"
         title = "Trending Now"
         description = "Explore and immerse yourself in the captivating world of the most current and trending anime series available!"
         spacing = "lg:pt-10 lg:pb-20"
 
        />
  

        <Footer/>
      </>
    )
  }
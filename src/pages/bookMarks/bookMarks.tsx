import { MyAnimeListContainer } from "../../components/AnimeList/MyAnimeListContainer";
import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/Navbar";

export const BookMarks = () => {

    return (
      <>

        <Navbar active = "My List"/>
  

        <MyAnimeListContainer 
          title = "My List"
          description = "Check out the collection of an anime you've added!"
          spacing = "lg:pt-10 lg:pb-20"
        />
  

        <Footer/>
      </>
    )
  }
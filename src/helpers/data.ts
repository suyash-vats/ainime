import { useAnimeDataPersist, useMyListDataPersist } from "../store/animeStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const removeFromMyList = (id: string) => {
    const { myListDetails, setMyListDetails } = useMyListDataPersist.getState();
    const updatedList = myListDetails.filter((item) => item.animeId !== id);
    if (updatedList.length !== myListDetails.length) {
        setMyListDetails(updatedList)
        toast.success("Anime removed from the list successfully")
      } else {
        toast.error("Anime not found in your list")
      }
}

export const saveUserEpisodeData = (animeId: string, episode: number) => {
  const {animeDetails, setAnimeDetails}= useAnimeDataPersist.getState();
  let isUpdated = false;

  const updatedList = animeDetails.map((item) => {
    if (item.animeId === animeId) {
      isUpdated = true;
      const updatedEpisodes = item.watchedEpisode.filter((ep) => ep !== episode);
      return {
        ...item,
        watchedEpisode: [...updatedEpisodes, episode]
      }
    }
    return item;
  });

  if (!isUpdated) {
    setAnimeDetails([
      ...animeDetails,
      {
        animeId: animeId,
        watchedEpisode: [episode]
      }
    ])
  } else {
    setAnimeDetails(updatedList)  
  }
}


export const addBookMark = (animeId: string, animeName: string, animeImage: string, totalEpisodes : number) => {
  const { myListDetails, setMyListDetails } = useMyListDataPersist.getState()
    let isUpdated = false

    const updatedData = myListDetails.map(item => {
      if (item.animeId === animeId) {
        isUpdated = true
        return {
          ...item,
          totalEpisodes: totalEpisodes
        }
      }
      return item
    })

    if (!isUpdated) {
      setMyListDetails([
        ...myListDetails,
        {
          animeId: animeId,
          animeName: animeName,
          animeImage : animeImage,
          totalEpisodes: totalEpisodes
        }
      ])
      toast.success("Added to the list succesfully")
    } else {
      setMyListDetails(updatedData)
      toast.info("This anime is already in your list")
    }
}
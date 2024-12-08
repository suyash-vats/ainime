import { useMyListDataPersist } from "../store/animeStore";
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
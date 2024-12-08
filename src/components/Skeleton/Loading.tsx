import Skeleton from "@mui/material/Skeleton"
import { animeStore } from "../../store/animeStore"

type SkeletonLoadingProps = {
    size : number
}
export const SkeletonLoading = ({ size } : SkeletonLoadingProps) => {
    const {isCheckedTheme} = animeStore()

  return (
    <>
    {
        Array.from({ length: size }, (_, index) => (
            <div className="w-full max-w-[17rem] sm:max-w-none mx-auto sm:mx-0" key={index}>
                <div>
                    <Skeleton 
                        className="rounded-2xl custom-transition-duration" 
                        sx={{ bgcolor: isCheckedTheme ? '#222222' : '#ececec' }} 
                        variant="rectangular" 
                        animation="wave"  
                        width={"100%"} 
                        height={"20rem"}
                    />
                    <Skeleton 
                        className="mt-2 rounded-3xl custom-transition-duration" 
                        sx={{ bgcolor: isCheckedTheme ? '#222222' : '#ececec' }} 
                        variant="rectangular" 
                        animation="wave"  
                        width={"100%"} 
                        height={"1rem"}
                    />
                    <Skeleton 
                        className="mt-1 rounded-3xl custom-transition-duration" 
                        sx={{ bgcolor: isCheckedTheme ? '#222222' : '#ececec' }} 
                        variant="rectangular" 
                        animation="wave"  
                        width={"100%"} 
                        height={"1rem"}
                    />
                </div>
            </div>
        ))
    }
    </>
  )
}
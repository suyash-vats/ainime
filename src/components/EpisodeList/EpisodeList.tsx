import {useEffect, useState} from 'react';
import { Skeleton } from '../Skeleton/ShadcnType';
import { animeStore, useAnimeDataPersist } from '../../store/animeStore';
import { saveUserEpisodeData } from '../../helpers/data';
import { useNavigate } from 'react-router-dom';
import { animeDataType } from '../../types/animeTypes';

type EpisodeListProps = {
  anime: animeDataType;
  isLoading: boolean;
  myEpisodeId?: string;
};

export const EpisodeList: React.FC<EpisodeListProps> = ({ anime, isLoading, myEpisodeId }) => {
    const navigate = useNavigate()
    
    // Theme Toggle
    const {isCheckedTheme} = animeStore()

    // Anime Storage Data
    const { animeDetails } = useAnimeDataPersist()

    // Pagination Controller
    const [page, setPage] = useState<{ startPage: number; endPage: number }>({
      startPage: 1,
      endPage: 100,
    })


    const inputString : string = myEpisodeId || ""
    const arrayFromString : string[] = inputString.split("-")
    const currentEpisode : number = parseInt(arrayFromString[arrayFromString?.length - 1])


    const [ranges, setRanges] = useState<string[]>([])
    const [selectedRange, setSelectedRange] = useState('')


    const [selectedSort, setSelectedSort] = useState<string>("Oldest")

    const generateRanges = () => {
        const numRanges = Math.ceil(anime?.totalEpisodes / 100)
        const newRanges = Array.from({ length: numRanges }, (_, index) => {
          const start = index * 100 + 1;
          const end = Math.min((index + 1) * 100, anime?.totalEpisodes)
          return `${start}-${end}`
        })
        setRanges(newRanges)
      }

      const findRangeForEpisode = (episode: number): string => {
        let selectedRange = ''
        ranges.forEach((range) => {
          const [startStr, endStr] = range.split('-')
          const start = parseInt(startStr, 10)
          const end = parseInt(endStr, 10)
          if (episode >= start && episode <= end) {
            selectedRange = range
          }
        })
        return selectedRange
      }

    // Load available data in dropdown
    useEffect(() => {
      generateRanges()
    }, [anime?.totalEpisodes])

    useEffect(() => {
        setSelectedRange(findRangeForEpisode(currentEpisode))
        // myEpisodeId && saveData(anime?.id, currentEpisode)
        if(myEpisodeId){
            saveUserEpisodeData(anime?.id, currentEpisode)
        }
  
        const selectedValue = findRangeForEpisode(currentEpisode)
        if (selectedValue !== '') {
          const [startStr, endStr] = selectedValue.split('-')
          const start = parseInt(startStr, 10)
          const end = parseInt(endStr, 10)
          setPage((prevPage) => ({
            ...prevPage,
            startPage: start,
            endPage: end
          }))
        } 
        else {
          setPage((prevPage) => ({
            ...prevPage,
            startPage: 1,
            endPage: 100
          }))
        }
      }, [currentEpisode, isLoading])

      const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        setSelectedRange(event.target.value)
  
        if (selectedValue !== '') {
          const [startStr, endStr] = selectedValue.split('-')
          const start = parseInt(startStr, 10)
          const end = parseInt(endStr, 10)
          setPage((prevPage) => ({
            ...prevPage,
            startPage: start,
            endPage: end
          }))
        } 
        else {
          setPage((prevPage) => ({
            ...prevPage,
            startPage: 1,
            endPage: 100
          }))
        }
      }

      const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.value === "Oldest"){
          setSelectedSort(event.target.value)
          setSelectedRange(ranges[0])
  
          const [startStr, endStr] = ranges[0].split('-')
          const start = parseInt(startStr, 10)
          const end = parseInt(endStr, 10)
          setPage((prevPage) => ({
            ...prevPage,
            startPage: start,
            endPage: end
          }))
        }
        else{
          setSelectedSort(event.target.value)
          setSelectedRange(ranges[ranges.length - 1])
  
          const [startStr, endStr] = ranges[ranges.length - 1].split('-')
          const start = parseInt(startStr, 10)
          const end = parseInt(endStr, 10)
          setPage((prevPage) => ({
            ...prevPage,
            startPage: start,
            endPage: end
          }))
          
        }
      }


      return(
        <section className={`min-h-[14rem] w-full custom-transition-duration pb-10 lg:pb-14 ${isCheckedTheme ? 'bg-black' : 'bg-white'}`}>
        <div className={`max-w-[80%] sm:max-w-none w-10/12 mx-auto mt-16`}>
            <h1 className={`text-4xl font-semibold text-center lg:text-left pt-0
              custom-transition-duration ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}
            >
              All Episodes
            </h1>

            <div className="flex flex-col lg:flex-row justify-between items-center border-b-2 border-custom-gray-1 pb-5 gap-x-10 mt-4 lg:mt-2">
                <p className={`text-base  text-center lg:text-left custom-transition-duration ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>
                    Unwind and savor the pleasure of watching your favorite shows for a relaxing and enjoyable experience.
                </p>

                <div className="flex flex-wrap gap-3 mt-4 lg:mt-[-.50rem]">
                  {/* Filter Page */
                    anime?.totalEpisodes && anime?.totalEpisodes >= 100 &&
                      <select 
                        value={selectedRange} 
                        onChange={handleRangeChange} 
                        className="text-gray-500  bg-black px-5 py-2 rounded-md disable-highlight cursor-pointer whitespace-nowrap outline-none w-full 330size:w-auto"
                      >
                        {ranges.map((range, index) => (
                          <option key={index} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                  }

                  {/* Sort by date */
                    anime?.totalEpisodes && anime?.totalEpisodes >= 100 &&
                      <select 
                        value={selectedSort} 
                        onChange={handleSortChange} 
                        className="text-gray-500   bg-black px-5 py-2 rounded-md disable-highlight cursor-pointer whitespace-nowrap outline-none w-full 330size:w-auto"
                      >
                        <option value="Oldest">Oldest</option>
                        <option value="Latest">Latest</option>
                      </select>
                  }

                </div>
            </div>
            <div className="mt-7">
              <p className={`text-base custom-transition-duration ${isCheckedTheme ? 'text-gray-500 ' : 'text-custom-dark-2'}`}>Color Legends</p>

              <div className="flex flex-wrap gap-x-5 gap-y-3 mt-2">
               
                <div className="flex items-center gap-x-2">
                  <div className="h-[20px] w-[20px] bg-[#122532] rounded-sm"></div>
                  <p className={`text-sm custom-transition-duration ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>- Not watch</p>
                </div>

      
                <div className="flex items-center gap-x-2">
                    <div className="h-[20px] w-[20px] bg-[#0063F2] rounded-sm"></div>
                    <p className={`text-sm custom-transition-duration ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>- Already watched</p>
                </div>

                 <div className="flex items-center gap-x-2">
                  <div className="h-[20px] w-[20px] bg-[#cac9c9] rounded-sm"></div>
                  <p className={`text-sm custom-transition-duration ${isCheckedTheme ? 'text-gray-500 ' : 'text-black'}`}>- Not watch</p>
                </div>

              </div>
            </div>

        </div>
        <div className="`max-w-[80%] sm:max-w-none w-10/12 mx-auto mt-10 grid gap-5 
            grid-cols-2 400size:grid-cols-3 sm:grid-cols-4 800size:grid-cols-5 lg:grid-cols-6
            1220size:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 1700size:grid-cols-10"
        >
            {isLoading ?
                Array.from({ length: 100 }, (_, index) => (
                        <Skeleton key={index} className="rounded w-full h-[2rem]"/>
                )) 
            :
                anime?.episodes?.map((res: {number: number, id: string}) => {
                  if (res?.number && page?.startPage <= res.number && res.number <= page?.endPage) {
                    const isWatched = animeDetails.find(item => item.animeId === anime?.id && item.watchedEpisode.includes(res?.number))
                    const lastWatched = animeDetails.find(item => item.animeId === anime?.id)?.watchedEpisode.slice(-1)[0]
                  
                    return (
                      <div
                        className={`rounded text-xs 400size:text-sm py-2 flex justify-center 
                          disable-highlight cursor-pointer hover:opacity-90 active:scale-95
                          ${(isWatched && lastWatched !== res?.number) ? 'bg-[#0063F2] text-gray-500 ' : 
                          lastWatched === res?.number ? 'bg-[#cac9c9] text-black font-medium' : 
                          'bg-[#122532] text-gray-500 '}
                          `}
                        key={res?.id}
                        onClick={() => {saveUserEpisodeData(anime?.id, res?.number); navigate(`/watch/${anime?.id}/${res?.id}`)}}
                      >
                        EP {res?.number} &nbsp;
                        <span className={
                          `text-xs 400size:text-sm uppercase 
                          ${(isWatched && lastWatched !== res?.number) ? 'text-gray-500 ' : lastWatched === res?.number ? 'text-black' : 'text-gray-500 '}`
                          }
                        >
                          | {anime?.subOrDub}
                        </span>
                      </div>
                    )
                  }
                })
            }
        </div>
    </section>
      )



}
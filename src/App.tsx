import { Routes, Route } from "react-router-dom"
import { HomePage } from "./pages/homepage/home"
import { TrendingPage } from "./pages/trendingPage/trendingPage"
import { LatestPage } from "./pages/latestPage/latestPage"
import { PopularPage } from "./pages/popularSection/popular"
import { SearchPage } from "./helpers/SearchPage"
import { SelectedPage } from "./pages/selectedPage/selectedPage"
import { Watch } from "./pages/watchPage/watchPage"
import { ScrollToTop } from "./helpers/ScrollToTop"
import { BookMarks } from "./pages/bookMarks/bookMarks"
import { ToastContainer } from "react-toastify"
import { NotFoundPage } from "./helpers/NotFoundPage"
import "react-toastify/dist/ReactToastify.css"
import { animeStore } from "./store/animeStore"

function App() {
  const {isCheckedTheme} = animeStore()

  return (
    <div className={`custom-transition-duration ${isCheckedTheme ? 'bg-black' : 'bg-white'}`}>
      <ScrollToTop/>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Trending" element={<TrendingPage/>}/>
        <Route path="/Latest" element={<LatestPage/>}/>
        <Route path="/Popular" element={<PopularPage/>}/>
        <Route path="/Bookmarks" element={<BookMarks/>}/>

        {/* Selected Data */}
        <Route path="/Anime/:dataId" element={<SelectedPage/>}/>

        {/* Watch Data */}
        <Route path="/Watch/:dataId/:episodeId" element={<Watch/>}/>

        {/* Helpers */}
        <Route path="/Search" element={<SearchPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>

      {/* Toast Container */}
      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme='colored'
      />
    </div>
  )
}

export default App

import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Info, Play } from "lucide-react"
import useContentTrending from "../hook/useContentTrending"
import { Base_Url_Image, Tv_Categories } from "../utils/constant"
import { useContentStore } from "../store/content"
import { Movie_Categories } from "../utils/constant"
import MovieSlaider from "../components/MovieSlaider"


const HomeScreen = () => {
  const { trendingContent } = useContentTrending()
  const { contentType } = useContentStore()

  // console.log(trendingContent)
  return (
    <>
      <div className="h-screen  relative bg-black/50 ">
        <Navbar />
        <img src={Base_Url_Image + trendingContent?.backdrop_path} alt="poster" className="w-full h-full object-cover absolute -z-20 top-0 left-0" />
      </div>
      <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full ">
        <div className=" gap-3 absolute top-50 left-0 text-white max-w-2xl p-8">
          <h1 className="text-6xl font-extrabold">
            {trendingContent?.original_title || trendingContent?.original_name}</h1>
          <p>{trendingContent?.release_date || trendingContent?.first_air_date}</p>
          <p className="mt-4 italic font-serif">
            {trendingContent?.overview}
          </p>
          <div className="flex gap-4 text-white mt-4 z-50">
            <Link to={`/watch/${trendingContent?.id}`} className="flex gap-3 border-2  bg-white text-black border-black hover:bg-black hover:text-white hover:border-white rounded-md p-3">
              <Play className=" cursor-pointer" />
              Play</Link>
            <Link to={`/watch/${trendingContent?.id}`} className="flex gap-3 border-2  bg-black border-white hover:bg-white hover:border-black hover:text-black rounded-md p-3">
              <Info className=" cursor-pointer" />
              More Info</Link>
          </div>
        </div>

      </div>
      <div className="flex flex-col gap-2 md:gap-6 bg-black text-white p-2">
        {contentType === 'movie' ? (
          Movie_Categories.map((category) => <MovieSlaider key={category} category={category} />)
        ) : (
          Tv_Categories.map((category) => <MovieSlaider key={category} category={category} />)
        )}
      </div>
    </>
  )
}

export default HomeScreen

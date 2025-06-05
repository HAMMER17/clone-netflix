import { Link, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { CircleChevronRight, CircleChevronLeft, ChevronRight, ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import ReactPlayer from 'react-player'
import { useContentStore } from "../store/content"
import { Base_Url_Image, Small_Url_Image } from '../utils/constant'
import axios from "axios"


const WatchPage = () => {
  const { id } = useParams()
  const [trailers, setTrailers] = useState([])
  const [similar, setSimilar] = useState([])
  const [currentTrailerId, setCurrentTrailerId] = useState(0)
  const [content, setContent] = useState({})

  const { contentType } = useContentStore()
  const sliderRef = useRef(null)

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`)
        setTrailers(res.data.trailers)
      } catch (error) {
        console.log(error)
        setTrailers([])
      }
    }
    getTrailers()
  }, [contentType, id])

  useEffect(() => {
    const getSimilar = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`)
        setSimilar(res.data.similar)
      } catch (error) {
        console.log(error)
        setSimilar([])
      }
    }
    getSimilar()
  }, [contentType, id])

  useEffect(() => {
    const getDetailsContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`)
        setContent(res.data.content)
      } catch (error) {
        console.log(error)
        setContent([])
      }
    }
    getDetailsContent()
  }, [contentType, id])

  const handleNext = () => {
    if (currentTrailerId < trailers.length - 1) setCurrentTrailerId(currentTrailerId + 1);
  };
  const handlePrev = () => {
    if (currentTrailerId > 0) setCurrentTrailerId(currentTrailerId - 1);
  };

  const sliderLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' })

    }
  }
  const sliderRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' })
    }
  }
  // console.log('similar ', similar)
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <button className="cursor-pointer" onClick={handleNext}><CircleChevronLeft size={50} /></button>
        <button className="cursor-pointer" onClick={handlePrev}><CircleChevronRight size={50} /></button>
      </div>
      <div className='aspect-video p-2 sm:px-10 md:px-32 flex justify-center items-center'>

        {trailers.length > 0 && (
          <ReactPlayer
            controls={true}
            width={"100%"}
            height={"70vh"}
            className='mx-auto overflow-hidden rounded-lg'
            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerId].key}`}
          />

        )}
      </div>
      <h1 className="text-center mb-14 font-bold italic font-serif">{trailers[currentTrailerId]?.name}</h1>
      <div className="h-2 bg-red-800 w-full"></div>
      <div className="flex flex-col md:flex-row items-center justify-between bg-black p-4">
        <div className="text-center p-4 ">
          <h1 className="p-4 text-3xl">{content?.original_title || content?.original_name}</h1>
          <p className="text-red-500">{content?.release_date}</p>
          <p className="italic font-medium">{content?.overview}</p>
          <h3 className="text-2xl p-2">{content?.tagline}</h3>
        </div>
        <img src={Base_Url_Image + content?.poster_path} alt="poster" className="max-w-[300px] md:max-w-[500px] rounded-2xl" />
      </div>
      <div className="h-2 bg-red-800 w-full"></div>
      {similar.length > 0 && (
        <div className=" relative p-4 ">
          <h1 className="font-bold text-3xl">Similar Movie /  TV Show</h1>
          <div className="flex overflow-x-scroll scrollbar-hide gap-2 group p-4" ref={sliderRef}>
            {similar.map((item) => {
              if (item.poster_path === null) return null;
              return (
                <Link key={item.id} to={`/watch/${item.id}`} className="w-52 flex-none">
                  <img src={Small_Url_Image + item?.poster_path} alt="poster"
                    className="rounded-md " />
                  <h4 className="text-center font-semibold p-2">{item?.name || item?.title}</h4>
                </Link>
              )
            })}
            <button className="absolute top-0 left-0 bg-black/50 cursor-pointer h-full p-2" onClick={sliderLeft}>
              <ChevronLeft size={50} />
            </button>
            <button className="absolute top-0 right-0 bg-black/50 cursor-pointer h-full p-2" onClick={sliderRight}>
              <ChevronRight size={50} />
            </button>

          </div>
        </div>
      )}
      <div className="h-2 bg-red-800 w-full"></div>
    </div>
  )
}

export default WatchPage

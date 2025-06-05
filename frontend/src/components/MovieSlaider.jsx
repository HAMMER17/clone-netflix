import React, { useEffect, useRef, useState } from 'react'
import { useContentStore } from '../store/content'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Small_Url_Image } from '../utils/constant'
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react'

const MovieSlaider = ({ category }) => {
  const scrollRef = useRef(null)
  const [showArrow, setShowArrow] = useState()
  const [content, setContent] = useState([])
  const { contentType } = useContentStore()

  const formattedContentType = contentType === 'movie' ? ' Movies' : ' Tv Show'

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`)
      setContent(res.data.content)
    }
    getContent()
  }, [contentType, category])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: 'smooth' })

    }
  }
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: 'smooth' })
    }
  }
  return (
    <div className=' relative '
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}>
      <h1>
        <span className='text-red-600 italic'>{category.toUpperCase()} </span>{formattedContentType}
      </h1>
      <div className='flex overflow-x-scroll scrollbar-hide' ref={scrollRef}>
        {content?.map((item) => (
          <Link to={`/watch/${item?.id}`} key={item?.id} className=' min-w-[200px] md:min-w-[250px] group relative'>
            <div className=' rounded-xl overflow-hidden m-1 '>
              <img className=' transition-transform duration-300 group-hover:scale-110 '
                src={Small_Url_Image + item?.backdrop_path} alt="poster" />

            </div>
            <p className='text-center  font-serif'>{item?.original_title || item?.original_name}</p>
          </Link>
        ))}
      </div>
      {showArrow && (
        <>
          <button onClick={scrollLeft} className='absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer'>
            <CircleChevronLeft size={30} />
          </button>
          <button onClick={scrollRight} className=' absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer'>
            <CircleChevronRight size={30} />
          </button>
        </>
      )}
    </div>
  )
}

export default MovieSlaider

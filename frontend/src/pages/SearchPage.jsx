import React, { useState } from 'react'
import { useContentStore } from '../store/content'
import Navbar from '../components/Navbar'
import { Search } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Base_Url_Image } from '../utils/constant'

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('movie')
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  const { setContentType } = useContentStore()

  const handleTabContent = (tab) => {
    setActiveTab(tab)
    tab === 'movie' ? setContentType('movie') : setContentType('tv')
    setResults([])
  }
  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${search}`)
      setResults(res.data.content)
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Nothing found, make sure you are searching under the right category");
      } else {
        toast.error("An error occurred, please try again later");
      }
      console.log(error)
    }
  }
  // console.log(results, 'results')
  return (
    <div className=' min-h-screen bg-black text-white'>
      <Navbar />
      <div className='flex justify-center items-center gap-4'>
        <button onClick={() => handleTabContent('movie')}
          className={` rounded ${activeTab === 'movie' ? 'bg-red-700' : 'bg-gray-800'}
           cursor-pointer hover:bg-red-500 px-4 py-2`}>Movies</button>
        <button onClick={() => handleTabContent('tv')}
          className={` rounded ${activeTab === 'tv' ? 'bg-red-700' : 'bg-gray-800'}
          cursor-pointer  hover:bg-red-500 px-4 py-2`}>TV Show</button>
        <button onClick={() => handleTabContent('person')}
          className={` rounded ${activeTab === 'person' ? 'bg-red-700' : 'bg-gray-800'}
          cursor-pointer  hover:bg-red-500 px-4 py-2`}>Person</button>
      </div>

      <form onSubmit={handleSearch} className='flex gap-2 justify-center items-center w-full p-4'>
        <input type="text" className='p-2 bg-gray-700 w-xl'
          placeholder={'Search for a ' + activeTab}
          value={search} onChange={(e) => setSearch(e.target.value)}
        />
        <button className='bg-red-600 p-2 cursor-pointer'><Search /></button>
      </form>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {results.map((result) => {
          if (!result.poster_path && !result.profile_path) return null;
          return (
            <div key={result.id} className='bg-gray-500 rounded p-2'>
              {activeTab === 'person' ? <div className='flex flex-col items-center'>
                <img src={Base_Url_Image + result?.profile_path}
                  className='max-h-96 rounded mx-auto'
                  alt="poster" />
                <h2 className='mt-2 text-xl font-bold'>{result?.name}</h2>
              </div> : <Link to={`/watch/${result.id}`} onClick={() => setContentType(activeTab)}>
                <img src={Base_Url_Image + result?.poster_path} alt="hero" />
                <h2 className='mt-2 text-xl font-bold'>{result?.title || result?.name}</h2>
              </Link>}
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default SearchPage

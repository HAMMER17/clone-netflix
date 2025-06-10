import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { Small_Url_Image } from '../utils/constant'
import { formatDate } from '../utils/formatdate'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([])

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get('/api/v1/search/history')
        setSearchHistory(res.data.content)
      } catch (error) {
        console.log(error)
        setSearchHistory([])
      }
    }
    getSearchHistory()
  }, [])
  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete search item");
    }
  };
  console.log('search ', searchHistory)
  return (
    <div className='bg-black text-white min-h-screen'>
      <Navbar />
      <h1 className='p-2'>Search History</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4 p-2'>
        {searchHistory?.map((item) => (

          <div key={item.id} className='bg-gray-800 p-4 rounded flex justify-between items-center'>
            <img src={Small_Url_Image + item?.image} alt="item" className='size-26 rounded object-cover mr-4' />
            <div className='flex flex-col'>
              <h1>{item?.title}</h1>
              <h3>{formatDate(item.createdAt)}</h3>
              <span className={` rounded text-center ${item.searchType === 'movie' ? 'bg-yellow-600'
                : item.searchType === 'tv' ? 'bg-blue-600' : 'bg-green-600'}`}>{item?.searchType}</span>
            </div>
            <button className=' p-1 cursor-pointer bg-red-600 rounded hover:bg-red-800' onClick={() => handleDelete(item)}>
              <Trash2 size={25} /></button>
          </div>

        ))}
      </div>

    </div>
  )
}

export default HistoryPage

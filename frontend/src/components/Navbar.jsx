import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'
import { Search, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import { useContentStore } from '../store/content'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const toggleOpenMenu = () => {
    setIsOpen(!isOpen)
  }
  const { setContentType } = useContentStore()
  return (
    <header className='w-full h-20 z-20 relative flex justify-between items-center  text-white p-4'>
      <div className='p-2 flex items-center gap-4 '>
        <Link to={'/'} onClick={() => setContentType('movie')}>
          <img src="/Netflix_logo.webp" alt="logo" className='w-32 p-2 rounded-2xl cursor-pointer' />
        </Link>
        <div className='hidden md:flex items-center gap-4 font-serif'>
          <Link to={'/'} onClick={() => setContentType('movie')}
            className='cursor-pointer font-bold  hover:text-red-500'>Movies</Link>
          <Link to={'/'} onClick={() => setContentType('tv')}
            className='cursor-pointer font-bold  hover:text-red-500'>Tv Show</Link>
          <Link to={'/history'} onClick={() => setContentType('history')}
            className='cursor-pointer font-bold  hover:text-red-500'>Search History</Link>
        </div>
        {/* <button className='bg-red-600 p-2 rounded-md cursor-pointer'>logout</button> */}
      </div>
      <div className='flex items-center gap-4'>
        <Search className='cursor-pointer' onClick={() => navigate('/search')} />
        <img src={user.image} alt="avatar" className='h-10 w-10 object-cover rounded-full ' />
        <LogOut className='text-red-600  cursor-pointer' onClick={logout} />
        <Menu className=' flex md:hidden cursor-pointer ' onClick={toggleOpenMenu} />
      </div>
      {isOpen && (
        <div className=' flex flex-col  p-4 items-center justify-center gap-4 rounded-md bg-black text-white absolute top-20 left-2'>
          <Link to={'/'} onClick={() => setContentType('movie')} className='cursor-pointer hover:text-red-500 '>Movies</Link>
          <Link to={'/'} onClick={() => setContentType('tv')} className='cursor-pointer  hover:text-red-500'>Tv Show</Link>
          <Link to={'/history'} onClick={() => setContentType('history')} className='cursor-pointer  hover:text-red-500'> History</Link>
        </div>
      )}
    </header>
  )
}

export default Navbar

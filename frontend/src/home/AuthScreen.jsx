import { useState } from 'react'
import { Link } from 'react-router-dom'
import king from '../video-neflix/king.mp4'
import alica from '../video-neflix/alica.mp4'
import kingsman from '../video-neflix/kingsman.mp4'
import { ChevronRight } from 'lucide-react';

const AuthScreen = () => {
  const data = [king, alica, kingsman]
  const video = data[Math.floor(Math.random() * data.length)]
  const [email, setEmail] = useState('')
  return (
    <div className='netflix-logo text-center'>
      <header className='bg-black h-20 flex justify-between items-center md:px-40 px-4 '>
        <img src="/Netflix_logo.webp" alt="logo" className='h-full' />
        <Link to={'/login'} className='p-2 bg-red-600 rounded-md text-white '>Sing In</Link>
      </header>
      <div className='text-white '>
        <h1 className='pt-40 text-5xl font-bold font-serif'>Unlimited films, series and more</h1>
        <h2 className='text-3xl pt-4'>Starts at €9.49. Cancel at any time.</h2>
        <h4>
          Ready to watch? Enter your email to create or restart your membership.</h4>
      </div>
      <form className='flex p-6 flex-col md:flex-row items-center justify-center gap-1'>
        <input type="email" placeholder='Email address' onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='px-8 py-4 border-2 border-white text-white bg-black' />
        <button className='flex items-center bg-red-600 px-8 py-4 text-white border-2
         border-white cursor-pointer z-1'>Get Started
          <ChevronRight />
        </button>
      </form>
      {/* <div className='h-2 bg-gray-700 w-full' /> */}
      <div className='h-2 bg-red-700 w-full' />
      <div className='bg-black p-2 text-white'>
        <div className='flex items-center justify-center md:flex-row flex-col'>
          <div className='flex-1'>
            <h1 className=' text-3xl p-4 italic'>Enjoy on your TV</h1>
            <p className=' font-sans '>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
          </div>
          <div className='flex-1 relative'>
            <img src="/tv.avif" alt="tv" className='' />
            <video src={video} className=' absolute md:top-[-80px] top-[-50px] left-0 md:p-42 p-24'
              // playsInline
              autoPlay={true}
              loop
              muted
            >
              {/* <source src="/alica.mp4" type="video/mp4" /> */}
            </video>
          </div>
        </div>
      </div>
      <div className='h-2 bg-red-700 w-full' />
      {/* <div className='h-2 bg-gray-700 w-full' /> */}
      <div className='bg-black p-2 text-white'>
        <div className='flex items-center justify-center md:flex-row flex-col-reverse'>
          <div className='flex-1 flex justify-center items-center relative'>
            <img src="/home-mobile.jpg" alt="tv" />
            <div className=' absolute md:top-90 top-100 md:left-60 left-0 h-20 w-70 rounded-md border-2 border-white bg-black flex items-center gap-2 '>
              <img src="/film.jpg" alt="film" className='h-full' />
              <h3 className='text-center font-serif italic'>Download...</h3>
            </div>
          </div>
          <div className='flex-1'>
            <h1 className=' text-3xl p-4 font-serif italic '>Download your series to watch offline</h1>
            <p>Save your favourites easily and always have something to watch.</p>
          </div>
        </div>
      </div>
      <div className='h-2 bg-red-700 w-full' />
      {/* <div className='h-2 bg-gray-700 w-full' /> */}
      <div className='bg-black p-2 text-white'>
        <div className='flex items-center justify-center md:flex-row flex-col'>
          <div className='flex-1'>
            <h1 className=' text-3xl p-4 italic'>Watch everywhere</h1>
            <p>Stream unlimited films and series on your phone, tablet, laptop and TV.</p>
          </div>
          <div className='flex-1 flex justify-center items-center'>
            <img src="/phone.jpg" alt="tv" />
          </div>

        </div>
      </div>
      <div className='h-2 bg-red-700 w-full' />
    </div>
  )
}

export default AuthScreen

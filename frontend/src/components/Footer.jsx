import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black text-white p-2 flex justify-between items-center flex-col md:flex-row'>
      <div className='flex-1 p-2 text-center'>
        <h2 className=' text-2xl p-2'>What is Netflix?</h2>
        <p className=' italic font-serif'>Netflix is a streaming service that offers a wide variety of award-winning TV programmes, films, anime, documentaries and more – on thousands of internet-connected devices.</p>
      </div>
      <div className='flex-1 p-2 text-center'>
        <h2 className=' text-2xl p-2'>Where can i watch?</h2>
        <p className=' italic font-serif'>Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.</p>
      </div>
    </footer>
  )
}

export default Footer

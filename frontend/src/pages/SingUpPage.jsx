import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser.js'

const SingUpPage = () => {
  const { searchParams } = new URL(document.location)
  const emailValue = searchParams.get('email')
  const [email, setEmail] = useState(emailValue || '')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { signup } = useAuthStore()

  const handlerSingUp = (e) => {
    e.preventDefault()
    signup({ email, username, password })

  }
  return (
    <div className='netflix-logo  '>
      <header className='w-full bg-black'>
        <Link to={'/'}>
          <img src="/Netflix_logo.webp" alt="logo" className='h-22 rounded-2xl p-2' />
        </Link>

      </header>
      <div className='flex justify-center flex-col items-center p-4'>
        <h1 className='px-10 p-3 font-serif text-white bg-black rounded-md m-1 border-2 border-white'>Sing Up</h1>
        <form className=' bg-black text-white flex flex-col p-8  rounded-md font-mono border-2 border-white'
          onSubmit={handlerSingUp}>

          <label htmlFor="username" className='p-1'>Name</label>
          <input type="text" placeholder='your name' value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='p-2 italic m-1 bg-gray-800 rounded-md ' />

          <label htmlFor="email" className='p-1'>Email</label>
          <input type="text" placeholder='example@mail.ru' value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='p-2 italic m-1 bg-gray-800 rounded-md' />

          <label htmlFor="password" className='p-1'>Password</label>
          <input type="text" placeholder='*******' value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='p-2 italic m-1 bg-gray-800 rounded-md' />
          <button className=' rounded-xl bg-red-700 p-2 my-4 hover:bg-red-900 cursor-pointer'>register</button>
        </form>
        <div className='flex text-white gap-2 bg-black p-4 rounded-md m-2 font-serif border-2 border-white'>
          <p>Already have a account?</p><span className='text-red-700 hover:text-red-500 hover:underline'>
            <Link to={'/login'}> Login</Link> </span>
        </div>
      </div>
    </div>
  )
}

export default SingUpPage

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'

const LoginPage = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { login } = useAuthStore()

  const handlerLogin = (e) => {
    e.preventDefault()
    login({ email, password })

  }
  return (
    <div className='netflix-logo  '>
      <header className='w-full bg-black'>
        <Link to={'/'}>
          <img src="/Netflix_logo.webp" alt="logo" className='h-22 rounded-2xl p-2' />
        </Link>

      </header>
      <div className='flex justify-center flex-col items-center p-4'>
        <h1 className='px-10 p-3 font-serif text-white bg-black 
        rounded-md m-1 border-2 border-white'>Login</h1>
        <form className=' bg-black text-white flex flex-col p-8 
          rounded-md font-mono border-2 border-white'
          onSubmit={handlerLogin}>



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
          <p>Do not have a account?</p><span className='text-red-700 hover:text-red-500 hover:underline'>
            <Link to={'/singup'}> Sing Up</Link> </span>
        </div>
      </div>
    </div>
  )
}



export default LoginPage

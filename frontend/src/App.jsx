import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SingUpPage from './pages/SingUpPage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import { useEffect } from 'react'
import WatchPage from './pages/WatchPage'
import SearchPage from './pages/SearchPage'
import HistoryPage from './pages/HistoryPage'
import { Loader } from 'lucide-react'

function App() {
  const { user, isAuthCheck, authCheck } = useAuthStore()

  useEffect(() => {
    authCheck()
  }, [authCheck])
  if (isAuthCheck) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path='/singup' element={!user ? <SingUpPage /> : <Navigate to={'/'} />} />
        <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={'/login'} />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to={'/login'} />} />
        <Route path='/history' element={user ? <HistoryPage /> : <Navigate to={'/login'} />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App

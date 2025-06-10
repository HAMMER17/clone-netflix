
import HomeScreen from '../home/HomeScreen'
import AuthScreen from '../home/AuthScreen'
import { useAuthStore } from '../store/authUser'

const HomePage = () => {
  const { user } = useAuthStore()
  return (
    <div className='bg-black'>
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage

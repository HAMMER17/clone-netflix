import React from 'react'
import HomeScreen from '../home/HomeScreen'
import AuthScreen from '../home/AuthScreen'
import { useAuthStore } from '../store/authUser'

const HomePage = () => {
  const { user } = useAuthStore()
  return (
    <div >
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage

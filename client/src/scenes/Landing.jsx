import React, { useState } from 'react'
import styles from '../styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { setUserInfo } from '../app/userInfoSlice'

const Landing = () => {
  const x = useSelector(state => state.userInfo.username)
  const [username, setUsername] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setUserInfo(username))
    navigate('/dashboard')
  }


  return (
    <div className={`${styles.fullScreen} ${styles.flexCenter} flex-col gap-2 bg-[#1a1a1a]  p-4`}>
      <form 
      onSubmit={handleSubmit}
      className="flex gap-2 bg-gradient-to-br from-violet-600 to-purple-600 items-center justify-center flex-col w-[300px] h-[350px] px-4 py-8 bg-[#ededed] rounded-md">
        <h1 className="font-bold text-[32px] text-white">Username</h1>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full transition-all text-center outline-none text-[20px] rounded-md px-2 py-1 border-[2px] border-transparent focus:border-[2px] focus:border-pink-500"
        />
        <button
          type='submit'

          className="w-full text-white bg-pink-500 transition-all outline-none text-[20px] rounded-md px-2 py-2 border-none"
        >Enter</button>
      </form>
    </div>
  )
}

export default Landing
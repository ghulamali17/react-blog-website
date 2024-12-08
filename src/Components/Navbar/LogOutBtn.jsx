import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
function LogOutBtn() {
    const dispatch=useDispatch()
    const logOutHandler=()=>{
        authService.logout().then(()=>{
dispatch(logout())
        })
    }
  return (
    <div>
      <button className='inline-block px-6 py-2 duration-200 hover:text-purple-500 rounded-full'>Logout</button>
    </div>
  )
}

export default LogOutBtn

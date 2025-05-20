import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Field, Input, Label } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'

const Login = () => {
  const [input,setInput] = useState({
      email:"",
      password:"",
      role:"",
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loading} = useSelector(state => state.auth)
  
    const changeEventHandler = (e) => {
      setInput({...input,[e.target.name]: e.target.value})
    }
  
    const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(res.data.success){
        dispatch(setUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      dispatch(setLoading(false))
    }
  }
  
  return (
    <div className='h-screen'>
      <Navbar/>
      <div className="flex  flex-1 flex-col  justify-center mx-auto items-center px-6 py-12 lg:px-8 text-white  ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight ">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full max-sm:max-w-md max-w-xl  ">
          <form onSubmit={submitHandler} className='flex flex-col gap-4'>

            <div>
              <div className="flex items-center justify-between">
                <label  className="block text-lg font-medium ">
                  Email
                </label>
              </div>
              <div className="mt-1">
                <input 
                  type='email'
                  name='email'
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder='abhi@gmail.com'
                  required
                  className="block w-full rounded-md border border-gray-200 bg-[#09090B] px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2   sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label  className="block text-lg font-medium ">
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input 
                  type='password'
                  placeholder='********'
                  name='password'
                  value={input.password}
                  onChange={changeEventHandler}
                  required
                  className="block w-full rounded-md border border-gray-200 bg-[#09090B] px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2   sm:text-sm/6"
                />
              </div>
            </div>

            <div className='flex items-center justify-between gap-4 my-5'>
              
            <div className='flex items-center gap-4'>
                <div className="mt-1 flex items-center gap-2">
                  <input 
                    type='radio'
                    id='r1'
                    name='role'
                    value='student'
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className=" cursor-pointer rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <div className="flex items-center justify-between">
                    <label htmlFor='r1'  className="block text-sm/6 font-medium  cursor-pointer">
                      Student
                    </label>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <input 
                    type='radio'
                    id='r2'
                    name='role'
                    value='recruiter'
                    onChange={changeEventHandler}
                    checked={input.role === 'recruiter'}
                    className="  cursor-pointer rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <div className="flex items-center justify-between">
                    <label htmlFor='r2' className="block text-sm/6 font-medium   cursor-pointer">
                      Recruiter
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {
                loading ? <button 
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Loading....</button>:<button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#6044CF] px-3 py-1.5 text-lg font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
              }
              <div className='text-base font-semibold mt-5'>
                <span>Already have an account ?   <Link className='text-blue-600 underline' to='/signup' > Sign up</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
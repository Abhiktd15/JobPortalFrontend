import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Field, Input, Label } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'

const Signup = () => {
  const [input,setInput] = useState({
    fullName:"",
    email:"",
    password:"",
    phoneNumber:"",
    role:"",
    file:""
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {loading} = useSelector(state => state.auth)

  const changeEventHandler = (e) => {
    setInput({...input,[e.target.name]: e.target.value})
  }
  const changeFileHandler = (e) => {
    const selectedFile = e.target.files[0]
    setInput({...input,file:selectedFile})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName",input.fullName)
    formData.append("email",input.email)
    formData.append("password",input.password)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("role",input.role)
    if(input.file){
      formData.append("file",input.file)
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      })
      if(res.data.success){
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally{
      dispatch(setLoading(false))
    }
  }
  
  return (
    <div>
      <Navbar/>
      <div className="flex min-h-full flex-1 flex-col  justify-center mx-auto items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full max-sm:max-w-md max-w-xl ">
          <form onSubmit={submitHandler}  className='flex flex-col gap-4'>
            <div>
              <label  className="block text-sm/6 font-medium text-gray-900">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  placeholder='Abhishek'
                  value={input.fullName}
                  name='fullName'
                  onChange={changeEventHandler}
                  required
                  className="block w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label  className="block text-sm/6 font-medium text-gray-900">
                  Email
                </label>
              </div>
              <div className="mt-1">
                <input 
                  type='email'
                  placeholder='abhi@gmail.com'
                  value={input.email}
                  name='email'
                  onChange={changeEventHandler}
                  required
                  className="block w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label  className="block text-sm/6 font-medium text-gray-900">
                  Phone Number
                </label>
              </div>
              <div className="mt-1">
                <input 
                  type='tel'
                  placeholder='6397######'
                  value={input.phoneNumber}
                  name='phoneNumber'
                  onChange={changeEventHandler}
                  required
                  className="block w-full border border-gray-200 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label  className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input 
                  type='password'
                  value={input.password}
                  name='password'
                  onChange={changeEventHandler}
                  placeholder='********'
                  required
                  className="block w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className='flex items-center justify-between gap-4 my-5'>
              
              <div className='flex items-center gap-4'>
                <div className="mt-1 flex items-center gap-2">
                  <input 
                    type='radio'
                    name='role'
                    value='student'
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className=" cursor-pointer rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <div className="flex items-center justify-between">
                    <label   className="block text-sm/6 font-medium text-gray-900">
                      Student
                    </label>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <input 
                    type='radio'
                    name='role'
                    value='recruiter'
                    onChange={changeEventHandler}
                    checked={input.role === 'recruiter'}
                    className="  cursor-pointer rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <div className="flex items-center justify-between">
                    <label  className="block text-sm/6 font-medium text-gray-900">
                      Recruiter
                    </label>
                  </div>
                </div>
              </div>

              {/* Profile Image  */}
              <div className="flex items-center justify-between">
              <div className="flex items-center justify-between">
                <label  className=" text-sm/6 font-medium text-gray-900 ">
                  Profile
                </label>
              </div>
              <div className="mt-1">
                <input 
                  accept='image/*'
                  name='file'
                  onChange={changeFileHandler}
                  type='file'
                  className="cursor-pointer block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-black placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            </div>

            <div>
              {
                loading ? <button className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Loading....</button>:<button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
              }
              <div className='text-base font-semibold mt-5'>
                <span>Already have an account ?   <Link className='text-blue-600 underline' to='/login' > Login</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
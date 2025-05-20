import React, { useState } from 'react'
import Navbar from '../../components/shared/Navbar'
import { Description } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { PencilIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PostJobs = () => {
    const [input,setInput] = useState({
        title:"",
        description:"",
        requirements:"",
        salary:"",
        location:"",
        jobType:"",
        experience:"",
        position: 0,
        companyId:""
    })
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const {companies} = useSelector(state => state.company)

    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]:e.target.value})
    }
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(company => company._id === value)
        setInput({...input,companyId:selectedCompany._id})
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
                headers:{
                    "Content-Type":"application/json",
                },
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }
    }   
    
    return (
        <div className='h-screen'>
            <Navbar/>
            <div className='flex items-center justify-center w-screen my-5 '>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md '>
                    <div className='flex items-center justify-between mb-3  '>
                        <label>Title</label>
                        <input value={input.title} name="title" onChange={changeEventHandler} type="text" className='border-2 border-gray-300 bg-[#09090B] text-white rounded-md p-2 ' />
                    </div>
                    <div className='flex items-center justify-between mb-3'>
                        <label>Description</label>
                        <input value={input.description} name="description" onChange={changeEventHandler} type="text" className='border-2 border-gray-300 bg-[#09090B] text-white rounded-md p-2 ' />
                    </div>
                    <div className='flex items-center justify-between mb-3'>
                        <label>Requirements</label>
                        <input value={input.requirements} name="requirements" onChange={changeEventHandler} type="text" className='border-2 border-gray-300 bg-[#09090B] text-white rounded-md p-2 ' />
                    </div>
                    <div className='flex items-center justify-between mb-3'>
                        <label>Salary</label>
                        <input value={input.salary} name="salary" onChange={changeEventHandler} type="text" className='border-2 border-gray-300 bg-[#09090B] text-white  rounded-md p-2 ' />
                    </div>
                    <div className='flex items-center justify-between mb-3'>
                        <label>Location</label>
                        <input value={input.location} name="location" onChange={changeEventHandler} type="text" className='border-2 border-gray-300 bg-[#09090B] text-white  rounded-md p-2 ' />
                    </div>
                    <div className='flex items-center justify-between mb-3'>
                        <label>Job Type</label>
                        <input value={input.jobType} name="jobType" onChange={changeEventHandler} type="text" className='border-2 border-gray-300 bg-[#09090B] text-white  rounded-md p-2 ' />
                    </div>
                    <div className='flex items-center justify-between mb-3'>
                        <label>Experience Level</label>
                        <input value={input.experience} name="experience" onChange={changeEventHandler} type="text" className='border-2 border-gray-300 bg-[#09090B] text-white  rounded-md p-2 ' />
                    </div>
                    <div className='flex items-center justify-between mb-3'>
                        <label>No of Positions</label>
                        <input value={input.position} name="position" onChange={changeEventHandler} type="number" className='border-2 border-gray-300 bg-[#09090B] text-white  rounded-md p-2 ' />
                    </div>

                    {
                        //:Lets work on this lateer
                        companies?.length > 0 && 
                        <div className='flex items-center justify-between mb-3'>
                            <select name="companyId"
                                onChange={(e) => selectChangeHandler(e.target.value)}
                                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 bg-[#09090B]">
                                <option value=""  selected disabled>Choose Company</option>
                                {
                                    companies?.map((company) => 
                                        <option key={company?._id}  value={company?._id}>{company?.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    }
                    <button className='w-full bg-[#6044CF] text-white rounded-lg py-3 font-medium hover:bg-gray-600'>{
                        loading?"Loading...":"Post Job"    
                    }</button>
                    {
                        companies?.length === 0 &&  <p className='text-sm font-bold my-3 text-red-600 '>Please register a company first before posting jobs !</p>
                    }
                </form>

            </div>
        </div>
    )
}

export default PostJobs
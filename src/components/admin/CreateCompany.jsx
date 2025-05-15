import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';

const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [companyName,setCompanyName] = useState()

    const registerCompany = async (e) => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

  
    

    return (
        <div>
            <Navbar/>
            <div className='max-w-4xl mx-auto my-10  '>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>  
                    <p className='text-gray-500 text-base  font-medium'>What would you like to give your company name? You can change this later</p>
                </div>

                <div className=' flex flex-col  gap-2'>
                    <label className='text-lg font-bold '>Company Name</label>
                    <input type="text" onChange={(e) => setCompanyName(e.target.value)} placeholder='Job Hunt, Microsoft' className='border-2 border-gray-300 rounded-md my-2 p-2 w-full'/>
                </div>
                <div className='flex items-center gap-2 my-10'>
                    <button onClick={() => navigate('/admin/companies')} className='border px-3 py-2 rounded-xl text-black bg-white font-medium'>Cancel</button>
                    <button onClick={registerCompany} className='border px-3 py-2 rounded-xl text-white bg-gray-800 font-medium'>Continue</button>

                </div>
            </div>
        </div>
    )
}

export default CreateCompany
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import useGetCompanyById from '../../hooks/useGetCompanyById'
import { setSingleCompany } from '../../redux/companySlice'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }
    const submitHandler  = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name",input.name)
        formData.append("description",input.description)
        formData.append("website",input.website)
        formData.append("location",input.location)
        if(input.file){
            formData.append("file",input.file)
        }
        try {
            setLoading(true)
            const res = await axios.post(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message)
                navigate('/admin/companies')
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null
        })
    },[singleCompany]);
    

    return (
        <div className='h-screen'>
            <Navbar/>
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Link to={'/admin/companies'} className='border px-3 py-2 bg-black text-white font-medium flex items-center gap-2 rounded-lg border-gray-400 hover:bg-gray-700'><ArrowLeftIcon className='w-4'/> Back</Link>
                        <h1 className='font-bold text-xl underline  underline-offset-4'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4 items-center'>
                        <label >Company Name</label>
                        <input type="text" name='name' value={input.name} onChange={changeEventHandler}  className='border-2 border-gray-300 bg-[#09090B] rounded-md my-2 p-2 w-fit'/>
                    </div>
                    <div className='grid grid-cols-2 gap-4 items-center'>
                        <label >Description</label>
                        <input type="text" name='description' value={input.description} onChange={changeEventHandler}  className='border-2 bg-[#09090B] border-gray-300 rounded-md my-2 p-2 w-fit'/>
                    </div>
                    <div className='grid grid-cols-2 gap-4 items-center'>
                        <label >Website</label>
                        <input type="text" name='website' value={input.website} onChange={changeEventHandler}   className='border-2 bg-[#09090B] border-gray-300 rounded-md my-2 p-2 w-fit'/>
                    </div>
                    <div className='grid grid-cols-2 gap-4 items-center'>
                        <label >Location</label>
                        <input type="text" name='location' value={input.location} onChange={changeEventHandler}   className='border-2 bg-[#09090B] border-gray-300 rounded-md my-2 p-2 w-fit'/>
                    </div>
                    <div className='grid grid-cols-2 gap-4 items-center'>
                        <label >Company Logo</label>
                        <input type="file" accept='image/*' name='name' onChange={changeFileHandler} className='border-2 border-gray-300 bg-[#09090B] rounded-md my-2 p-2 w-fit'/>
                    </div>
                    <button type='submit' className='w-full mt-8 border px-3 py-2 bg-[#6044CF] text-white font-semibold text-lg rounded-lg'>
                        {loading ? "Loading..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
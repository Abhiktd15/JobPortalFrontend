import React,{useEffect, useState} from 'react'
import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../redux/companySlice'

const Companies = () => {
    useGetAllCompanies()
    const disptach = useDispatch()
    const navigate = useNavigate()
    const [input,setInput] = useState('')

    useEffect(() => {
        disptach(setSearchCompanyByText(input))
    },[input])
    
    
    return (
        <div className='h-screen'>
            <Navbar/>
            <div className='max-w-6xl mx-auto my-10 border border-gray-200 rounded-xl px-6 py-4'>
                <div className='flex items-center justify-between'>
                    <input type="text" placeholder='Filter By Name' onChange={(e) => setInput(e.target.value)} className='border-2 border-gray-300 bg-[#09090B] rounded-md p-2 w-fit text-white'/>
                    <button onClick={() => navigate('/admin/companies/create')} className='border px-3 py-2 rounded-xl text-white bg-[#6044CF] font-medium'>New Company</button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies
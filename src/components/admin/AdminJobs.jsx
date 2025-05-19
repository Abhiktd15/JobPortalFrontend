import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchCompanyByText } from '../../redux/companySlice'
import Navbar from '../shared/Navbar'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../../redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs()
    const disptach = useDispatch()
    const navigate = useNavigate()
    const [input,setInput] = useState('')

    useEffect(() => {
        disptach(setSearchJobByText(input))
    },[input])
    
    
    return (
        <div>
            <Navbar/>
            <div className='max-w-6xl mx-auto my-10 '>
                <div className='flex items-center justify-between'>
                    <input type="text" placeholder='Filter By Name' onChange={(e) => setInput(e.target.value)} className='border-2 border-gray-300 rounded-md p-2 w-fit'/>
                    <button onClick={() => navigate('/admin/jobs/create')} className='border px-3 py-2 rounded-xl text-white bg-gray-800 font-medium'>New Jobs</button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs
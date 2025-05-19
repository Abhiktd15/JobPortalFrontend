import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
import JobCard from './JobCard'
import Navbar from './shared/Navbar'
import { useEffect } from 'react'
import { setSearchedQuery } from '../redux/jobSlice'

const Browse = () => {
    useGetAllJobs()
    const dispatch = useDispatch()
    const {allJobs} = useSelector((state) => state.job)
    useEffect(() => {
        dispatch(setSearchedQuery(""))
    })
    return (    
        <div>
            <Navbar/>
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-2xl my-10'>Serach Results ({allJobs?.length})</h1>
                <div className='grid grid-cols-3 gap-4 mt-5'>
                    {
                        allJobs?.map((job) => {
                            return (
                                <JobCard key={job?._id} job={job}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse
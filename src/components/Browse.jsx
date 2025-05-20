import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
import JobCard from './JobCard'
import Navbar from './shared/Navbar'
import { useEffect } from 'react'
import { setSearchedQuery } from '../redux/jobSlice'
import {motion} from 'framer-motion'

const Browse = () => {
    useGetAllJobs()
    const dispatch = useDispatch()
    const {allJobs} = useSelector((state) => state.job)
    useEffect(() => {
        dispatch(setSearchedQuery(""))
    })
    return (    
        <div className='h-screen'> 
            <Navbar/>
            <div className='max-w-7xl mx-auto my-10'>
                <div className='w-fit flex flex-col items-center gap-1'>
                    <h1 className='text-4xl font-bold'>Search Results ({allJobs?.length})</h1>
                    <hr className='w-1/3 border-2 border-[#6044CF]'/>
                </div>
                <motion.div
                initial={{opacity:0,y:100}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.5}}
                className='grid grid-cols-3 gap-4 mt-5'>
                    {
                        allJobs?.map((job) => {
                            return (
                                <JobCard key={job?._id} job={job}/>
                            )
                        })
                    }
                </motion.div>
            </div>
        </div>
    )
}

export default Browse
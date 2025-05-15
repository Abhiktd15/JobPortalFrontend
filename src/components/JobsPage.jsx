import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import JobCard from './JobCard'
import { useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'

const JobsPage = () => {
    const {allJobs} = useSelector(state => state.job)
    useGetAllJobs()
    return (
        <div>
            <Navbar/>
            <div className='max-w-7xl mx-auto mt-10'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard/>
                    </div>
                    {   
                        allJobs?.length<=0 ? <span>Jobs Not Found</span>:
                        (
                            <div className='flex-1 h-[80vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        allJobs?.map((job) => (
                                            <div>
                                                <JobCard key={job?._id} job={job}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default JobsPage
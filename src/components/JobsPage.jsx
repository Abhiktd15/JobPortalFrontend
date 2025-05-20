import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
import FilterCard from './FilterCard'
import JobCard from './JobCard'
import Navbar from './shared/Navbar'

const JobsPage = () => {
    useGetAllJobs()
    const {allJobs,searchedQuery} = useSelector(state => state.job)
    const [filterJobs, setFilterJobs] = React.useState(allJobs)


    useEffect(() => {

        if (searchedQuery && !isNaN(Number(searchedQuery))) {
            // If the query is a number (for salary)
            const filteredJobs = allJobs?.filter((job) => {
                return job?.salary?.toString().includes(searchedQuery);
            });
            setFilterJobs(filteredJobs);
        }
        else if(searchedQuery){
            const filteredJobs = allJobs?.filter((job) => {
                return job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) || job?.location?.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
            
        }else{
            setFilterJobs(allJobs)
        }
    },[allJobs,searchedQuery])
    
    return (
        <div>
            <Navbar/>
            <div className='max-w-7xl mx-auto mt-10'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard/>
                    </div>
                    {   
                        filterJobs?.length<=0 ? <span>Jobs Not Found</span>:
                        (
                            <div className='flex-1 h-[80vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs?.map((job) => (
                                            <motion.div  
                                            initial={{opacity:0, x: 100}}
                                            animate={{opacity:1, x: 0}}
                                            exit={{opacity:0, x: -100}}
                                            transition={{duration:0.5}}
                                            key={job?._id}>
                                                <JobCard  job={job}/>
                                            </motion.div>
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
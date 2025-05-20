import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'
import {motion} from 'framer-motion'

const LatestJobs = () => {
    const {allJobs} = useSelector(state => state.job)
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4}}
        className='max-w-7xl mx-auto my-20'>
            <div className='w-fit flex flex-col items-center gap-4'>
                <h1 className='text-4xl font-bold'><span className='text-[#6044CF]'>Latest & Top </span>Job Openings</h1>
                <hr className='w-1/3 border-2 border-[#6044CF]'/>
            </div>
            {/* Multiple job cards diplayed here  */}
            <motion.div
                initial={{opacity:0, x: 100}}
                animate={{opacity:1, x: 0}}
                exit={{opacity:0, x: -100}}
                transition={{duration:0.5}}
            className=' grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs?.length <= 0?<span>No Jobs Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCard  key={job._id} job={job}/>)
                }
            </motion.div>
        </motion.div>
    )
}

export default LatestJobs
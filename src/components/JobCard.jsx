import { BookmarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'

const JobCard = ({job}) => {
    const navigate = useNavigate()
    const daysAgoFunction = (mongoDbTime) => {
        const currentDate = new Date();
        const jobDate = new Date(mongoDbTime);
        const timeDifference = currentDate - jobDate;
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysAgo;
    }
    return (
        <motion.div
        whileHover={{rotateY:30}}
        transition={{duration:0.2}}
        className='p-5 min-h-[300px] rounded-2xl shadow-xl bg-[#09090B] border border-gray-100  '>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600'>{daysAgoFunction(job?.createdAt) === 0 ?"Today":`${daysAgoFunction(job?.createdAt)}`} days ago</p>
                <button className='border border-black p-2 rounded-full hover:bg-gray-100 hover:text-black'><BookmarkIcon className=' h-5 w-5 rounded-full '/></button>
            </div>
            <div className='flex items-center gap-4 my-2'>
                <button className=' border rounded-lg'>
                    {/* Avatar  */}
                    <img className='w-16 h-16 rounded-lg' src={job?.company?.logo}/>
                </button>
                <div>
                    <h1 className='font-medium text-lg '>{job?.company?.name}</h1>
                    <p className='font-medium text-gray-500 '>{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg'>{job?.title}</h1>
                <p>{job?.description?.slice(0,50)} .....</p>
            </div>
            <div className='flex-wrap flex items-center gap-2 mt-4'>
                <h3 className='border border-gray-200 px-2 py-1 text-blue-700 font-bold rounded-2xl' >{job?.position} Positions</h3>
                <h3 className='border border-gray-200 px-2 py-1 text-[#F83002] font-bold rounded-2xl' >{job?.jobType}</h3>
                <h3 className='border border-gray-200 px-2 py-1 text-[#7209b7] font-bold rounded-2xl' >{job?.salary} LPA</h3>
            </div>
            <div className=' flex items-center gap-4 mt-4'>
                <button onClick={() => navigate(`/jobs/description/${job?._id}`)} className='bg-[#7209b7] text-white py-2 px-3 rounded-md text-sm font-medium hover:scale-105'>View Details</button>
            </div>
        </motion.div>
    )
}

export default JobCard
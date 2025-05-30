import React from 'react'
import { useNavigate } from 'react-router-dom'

const LatestJobCard = ({job}) => {
    const navigate = useNavigate()
    
    return (
        <div onClick={() => navigate(`/jobs/description/${job?._id}`)} className='p-5 rounded-md shadow-xl bg-[#09090B]  border border-gray-100 cursor-pointer'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-gray-500 text-sm font-bold'>{job?.location}</p>
                </div>
                <img src={job?.company?.logo} className='w-24 h-20 rounded-lg'/>
            </div>
            <div>
                <h1 className='font-bold text-lg text-gray-300 my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-400'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <h3 className='border border-gray-200 px-2 py-1 text-blue-700 font-bold rounded-2xl' >{job?.position} Positions</h3>
                <h3 className='border border-gray-200 px-2 py-1 text-[#F83002] font-bold rounded-2xl' >{job?.jobType}</h3>
                <h3 className='border border-gray-200 px-2 py-1 text-[#7209b7] font-bold rounded-2xl' >{job?.salary} LPA</h3>
            </div>
        </div>
    )
}

export default LatestJobCard
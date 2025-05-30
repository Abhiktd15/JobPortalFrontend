import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSingleJob } from '../redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { toast } from 'react-toastify';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const {user} = useSelector(state => state.auth)
    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()
    const {singleJob} = useSelector(state => state.job)

    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id  )||false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials: true})
            if(res.data.success){
                setIsApplied(true) // Update the local state 
                const updateSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant :user?._id}]}
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials: true})
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
    },[jobId,dispatch,user?._id])
    
    return (
        <div className='h-screen'>
            <Navbar/>
            <div className='max-w-7xl mx-auto  border border-gray-300 rounded-xl p-8'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-2xl '>{singleJob?.title}</h1>
                        <div className='flex-wrap flex items-center gap-2 mt-4'>
                            <h3 className='border border-gray-200 px-2 py-1 text-blue-700 font-bold rounded-2xl' >{singleJob?.position} Positions</h3>
                            <h3 className='border border-gray-200 px-2 py-1 text-[#F83002] font-bold rounded-2xl' >{singleJob?.jobType}</h3>
                            <h3 className='border border-gray-200 px-2 py-1 text-[#7209b7] font-bold rounded-2xl' >{singleJob?.salary} LPA</h3>
                        </div>
                    </div>
                    <button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`border px-3 py-2 rounded-lg ${isApplied?"bg-gray-600 cursor-not-allowed":"bg-[#6044CF] hover:bg-[#af51ee]"} text-white font-medium hover:bg-gray-700`}>
                        {isApplied ? "Already Applied":"Apply Now"}
                    </button>
                </div>
                <h1 className=' border-b-2 border-b-gray-300 font-medium text-lg  py-4'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-mono text-gray-400'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-mono text-gray-400'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-mono text-gray-400'> {singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Requirements: {singleJob?.requirements?.map((item,index) => <span key={index} className='pl-4 font-mono text-gray-400'>{item} </span>)} </h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-mono text-gray-400'>{singleJob?.experienceLevel} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-mono text-gray-400'>{singleJob?.salary} Lpa</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-mono text-gray-400'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-mono text-gray-400'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { InboxIcon, MapPinIcon, PencilIcon, PhoneIcon } from '@heroicons/react/24/outline'
import AppliedJobsTable from './AppliedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJob from '../hooks/useGetAppliedJob'
import { color, motion } from 'framer-motion'

const SkillColorArray = ["text-blue-700", "text-red-700", "text-green-700", "text-yellow-700", "text-purple-700", "text-pink-700"]

const Profile = () => {
    useGetAppliedJob();
    const [open,setOpen] = useState(false)
    const {user} = useSelector(state => state.auth)

    const ResumeViewURL = `https://docs.google.com/gview?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`;

    return (
        <div>
            <Navbar/>
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <motion.img
                            initial={{ opacity: 1, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        className='w-24 h-24 rounded-lg' src={user?.profile?.profilePhoto}/>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </motion.div>
                    </div>
                    <button onClick={() => setOpen(true)}>
                        <PencilIcon className='h-5'/>
                    </button>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}  
                className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <InboxIcon className='h-6'/>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <PhoneIcon className='h-6'/>
                        <span>{user?.phoneNumber}</span>
                    </div>
                    <div>
                        <h1>Skills</h1>
                        <div className='flex-wrap flex items-center gap-2 mt-4'>
                            {
                                user?.profile?.skills?.length !== 0 ? user?.profile?.skills?.map((skill,index) => {
                                    const colorClass = SkillColorArray[index % SkillColorArray.length];
                                    return(
                                    <h3 key={index} className={`border border-gray-200 px-2 py-1 ${colorClass}  font-bold rounded-2xl`} >{skill}</h3>
                                    )
                                }
                                ) :<span>NA</span>
                            }
                        </div>
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <label className='text-sm font-semibold'>Resume</label>
                        {user?.profile?.resume ? <a className='text-blue-500 w-full hover:underline cursor-pointer' target='_blank' href={ResumeViewURL}>{user?.profile?.resumeOriginalName}</a>:<span>NA</span>}
                    </div>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    {/* Application Table  */}
                    <AppliedJobsTable/>
            </motion.div>
            {/* Edit Dialog box  */}
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { InboxIcon, MapPinIcon, PencilIcon, PhoneIcon } from '@heroicons/react/24/outline'
import AppliedJobsTable from './AppliedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'


const Profile = () => {
    const [open,setOpen] = useState(false)
    const {user} = useSelector(state => state.auth)

    const ResumeViewURL = `https://docs.google.com/gview?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`;

    return (
        <div>
            <Navbar/>
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <img className='w-24 h-24 rounded-lg' src={user?.profile?.profilePhoto}/>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <button onClick={() => setOpen(true)}>
                        <PencilIcon className='h-5'/>
                    </button>
                </div>
                <div className='my-5'>
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
                                user?.profile?.skills?.length !== 0 ? user?.profile?.skills?.map((skill,index) => 
                                    <h3 className='border border-gray-200 px-2 py-1 text-blue-700 font-bold rounded-2xl' >{skill}</h3>
                                ) :<span>NA</span>
                            }
                        </div>
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <label className='text-sm font-semibold'>Resume</label>
                        {user?.profile?.resume ? <a className='text-blue-500 w-full hover:underline cursor-pointer' target='_blank' href={ResumeViewURL}>{user?.profile?.resumeOriginalName}</a>:<span>NA</span>}
                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Application Table  */}
                <AppliedJobsTable/>
            </div>
            {/* Edit Dialog box  */}
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
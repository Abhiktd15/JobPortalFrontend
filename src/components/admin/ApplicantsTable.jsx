import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, PencilIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { toast } from 'react-toastify'
const shortListingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {
    const {allApplicants} = useSelector(state => state.application)
    const ResumeViewURL = `https://docs.google.com/gview?url=${encodeURIComponent(allApplicants?.applications?.map(application => application?.applicant?.profile?.resume))}&embedded=true`;

    const statusHandler = async (status,id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    

    return (
        <div>
            <div>
                <>
                    <table className='w-full text-center mt-10'>
                        <thead>
                            <tr className='font-semibold text-lg border-b-[1px] border-gray-100 mb-2 '>
                                <th className='p-3 text-start w-0.5/3'>FullName </th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Resume</th>
                                <th>Date</th>
                                <th className='text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allApplicants?.applications?.length < 0 ? <span>NO JObs Found</span> : (
                                    allApplicants?.applications?.map(application => (
                                        <tr key={application?._id} className='font-medium text-sm border-b-[1px] border-gray-100 hover:bg-[#101013] cursor-pointer '>
                                            <td className='p-2 text-start'>{application?.applicant?.fullName}</td>
                                            <td className='p-2'>{application?.applicant?.email}</td>
                                            <td className='p-2'>{application?.applicant?.phoneNumber}</td>
                                            <td className='p-2'><a className='text-blue-600 underline ' target='_blank' href={ResumeViewURL}>{application?.applicant?.profile?.resumeOriginalName}</a></td>
                                            <td className='p-2'>{application?.applicant?.createdAt.split("T")[0]}</td>
                                            <td className='p-2 flex items-end justify-end relative'>
                                                <Menu as="div" className="relative inline-block text-left">
                                                    <div>
                                                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                                                            <EllipsisHorizontalIcon className='w-6 h-6'/>                                        
                                                        </MenuButton>
                                                    </div>

                                                    <MenuItems
                                                        transition
                                                        className="absolute right-0 z-10 mt-2 min-w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                                    >
                                                        <div className="py-1">
                                                        {
                                                            shortListingStatus.map((status,index) => (
                                                                <MenuItem  key={index} className="text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                                                    <div  onClick={() => statusHandler(status,application?._id)} className='flex items-center gap-2 px-4 py-2'>
                                                                        {status}
                                                                        {
                                                                            status === "Accepted" ? <CheckIcon className='w-6 h-6 text-green-700'/> : <XMarkIcon className='w-6 h-6'/>
                                                                        }
                                                                    </div>
                                                                </MenuItem>
                                                            ))
                                                        }
                                                        
                                                        </div>
                                                    </MenuItems>
                                                </Menu>
                                            </td>
                                        </tr>
                                    ))
                                )
                                
                            }
                        </tbody>

                    </table>
                    <h1 className='text-sm mt-5  text-gray-400 font-semibold mb-5 text-center'>A list of your recent posted Jobs</h1>  
                </>
            </div>
        </div>
    )
}

export default ApplicantsTable
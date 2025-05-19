import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const {allAdminJobs,searchJobByText} = useSelector((state) => state.job)
    const [filterJobs,setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()
    
    useEffect(() => {
        const filteredJobs = allAdminJobs?.length>= 0 && allAdminJobs?.filter((job) => {
            if(!searchJobByText){
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filteredJobs)
    },[allAdminJobs,searchJobByText])
    
    return (
        <div>
            <div>
                {
                    filterJobs?.length <= 0 ?<div className='text-gray-500 font-medium mt-10 text-lg text-center'>You Haven't Registered Any Companies Yet</div> :(
                        <>
                            <table className='w-full text-center mt-10'>
                                <thead>
                                    <tr className='font-semibold text-lg border-b-[1px] border-gray-100 mb-2 '>
                                        <th className='p-3'>Company Name </th>
                                        <th>Role</th>
                                        <th>Date</th>
                                        <th className='text-right'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterJobs?.map((job) => (
                                        <tr key={job?._id} className='font-medium text-sm border-b-[1px] border-gray-100 hover:bg-gray-100 cursor-pointer '>
                                        <td className='p-2'>{job?.company?.name}</td>
                                        <td className='p-2'>{job?.title}</td>
                                        <td className='p-2'>{job?.createdAt.split("T")[0]}</td>
                                        <td className='p-2 flex items-end justify-end relative'>
                                            <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                                                Options
                                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                                </MenuButton>
                                            </div>

                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 min-w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                            >
                                                <div className="py-1">
                                                <MenuItem>
                                                    <div onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                        className="flex items-center gap-5 px-4 py-1 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                                    >
                                                    <PencilIcon className='w-6 h-6'/>    Edit
                                                    </div>
                                                </MenuItem>
                                                <MenuItem>
                                                    <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-5  px-4 py-1 text-sm text-gray-700      ">
                                                        <EyeIcon className='w-6 h-6'/>
                                                        <span>Applicants</span>
                                                    </div>
                                                </MenuItem>
                                                </div>
                                            </MenuItems>
                                            </Menu>
                                        </td>
                                    </tr>
                                    ))
                                    }
                                </tbody>

                            </table>
                            <h1 className='text-sm mt-5  text-gray-400 font-semibold mb-5 text-center'>A list of your recent posted Jobs</h1>  
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default AdminJobsTable
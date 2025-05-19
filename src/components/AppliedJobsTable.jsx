import { all } from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'

const AppliedJobsTable = () => {
    const {allAppliedJobs} = useSelector(state => state.job)

    return (
        <div>
            
            {
                allAppliedJobs?.length <=0 ? <h1 className='text-center text-gray-500 font-bold text-lg'>No Applied Jobs</h1> :(
                    <table className='w-full text-center'>
                        <thead>
                            <tr className='font-semibold text-lg border-b-[1px] border-gray-100 mb-2 '>
                                <th className='p-3'>Date</th>
                                <th>Job Role</th>
                                <th>Company</th>
                                <th className='text-right'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allAppliedJobs?.map(jobs => 
                                    <tr key={jobs?._id}>
                                        <td>{jobs?.createdAt?.split("T")[0]}</td>
                                        <td>{jobs?.job?.title}</td>
                                        <td>{jobs?.job?.company?.name}</td>
                                        <td className='flex items-center py-2 justify-end'>
                                            <h3 className={`border w-fit  px-2 py-1 ${jobs?.status === "pending" && "text-yellow-600 border-yellow-600"} ${jobs?.status === "accepted" && "text-green-600 border-green-600"} ${jobs?.status === "rejected" && "text-red-600 border-red-600"} font-bold rounded-2xl`} >{jobs?.status}</h3>
                                        </td>
                                    </tr>
                                ) 
                            }
                        </tbody>

                    </table>
                )
            }
        </div>
    )
}

export default AppliedJobsTable
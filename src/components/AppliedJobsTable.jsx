import React from 'react'

const AppliedJobsTable = () => {
    return (
        <div>
            
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
                        [1,2,].map((item,index) => (
                            <tr className='font-medium text-sm border-b-[1px] border-gray-100 hover:bg-gray-100 cursor-pointer '>
                                <td className='p-2'>17-07-2024</td>
                                <td className='p-2'>Frontend developer</td>
                                <td className='p-2'>Google</td>
                                <td className='p-2 flex items-end justify-end'><h3 className=' text-right border border-gray-200 px-2 py-1 w-fit text-white bg-gray-800 font-bold rounded-2xl' >Pending</h3></td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    )
}

export default AppliedJobsTable
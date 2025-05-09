import React from 'react'

const LatestJobCard = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white  border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-gray-500 text-sm'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Job Title</h1>
                <p className='text-sm text-gray-600'>Description ;alkdjfak; jkaj flkadjfka jfkj akfja;dfjadkfjadlkfj akd;jfaklj fkad jflajkdfkadj;fkj</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <h3 className='border border-gray-200 px-2 py-1 text-blue-700 font-bold rounded-2xl' >12 Positions</h3>
                <h3 className='border border-gray-200 px-2 py-1 text-[#F83002] font-bold rounded-2xl' >Part Time</h3>
                <h3 className='border border-gray-200 px-2 py-1 text-[#7209b7] font-bold rounded-2xl' >30LPA</h3>
            </div>
        </div>
    )
}

export default LatestJobCard
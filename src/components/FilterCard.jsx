import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'

const filterData = [
    {
        filterType:"Location",
        array:["Delhi NCR","Banglore","Hyderabad","Pune","Mumbai"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer","Backend Developer","UI/UX","HTML Developer","Test Engineer"]
    },
    {
        filterType:"Salary",
        array:["0-40K","42K-1lakh","1lakh-5lakh"]
    },
    

]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("")
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value)
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    },[selectedValue])

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3'/>
                {
                    filterData.map((data,index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item,idx) => {
                                    const itemId = `r${index}-${idx}`
                                    return (
                                        <div   className='flex items-center space-x-2 '>
                                            <input type='radio' name={data} value={selectedValue} id={itemId} onChange={() => changeHandler(item)} />
                                            <label className='text-sm font-medium cursor-pointer'  htmlFor={itemId}>{item}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
        </div>
    )
}

export default FilterCard
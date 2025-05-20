import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterData, setSearchedQuery } from '../redux/jobSlice'
import axios from "axios"
import { JOB_API_END_POINT } from '../utils/constant'


const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("")
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value)
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    },[selectedValue])

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/filter`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setFilterData(res.data.filterData))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchFilterData()
    },[dispatch])

    const {filterData } = useSelector(state => state.job)
    

    return (
        <div className='w-full bg-[#09090B] p-3 rounded-md border h-full'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3'/>
                {
                    filterData?.map((data,index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data?.filterType}</h1>
                            {
                                data?.array.map((item,idx) => {
                                    const itemId = `r${index}-${idx}`
                                    return (
                                        <div key={idx}  className='flex items-center space-x-2 hover:text-[#6044CF] '>
                                            <input type='radio' name={data} value={selectedValue} id={itemId} onChange={() => changeHandler(item)} />
                                            <label className='text-sm font-medium cursor-pointer'  htmlFor={itemId}>{item} {data?.filterType === "Salary" && " LPA"}</label>
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
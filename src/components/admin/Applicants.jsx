import React, { useEffect } from 'react'
import Navbar from '../../components/shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '../../redux/applicationSlice'
import { toast } from 'react-toastify'

const Applicants = () => {

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()
    const {allApplicants} = useSelector(state => state.application)

    useEffect(() => {
        const fetchAllApplicants = async() => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`,{
                    withCredentials:true
                })
                if(res.data.success) {
                    dispatch(setAllApplicants(res.data.job))
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchAllApplicants()
    },[])
    
    return (
        <div className='h-screen '>
            <Navbar/>
            <div className='max-w-7xl mx-auto border border-gray-200 rounded-xl px-6 mt-10 py-2'>
                <h1 className='font-bold text-xl my-5 underline  underline-offset-4 '>Applicants ({allApplicants?.applications?.length})</h1>
                <ApplicantsTable/>

            </div>
        </div>
    )
}

export default Applicants
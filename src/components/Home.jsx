import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '../redux/jobSlice'

const Home = () => {
  useGetAllJobs();
  const navigate  = useNavigate()
  const dispatch = useDispatch()

  const {user } = useSelector((state) => state.auth)
  useEffect(() => {
    if(user && user?.role === "recruiter"){
      navigate('/admin/companies')
    }
    dispatch(setSearchedQuery(''))

  },[])
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home
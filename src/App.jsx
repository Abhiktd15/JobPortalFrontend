import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Home from './components/Home'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobsPage from './components/JobsPage'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import { useEffect } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from './utils/constant'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/authSlice'
import { StrictMode } from 'react'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJobs from './components/admin/PostJobs'
import Applicants from './components/admin/Applicants'

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<JobsPage/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/jobs/description/:id",
    element:<JobDescription/>
  },
  //admin routes
  {
    path:"/admin/companies",
    element:<Companies/>
  },
  {
    path:"/admin/companies/create",
    element:<CreateCompany/>
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs/",
    element:<AdminJobs/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  },
  {
    path:"/admin/jobs/create",
    element:<PostJobs/>
  },
])

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`,{withCredentials:true})
        if (res.data.success) {
          dispatch(setUser(res.data.user))      
        }
      } catch (error) {
        console.log(error)
        toast.error("Please Login to continue")
      }
    }
    isAuthorized()
  },[])
  return (
    <>
      <RouterProvider router={appRouter}/>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { UserIcon,ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
    const {user} =  useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate  = useNavigate();

    const logoutHandler = async() => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials: true,})
            if(res.data.success){
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className="">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                <h1 className="text-2xl font-bold text-white">
                    Job<span className="text-[#6044CF]">Portal</span>
                </h1>
                </div>
                <div className="flex items-center gap-10">
                <ul className="flex font-bold items-center gap-5 ">
                    {user && user?.role === "recruiter" ? (
                        <>
                            <Link to='/admin/companies' className="text-white hover:text-[#6044CF]">Companies</Link>
                            <Link to='/admin/jobs' className="text-white hover:text-[#6044CF]">Jobs</Link>
                        </>
                    ) :(
                        <>
                            <Link to='/' className="text-white hover:text-[#6044CF]" >Home</Link>
                            <Link to='/jobs' className="text-white hover:text-[#6044CF]">Jobs</Link>
                            <Link to="/browse" className="text-white hover:text-[#6044CF]">Browse</Link>
                        </>
                    )}
                    
                </ul>

                {
                    !user ? (
                        <div className=" flex items-center gap-2">
                            <Link to={'/login'}><Button className='border font-semibold rounded-md border-gray-500 px-3 py-2 hover:scale-105'>Login</Button></Link>
                            <Link to={'/signup'}><Button className='border font-semibold rounded-md text-white px-3 py-2 bg-[#6A38C2] hover:scale-105 hover:bg-[#502c8e]'>Sign Up</Button></Link>
                        </div>
                    ):(
                        <div className="text-black">
                            {/* Avatar Dropdown Menu  */}
                            <Menu as="div" className="relative ml-3 ">
                                <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                    alt="Profile Icon"
                                    src={user?.profile?.profilePhoto}
                                    className="size-10 rounded-full"
                                    />
                                </MenuButton>
                                </div>
                                <MenuItems
                                transition
                                className="absolute right-0 space-y-4 z-10 mt-2 w-80 origin-top-right rounded-md bg-white p-5 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                <MenuItem>
                                    <div className="flex items-center gap-4 ">
                                        <img
                                            alt="Profile Photo"
                                            src={user?.profile?.profilePhoto}
                                            className="size-10 rounded-full"
                                            />
                                        <div>
                                            <h4 className="font-medium">{user?.fullName}</h4>
                                            <p className="text-sm ">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                </MenuItem>
                                {user && user?.role === "student" && (
                                    <MenuItem>
                                        <Link to='/profile' className="flex items-center ml-2 w-fit cursor-pointer gap-4 ">
                                            <UserIcon height={25}/>
                                            <h1 className="hover:underline font-semibold">View Profile</h1>
                                        </Link>
                                    </MenuItem>
                                )}
                                <MenuItem>
                                    <div onClick={logoutHandler} className="flex gap-4 items-center ml-2 w-fit cursor-pointer  ">
                                        <ArrowRightStartOnRectangleIcon height={25}/>
                                        <p className=" hover:underline font-semibold">Log Out</p>
                                    </div>
                                </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    )
                }
                
                
                </div>
            </div>
        </div>
    );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
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

const Navbar = () => {
    const user = false;


    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                <h1 className="text-2xl font-bold">
                    Job<span className="text-[#F83002]">Portal</span>
                </h1>
                </div>
                <div className="flex items-center gap-10">
                <ul className="flex font-bold items-center gap-5">
                    <li>Home</li>
                    <li>Jobs</li>
                    <li>Browse</li>
                </ul>

                {
                    !user ? (
                        <div className=" flex items-center gap-2">
                            <Link to={'/login'}><Button className='border font-semibold rounded-md border-gray-500 px-3 py-2 hover:scale-105'>Login</Button></Link>
                            <Link to={'/signup'}><Button className='border font-semibold rounded-md text-white px-3 py-2 bg-[#6A38C2] hover:scale-105 hover:bg-[#502c8e]'>Sign Up</Button></Link>
                        </div>
                    ):(
                        <div>
                            {/* Avatar Dropdown Menu  */}
                            <Menu as="div" className="relative ml-3 ">
                                <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                                            alt=""
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="size-10 rounded-full"
                                            />
                                        <div>
                                            <h4 className="font-medium">Abhishek MERN Stack</h4>
                                            <p className="text-sm ">LOren ipsum dolor sit amet</p>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div className="flex items-center ml-2 w-fit cursor-pointer gap-4 ">
                                        <UserIcon height={25}/>
                                        <a className="hover:underline font-semibold">View Profile</a>
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div className="flex gap-4 items-center ml-2 w-fit cursor-pointer  ">
                                        <ArrowRightStartOnRectangleIcon height={25}/>
                                        <a className=" hover:underline font-semibold">Log Out</a>
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

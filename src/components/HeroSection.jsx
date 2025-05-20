import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { setSearchedQuery } from "../redux/jobSlice";
import { motion } from "framer-motion";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }
    return (
        <div className="text-center ">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4}}
                className="flex flex-col gap-5 my-10 items-center">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-black  font-semibold">
                No. 1 Platform for Your Next Career Move
                </span>
                <h1 className="text-5xl font-bold">
                Search, Apply & <br /> Get Your{" "}
                <span className="text-[#6044CF]">Dream Jobs</span>
                </h1>
                <p className="w-[450px] text-lg font-medium leading-5 text-gray-400 ">
                Explore thousands of tech jobs from top companies. Whether you're a developer, designer, or marketer – we've got the perfect role waiting for you.
                </p>
                <div className="flex w-[40%] h-10 shadow-lg border border-gray-200 pl-4 rounded-full items-center gap-4 mx-auto">
                <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find your dream jobs"
                    className="outline-none border-none  w-full bg-[#09090B]"
                />
                <button onClick={searchJobHandler} className="rounded-r-full h-full bg-[#6044CF] ">
                    <MagnifyingGlassIcon className="h-6 w-12" />
                </button>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSection;

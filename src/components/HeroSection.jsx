import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { setSearchedQuery } from "../redux/jobSlice";
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
            <div className="flex flex-col gap-5 my-10">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
                No 1 Job search website
                </span>
                <h1 className="text-5xl font-bold">
                Search, Apply & <br /> Get Your{" "}
                <span className="text-[#6A38C2]">Dream Jobs</span>
                </h1>
                <p>
                Lorem Ipsum dolor set amit dispadfklk j;ljadkjf ;adlkjfak; jfdkajf
                ;akljf ;adkjf;kald jfkadjf ;akldjfkladj
                </p>
                <div className="flex w-[40%] h-10 shadow-lg border border-gray-200 pl-4 rounded-full items-center gap-4 mx-auto">
                <input
                    type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find your dream jobs"
                    className="outline-none border-none  w-full"
                />
                <button onClick={searchJobHandler} className="rounded-r-full h-full bg-orange-400 ">
                    <MagnifyingGlassIcon className="h-6 w-12" />
                </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

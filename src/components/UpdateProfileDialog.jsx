import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)

    const [input,setInput] = useState({
        fullName:user?.fullName,
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills,
        file:user?.profile?.resume
    })

    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name] :e.target.value})
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({...input,file})
    }
    const SubmitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("fullName",input.fullName)
        formData.append("email",input.email)
        formData.append("bio",input.bio)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("skills",input.skills)
        if(input.file){
            formData.append("file",input.file)
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        setOpen(false)
    }
    
    const dialogRef = useRef(null);

    // Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, setOpen]);
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div ref={dialogRef} className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>

            <form onSubmit={SubmitHandler}>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="name" className="text-right text-lg font-medium">Name</label>
                        <input
                        id="name"
                        type="text"
                        name="fullName"
                        value={input.fullName}
                        onChange={changeEventHandler}
                        placeholder="Full Name"
                        className="w-full border p-2  rounded col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="bio" className="text-right text-lg font-medium">Bio</label>
                        <input
                        id="bio"
                        type="text"
                        value={input.bio}
                        onChange={changeEventHandler}
                        name="bio"
                        placeholder="Bio"
                        className="w-full border p-2  rounded col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="email" className="text-right text-lg font-medium">Email</label>
                        <input
                        id="email"
                        type="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        name="email"
                        placeholder="Email"
                        className="w-full border p-2  rounded col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="phone" className="text-right text-lg font-medium">Number</label>
                        <input
                        id="phone"
                        type="tel"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className="w-full border p-2  rounded col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="skills" className="text-right text-lg font-medium">Skills</label>
                        <input
                        type="text"
                        value={input.skills}
                        onChange={changeEventHandler}
                        id="skills"
                        name="skills"
                        placeholder="Skills (comma separated)"
                        className="w-full border p-2  rounded col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                        <label htmlFor="resume" className="text-right text-lg font-medium">Resume</label>
                        <input
                        type="file"
                        id="resume"
                        onChange={fileChangeHandler}
                        name="file"
                        accept="application/pdf"
                        placeholder="Resume"
                        className="w-full border p-2  rounded col-span-3"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3 w-full">
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#20549af6] text-white rounded-lg font-medium w-full"
                >
                    Update
                </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default UpdateProfileDialog;

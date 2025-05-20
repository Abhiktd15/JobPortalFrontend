import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { PencilIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const {companies,searchCompanyByText} = useSelector((state) => state.company)
    const [filterCompany,setFilterCompany] = useState(companies)
    const navigate = useNavigate()
    
    useEffect(() => {
        const filteredCompanies = companies?.length>= 0 && companies?.filter((company) => {
            if(!searchCompanyByText){
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompanies)
    },[companies,searchCompanyByText])

    return (
        <div>
            <div>
                {
                    filterCompany?.length <= 0 ?<div className='text-gray-500 font-medium mt-10 text-lg text-center'>You Haven't Registered Any Companies Yet</div> :(
                        <>
                            <table className='w-full text-center mt-10'>
                                <thead>
                                    <tr className='font-semibold text-lg border-b-[1px] border-gray-100 mb-2 '>
                                        <th className='p-3'>Logo</th>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th className='text-right'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterCompany?.map((company) => (
                                        <tr key={company?._id} className='font-medium text-sm border-b-[1px] border-gray-100 hover:bg-[#0f0f12] cursor-pointer '>
                                        <td className='p-2 flex items-center justify-center'>
                                            <img src={company?.logo} alt="Company Logo" className='w-10 h-10 rounded-full'/>
                                        </td>
                                        <td className='p-2'>{company?.name}</td>
                                        <td className='p-2'>{company?.createdAt.split("T")[0]}</td>
                                        <td className='p-2 flex items-end justify-end  relative'>
                                            <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#09090B] px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ">
                                                Options
                                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                                </MenuButton>
                                            </div>

                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                            >
                                                <div className="py-1">
                                                <MenuItem>
                                                    <div onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                        className="flex items-center gap-5 px-4 py-1 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                                    >
                                                    <PencilIcon className='w-6 h-6'/>    Edit
                                                    </div>
                                                </MenuItem>
                                                
                                                </div>
                                            </MenuItems>
                                            </Menu>
                                        </td>
                                    </tr>
                                    ))
                                    }
                                </tbody>

                            </table>
                            <h1 className='text-sm mt-5  text-gray-400 font-semibold mb-5 text-center'>A list of your recent registered companies</h1>  
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default CompaniesTable
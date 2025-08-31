import GetAllResume from '@/apis/resume/GetAllResume'
import MakeResumePrimaryApi from '@/apis/resume/MakeResumePrimary'
import React, { useEffect, useRef, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { MdRemoveRedEye } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { Download, Ellipsis, EllipsisVertical, Eye, Loader2, Pencil, Trash, Upload } from 'lucide-react'
import FileIcon from '@/public/icons/fileicon';
import DeleteResumeApi from '@/apis/resume/DeleteResumeApi';
import DeletePopup from './deletepopup';
import { AiOutlineLoading } from "react-icons/ai";
import downloadPdf from '@/utils/downloadpdf';
import { useRouter } from 'next/navigation';



const ResumeList = ({ setTab, tab }) => {

    const [allResumes, setAllResumes] = useState([]); // for sorting 

    const [resumes, setResumes] = useState(null)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('all')
    const [openPreview, setOpenPreview] = useState(false)
    const [selectedResume, setSelectedResume] = useState('')
    const [open, setOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const effectRun = useRef(false)
    const router = useRouter()

    const handleOpenPreview = (resume) => {
        setSelectedResume(resume)
        setOpenPreview(!openPreview)
    };

    const getResumes = async () => {
        setLoading(true)
        const res = await GetAllResume();

        if (res.error) {
            toast.error(res.error)
            setLoading(false)
            return;
        }

        setLoading(false)
        setAllResumes(res?.resumes)
        setResumes(res?.resumes)
    }

    useEffect(() => {
        if (effectRun.current === false) {
            getResumes();
        }


        return () => {
            effectRun.current = true;
        }
    }, [])

    const makeResumePrimary = async (resumeId) => {
        const res = await MakeResumePrimaryApi({ resumeId })

        if (res.error) {
            toast.error(res.error)
            return;
        }

        setResumes((prevResumes) =>
            prevResumes.map((resume) =>
                resume._id === resumeId
                    ? { ...resume, primary: true }
                    : { ...resume, primary: false }
            )
        );

        toast.success("Resume set as primary")
    }


    const handleFilter = (items) => {


        return items.filter((item) =>
            item.filename.toLowerCase().includes(search.toLowerCase())
        );
    };


    const handleSort = (items) => {
        if (sort === "all") {
            return items;
        } else if (sort === "customized") {
            return items.filter((item) => item.customized === true);
        }
        return items;
    };

    const deleteResume = async () => {


        setDeleteLoading(true)
        const res = await DeleteResumeApi(selectedResume?._id)

        if (res.error) {
            toast.error(res.error)
            setDeleteLoading(false)
            return;
        }

        setResumes((prevResumes) =>
            prevResumes.filter((resume) => resume._id !== selectedResume?._id)
        );

        toast.success("Resume deleted successfully")
        setOpen(false)
        setDeleteLoading(false)
    }


    const getTimeAgo = (timestamp) => {
        const postTime =
            typeof timestamp === "string"
                ? new Date(timestamp.replace(" ", "T"))
                : new Date(timestamp);

        if (isNaN(postTime.getTime())) return "";

        const day = postTime.getDate().toString().padStart(2, "0");
        const month = (postTime.getMonth() + 1).toString().padStart(2, "0");
        const year = postTime.getFullYear();

        let hours = postTime.getHours();
        const minutes = postTime.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12; // convert 0 to 12-hour format

        return `${day} / ${month} / ${year} , ${hours}:${minutes} ${ampm}`;
    };



    useEffect(() => {
        let items = [...allResumes];

        if (search) {
            items = handleFilter(items);

        }

        items = handleSort(items);
        setResumes(items);

    }, [search, sort, allResumes]);


    const handleOpen = (item) => {
        setSelectedResume(item)
        setOpen(!open)
    }


    const handleEdit = (id) => {
        router.push(`/dashboard/documents/resume/editor?id=${id}`)
    }




    return (
        <div>


            <DeletePopup open={open} setOpen={setOpen} loading={deleteLoading} handleDelete={deleteResume} />

            <Dialog open={openPreview} onOpenChange={setOpenPreview}>
                <DialogTrigger className="hidden">
                    <span />
                </DialogTrigger>
                <DialogContent className="w-[95%]  !max-w-[75rem] pt-10 mx-auto border-none outline-none p-4 rounded-xl"
                    zIndex={100}>
                    <DialogHeader className={"hidden"}>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>

                    </DialogHeader>


                    <div className='flex items-center gap-4'>


                        <div className='p-2 bg-primary-lighter rounded-md'>
                            <FileIcon />
                        </div>

                        <div className='flex flex-col'>
                            <div className='font-circular tracking-wide text-sm sm:text-xl font-medium'>
                                Resume Preview
                            </div>

                            <div className='font-circular flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm '>
                                {selectedResume?.filename} <span className='text-[11px] text-gray-300'>•</span> <span className='font-normal text-xs'>Modified : {getTimeAgo(selectedResume?.updatedAt)}</span>
                            </div>
                        </div>
                    </div>

                    <iframe
                        src={`https://docs.google.com/gview?url=${selectedResume?.url}&embedded=true`}
                        width="100%"
                        height="600"
                        style={{ border: "none" }}
                    />




                </DialogContent>
            </Dialog>
            <div className='bg-white flex flex-col    gap-4 py-5 p-4'>

                <div className='flex sm:flex-row flex-col items-start sm:items-center justify-between'>


                    <div className="flex gap-6">
                        <button
                            onClick={() => setTab("resume")}
                            className={` pb-1 font-circular text-lg tracking-wide font-medium ${tab === "resume" ? "border-b-2 border-primary-light  text-black" : "text-gray-500"
                                }`}
                        >
                            Resumes
                        </button>
                        <button
                            onClick={() => setTab("coverletter")}
                            className={`font-medium pb-1 font-circular text-lg tracking-wide text-black ${tab === "coveletter" ? "border-b-2 border-primary-light " : "text-gray-500"
                                }`}
                        >
                            Cover Letters
                        </button>
                    </div>


                    <div className='flex pt-2.5 flex-col sm:flex-row  gap-4'>

                        <Select value={sort} onValueChange={(value) => setSort(value)}>
                            <SelectTrigger className="sm:w-[250px] w-[310px]  h-11 !h-10 font-circular relative">
                                <SelectValue placeholder="All" />
                                <div className="h-5 right-10 absolute w-[1.2px] bg-gray-300" />
                            </SelectTrigger>
                            <SelectContent className="font-circular ">
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="customized">Customized</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className='w-full max-w-[450px]'>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name "
                                className={clsx(
                                    "p-3 font-circular border text-base border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 h-10 block w-full rounded-sm leading-5 text-secondary-400  transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-4  disabled:bg-[#F2F2F2] disabled:opacity-90",

                                )}

                            />
                        </div>

                    </div>



                </div>

                <div className='bg-white  pb-10 w-full font-circular'>
                    <table className='w-full'>
                        <thead className='sticky top-0 z-20 h-11 bg-gray-100'>
                            <tr className='uppercase tracking-wide'>
                                <th className='text-xs px-6 text-left font-[500]'>Resume Name</th>
                                <th className='text-xs hidden  sm:table-cell px-6 text-left font-[500]'>Created</th>
                                <th className='text-xs hidden  sm:table-cell px-6 text-left font-[500]'>Last edited</th>
                                <th className='text-xs px-6 text-left font-[500]'>Actions</th>
                            </tr>
                        </thead>


                        <tbody className='border'>
                            {loading ? (<tr>
                                <td colSpan="4" className='py-10'>
                                    <div className="flex justify-center items-center">
                                        <AiOutlineLoading className="animate-spin text-primary-light w-6 h-6" />
                                    </div>
                                </td>


                            </tr>) : resumes?.length > 0 ? (
                                <>
                                    {resumes
                                        .map((item, index) => (
                                            <tr key={index} className='border-b '>


                                                <td className='py-5  flex  flex-col gap-1 px-6'>

                                                    <div className='font-medium  xl:max-w-[600px]  max-w-[200px] text-sm truncate'>
                                                        {item.filename}
                                                    </div>

                                                    <div className=''>
                                                        {
                                                            item?.primary ? (
                                                                <div className='px-3 shadow py-1 bg-primary-lighter text-xs rounded-md text-primary-blue w-fit'>
                                                                    Default Resume
                                                                </div>
                                                            ) : (
                                                                <div onClick={() => makeResumePrimary(item?._id)} className='px-3 shadow py-1 bg-gray-100 text-xs rounded-md cursor-pointer text-gray-600 w-fit'>
                                                                    Set as default
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </td>


                                                <td className='py-5 hidden  sm:table-cell text-sm'>
                                                    {getTimeAgo(item.createdAt)}
                                                </td>


                                                <td className='py-5 hidden  sm:table-cell text-sm'>
                                                    {getTimeAgo(item.updatedAt)}
                                                </td>

                                                <td className='py-5 text-left text-sm px-2.5'>


                                                    <DropdownMenu >
                                                        <DropdownMenuTrigger >
                                                            <div className='p-2 mx-6 w-fit bg-gray-50 rounded-md'>
                                                                <Ellipsis size={15} />
                                                            </div>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className={"font-circular w-[180px]"}>
                                                            <DropdownMenuItem onClick={() => handleOpenPreview(item)} className={"hover:bg-primary-lighter duration-300 py-2"}>
                                                                <MdRemoveRedEye size={20} color='gray' />

                                                                Preview
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleEdit(item?._id)} className={"hover:bg-primary-lighter duration-300 py-2"}>

                                                                <HiPencil size={14} color='gray' />

                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={async () => await downloadPdf(item.url, item.filename)} className={"hover:bg-primary-lighter duration-300 py-2"}>
                                                                <MdOutlineFileDownload size={20} color='gray' />

                                                                Download
                                                            </DropdownMenuItem>


                                                            {item?.primary ? (
                                                                <DropdownMenuItem disabled className={"hover:bg-primary-lighter duration-300 py-2"}>
                                                                    <IoMdTrash />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            ) : (
                                                                <DropdownMenuItem onClick={() => handleOpen(item)} className={"hover:bg-primary-lighter duration-300 py-2"}>
                                                                    <IoMdTrash />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>





                                                </td>
                                            </tr>
                                        ))}
                                </>
                            ) : (
                                <tr>
                                    <td colSpan="4" className='text-center py-10 text-gray-500'>
                                        No resumes found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ResumeList
import GetAllCoverlettersApi from '@/apis/coverletter/GetAllCoverlettersApi'
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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Ellipsis } from 'lucide-react'
import FileIcon from '@/public/icons/fileicon';
import DeleteCoverletterApi from '@/apis/coverletter/DeleteCoverletterApi';
import DeletePopup from './deletepopup';
import { AiOutlineLoading } from 'react-icons/ai';
import downloadPdf from '@/utils/downloadpdf';
import { useRouter } from 'next/navigation';


const CoverletterList = ({ setTab, tab }) => {

    const [allCoverletters, setAllCoverletters] = useState([]); // for sorting 
    const [coverletters, setCoverletters] = useState(null)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('latest')
    const [openPreview, setOpenPreview] = useState(false)
    const [selectedCoverletter, setSelectedCoverletter] = useState('')
    const [open, setOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const effectRun = useRef(false)
    const router = useRouter();


    const handleOpenPreview = (coverletter) => {
        setSelectedCoverletter(coverletter)
        setOpenPreview(!openPreview)
    };

    const getCoverletters = async () => {
        setLoading(true)
        const res = await GetAllCoverlettersApi();

        if (res.error) {
            toast.error(res.error)
            setLoading(false)
            return;
        }

        setLoading(false)
        setAllCoverletters(res?.letters)
        setCoverletters(res?.letters)
    }

    useEffect(() => {

        if (effectRun.current === false) {
            getCoverletters();
        }


        return () => {
            effectRun.current = true;
        }

    }, [])


    const handleFilter = (items) => {
        return items.filter((item) =>
            item.filename.toLowerCase().includes(search.toLowerCase())
        );
    };

    const handleSort = (items) => {
        if (sort === "latest") {
            return items.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        } else if (sort === "oldest") {
            return items.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
        }
        return items;
    };

    const deleteCoverletter = async () => {
        setDeleteLoading(true)
        const res = await DeleteCoverletterApi(selectedCoverletter?._id)

        if (res.error) {
            toast.error(res.error)
            setDeleteLoading(false)
            return;
        }

        setCoverletters((prev) =>
            prev.filter((c) => c._id !== selectedCoverletter?._id)
        );

        toast.success("Cover letter deleted successfully")
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

        hours = hours % 12 || 12;

        return `${day} / ${month} / ${year} , ${hours}:${minutes} ${ampm}`;
    };

    useEffect(() => {
        let items = [...allCoverletters];

        if (search) {
            items = handleFilter(items);
        }

        items = handleSort(items);
        setCoverletters(items);

    }, [search, sort, allCoverletters]);


    const handleOpen = (item) => {
        setSelectedCoverletter(item)
        setOpen(!open)
    }

    return (
        <div>

            <DeletePopup open={open} setOpen={setOpen} loading={deleteLoading} handleDelete={deleteCoverletter} />

            <Dialog open={openPreview} onOpenChange={setOpenPreview}>
                <DialogTrigger className="hidden">
                    <span />
                </DialogTrigger>
                <DialogContent zIndex={100} className="w-[95%] !max-w-[75rem] pt-10 mx-auto border-none outline-none p-4 rounded-xl">
                    <DialogHeader className={"hidden"}>
                        <DialogTitle>Preview Cover Letter</DialogTitle>
                    </DialogHeader>

                    <div className='flex items-center gap-4'>
                        <div className='p-2 bg-primary-lighter rounded-md'>
                            <FileIcon />
                        </div>
                        <div className='flex flex-col'>
                            <div className='font-circular tracking-wide text-sm sm:text-xl font-medium'>
                                Cover Letter Preview
                            </div>
                            <div className='font-circular flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm '>
                                {selectedCoverletter?.filename} <span className='text-[11px] text-gray-300'>•</span> <span className='font-normal text-xs'>Modified : {getTimeAgo(selectedCoverletter?.updatedAt)}</span>
                            </div>
                        </div>
                    </div>

                    <iframe
                        src={`https://docs.google.com/gview?url=${selectedCoverletter?.url}&embedded=true`}
                        width="100%"
                        height="600"
                        style={{ border: "none" }}
                    />
                </DialogContent>
            </Dialog>

            <div className='bg-white flex flex-col gap-4 py-5 p-4'>
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
                            className={`font-medium pb-1 font-circular text-lg tracking-wide text-black ${tab === "coverletter" ? "border-b-2 border-primary-light " : "text-gray-500"
                                }`}
                        >
                            Cover Letters
                        </button>
                    </div>

                    <div className='flex pt-2.5 flex-col sm:flex-row  gap-4'>

                        <Select value={sort} onValueChange={(value) => setSort(value)}>
                            <SelectTrigger className="sm:w-[250px] w-[310px]  h-11 !h-10 font-circular relative">
                                <SelectValue placeholder="Latest" />
                                <div className="h-5 right-10 absolute w-[1.2px] bg-gray-300" />
                            </SelectTrigger>
                            <SelectContent className="font-circular ">
                                <SelectItem value="latest">
                                    Latest
                                </SelectItem>
                                <SelectItem value="oldest">
                                    Oldest
                                </SelectItem>
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

                <div className='bg-white pb-10 w-full font-circular'>
                    <table className='w-full'>
                        <thead className='sticky top-0 z-20 h-11 bg-gray-100'>
                            <tr className='uppercase tracking-wide'>
                                <th className='text-xs px-6 text-left font-[500]'>Cover Letter Name</th>
                                <th className='text-xs hidden sm:table-cell px-6 text-left font-[500]'>Created</th>
                                <th className='text-xs hidden sm:table-cell px-6 text-left font-[500]'>Last edited</th>
                                <th className='text-xs px-6 text-left font-[500]'>Actions</th>
                            </tr>
                        </thead>

                        <tbody className='border'>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className='py-10'>
                                        <div className="flex justify-center items-center">
                                            <AiOutlineLoading className="animate-spin text-primary-light w-6 h-6" />
                                        </div>
                                    </td>
                                </tr>
                            ) : coverletters?.length > 0 ? (
                                <>
                                    {coverletters.map((item, index) => (
                                        <tr key={index} className='border-b '>
                                            <td className='py-5 pl-6'>
                                                <div className='font-medium xl:max-w-[600px] max-w-[170px] text-sm truncate'>
                                                    {item.filename}
                                                </div>
                                            </td>

                                            <td className='py-5 hidden sm:table-cell text-sm'>
                                                {getTimeAgo(item.createdAt)}
                                            </td>

                                            <td className='py-5 hidden sm:table-cell text-sm'>
                                                {getTimeAgo(item.updatedAt)}
                                            </td>

                                            <td className='py-5 text-left text-sm px-2.5'>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <div className='p-2 mx-6 w-fit bg-gray-50 rounded-md'>
                                                            <Ellipsis size={15} />
                                                        </div>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className={"font-circular w-[180px]"}>
                                                        <DropdownMenuItem onClick={() => handleOpenPreview(item)} className={"hover:bg-primary-lighter duration-300 py-2"}>
                                                            <MdRemoveRedEye size={20} color='gray' />
                                                            Preview
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/documents/coverletter/editor?id=${item?._id}`)} className={"hover:bg-primary-lighter duration-300 py-2"}>
                                                            <HiPencil size={14} color='gray' />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={async () => await downloadPdf(item.url, item.filename)} className={"hover:bg-primary-lighter duration-300 py-2"}>
                                                            <MdOutlineFileDownload size={20} color='gray' />
                                                            Download
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleOpen(item)} className={"hover:bg-primary-lighter duration-300 py-2"}>
                                                            <IoMdTrash />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td colSpan="4" className='text-center py-10 text-gray-500'>
                                        No cover letters found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default CoverletterList

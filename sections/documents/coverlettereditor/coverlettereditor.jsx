"use client"
import GetCoverletterByIdApi from '@/apis/coverletter/GetCoverletterByIdApi'
import { useUser } from '@/context/userContext'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import EditorHeader from './editorheader'
import CoverLetterTemp from './coverlettertemp'
import UpdateCoverletterApi from '@/apis/coverletter/UpdateCoverletterApi'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FcIdea } from 'react-icons/fc'
import { AiOutlineLoading } from 'react-icons/ai'
import { EditIcon } from 'lucide-react'

const CoverletterEditor = () => {

    const { state } = useUser()
    const user = state?.user
    const [updateLoading, setUpdateLoading] = useState(false)
    const [coverletter, setCoverletter] = useState("")
    const [filename, setFilename] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    })

    // Simple unsaved detection
    const [lastSaved, setLastSaved] = useState({
        coverletter: "",
        filename: "",
        formData: {}
    })
    console.log("🚀 ~ CoverletterEditor ~ lastSaved:", lastSaved)

    const effectRun = useRef(false)
    const searchParams = useSearchParams();
    const id = searchParams.get('id')

    // Simple unsaved check
    const isUnsaved = () => {
        return (
            coverletter !== lastSaved.coverletter ||
            filename !== lastSaved.filename ||
            JSON.stringify(formData) !== JSON.stringify(lastSaved.formData)
        )
    }

    const getCoverletter = async () => {
        const res = await GetCoverletterByIdApi({ coveletter_id: id })

        if (res?.error) {
            toast.error(res.error)
            return
        }

        const data = res?.coverletter;
        const customData = data?.formdata || {};

        setFilename(data?.filename || "")
        setCoverletter(data?.body || "")

        const newFormData = {
            firstName: customData?.firstName,
            lastName: customData?.lastName || user?.lastName || "",
            email: customData?.email || user?.email || "",
            phone: customData?.phone || user?.phone || "",
        }
        setFormData(newFormData)

        // Set as saved state
        setLastSaved({
            url: data?.url || "",
            coverletter: data?.body || "",
            filename: data?.filename || "",
            formData: newFormData,
            lastTime: res?.coverletter?.updatedAt
        })
    }

    const handleUpdateFilename = async () => {
        setUpdateLoading(true)
        const res = await UpdateCoverletterApi({
            coverletter_id: id,
            filename: filename
        })

        if (res?.error) {
            toast.error(res.error)
            setUpdateLoading(false)
            return
        }

        setUpdateLoading(false)
        setLastSaved(prev => ({ ...prev, filename: filename }))
        setOpenDialog(false)
        toast.success("Filename updated")
    }

    const handleUpdateCoverletter = async () => {
        setUpdateLoading(true)
        const res = await UpdateCoverletterApi({
            coverletter_id: id,
            customdata: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                coverletter: coverletter,
            }
        })

        if (res?.error) {
            toast.error(res.error)
            setUpdateLoading(false)
            return
        }

        setUpdateLoading(false)
        setLastSaved({
            url: res?.coverletter?.url || "",
            coverletter: coverletter,
            filename: filename,
            formData: formData,
            lastTime: res?.coverletter?.updatedAt
        })
        toast.success("Cover letter saved")
    };

    useEffect(() => {
        if (!effectRun.current) {
            getCoverletter()
            effectRun.current = true
        }
    }, [user])


    // Add this useEffect after your existing useEffect
    useEffect(() => {
        if (effectRun.current && isUnsaved()) {
            const timeoutId = setTimeout(() => {
                handleUpdateCoverletter()
            }, 500) // Auto-save after 1 second of no changes

            return () => clearTimeout(timeoutId)
        }
    }, [formData, coverletter])

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">
            <EditorHeader
                url={lastSaved?.url}
                filename={filename || ""}
                savedtime={lastSaved.lastTime}
                handleSave={handleUpdateCoverletter}
                unsaved={isUnsaved()}
                onChangeCoverletter={setCoverletter}
                updateLoading={updateLoading}
            />

            <div className="grid grid-cols-1 sm:grid-cols-4 flex-1">
                {/* Left Sidebar */}
                <div className="col-span-1 bg-white shadow-sm p-4">
                    {/* Filename */}

                    <div className='flex pb-6 items-center gap-2'>
                        <div className='font-bold text-xl cursor-pointer hover:text-primary-blue'
                            onClick={() => setOpenDialog(true)}>
                            {filename || "Untitled"}
                            {isUnsaved() && <span className="text-red-500 ml-1">•</span>}
                        </div>


                        <div>
                            <EditIcon className='w-4 h-4 cursor-pointer hover:text-primary-blue' onClick={() => setOpenDialog(true)} />
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-4 mb-6">
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-600">Word Count</div>
                            <div className="font-semibold">{coverletter.split(' ').filter(w => w).length}</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-600">Characters</div>
                            <div className="font-semibold">{coverletter.length}</div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800">Contact Info</h3>
                        <div className="text-sm space-y-1">
                            <div className="text-gray-600">Name: <span className="text-gray-800">{formData.firstName} {formData.lastName}</span></div>
                            <div className="text-gray-600">Email: <span className="text-gray-800">{formData.email}</span></div>
                            <div className="text-gray-600">Phone: <span className="text-gray-800">{formData.phone}</span></div>
                        </div>
                    </div>
                </div>

                {/* Main Preview Area */}
                <div className="col-span-3 flex items-center justify-center bg-gray-100 p-4 sm:p-6">
                    <div className="sm:w-[700px] bg-white rounded-lg shadow-lg sm:p-8 max-h-full overflow-y-auto">
                        <CoverLetterTemp
                            formData={formData}
                            setFormData={setFormData}
                            coverletter={coverletter}
                            setCoverletter={setCoverletter}
                        />
                    </div>
                </div>
            </div>

            {/* Filename Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-md font-circular">
                    <DialogHeader>
                        <DialogTitle>Edit Filename</DialogTitle>
                    </DialogHeader>

                    <div className="flex bg-blue-50 p-3 rounded items-center gap-2">
                        <FcIdea className="w-6 h-6" />
                        <div className="text-sm text-gray-600">
                            Choose a name for your cover letter
                        </div>
                    </div>

                    <input
                        placeholder="Enter filename"
                        type="text"
                        autoFocus
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        className="p-3 font-circular h-10 block w-full rounded-sm text-sm leading-5 text-secondary-400 shadow transition placeholder:text-gray-400 focus:outline-none border border-gray-200 focus:border-[#3EC0DD] focus:ring-[#3EC0DD]/10 focus:ring-4 disabled:bg-[#F2F2F2] disabled:opacity-90"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setFilename(lastSaved.filename)
                                setOpenDialog(false)
                            }}
                            className="flex-1 border py-2 rounded px-4"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdateFilename}
                            disabled={updateLoading}
                            className="flex-1 bg-primary-blue rounded-md text-white py-2 px-4 rounded disabled:opacity-50"
                        >
                            {updateLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CoverletterEditor
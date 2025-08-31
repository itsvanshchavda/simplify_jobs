"use client"
import GetCoverletterByIdApi from '@/apis/coverletter/GetCoverletterByIdApi'
import { useUser } from '@/context/userContext'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import EditorHeader from './editorheader'
import CoverLetterTemp from './coverlettertemp'

const CoverletterEditor = () => {

    const { state } = useUser()
    const user = state?.user
    const [coverletter, setCoverletter] = useState("")

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        phone: "",
    })


    const effectRun = useRef(false)
    const searchParams = useSearchParams();
    const id = searchParams.get('id')

    const getCoverletter = async () => {
        const res = await GetCoverletterByIdApi({ coveletter_id: id })

        if (res?.error) {
            toast.error(res.error)
            return
        } else {
            setCoverletter(res?.coverletter)
        }


    }


    useEffect(() => {
        if (effectRun.current === false) {
            getCoverletter()
        }

        return () => {
            effectRun.current = true
        }
    }, [user])


    const handleCoverLetterChange = (newText) => {
        console.log("Updated Cover Letter Text:", newText);
    };


    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <EditorHeader />

            <div className="grid grid-cols-4  flex-1">
                {/* Left Sidebar */}
                <div className="col-span-1 bg-white shadow-sm p-4">
                    AI chat
                </div>

                {/* Main Preview Area */}
                <div className="col-span-3 flex items-center justify-center bg-gray-100 shadow-inner p-6">
                    <div className="w-[700px] bg-white rounded-xl shadow-lg p-10 overflow-y-auto">
                        <CoverLetterTemp formData={formData} setFormData={setFormData} onCoverLetterChange={handleCoverLetterChange} coverletter={coverletter?.body} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CoverletterEditor
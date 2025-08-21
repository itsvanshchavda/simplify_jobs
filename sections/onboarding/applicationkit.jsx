"use client"
import React, { useEffect, useRef, useState } from "react"
import { ArrowLeft } from "lucide-react"
import Logo from "@/public/icons/logo"
import Confetti from "react-confetti"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import toast from "react-hot-toast"
import takeScreenshot from "@/utils/takescreenshot"
import { useUser } from "@/context/userContext"
import GetCoverletterApi from "@/apis/coverletter/GetCoverletterApi"
import SaveCoverletterApi from "@/apis/coverletter/SaveCoverletterApi"
import GetFollowupMailApi from "@/apis/followupmail/GetFollowupMail"
import { ScrollArea } from "@/components/ui/scroll-area"
import UpdateUserApi from "@/apis/user/UpdateUser"

const ApplicationKit = () => {
    const [showConfetti, setShowConfetti] = useState(true)
    const { state } = useUser()
    const user = state.user
    const [imgUrl, setImgUrl] = useState("")
    const [loading, setLoading] = useState(true)
    const [coverletter, setCoverLetter] = useState("")
    const [followupMail, setFollowupMail] = useState("")
    const hasInitialized = useRef(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000)
        return () => clearTimeout(timer)
    }, [])

    // Single initialization effect to prevent multiple API calls
    useEffect(() => {
        if (hasInitialized.current) return
        hasInitialized.current = true

        const initializeData = async () => {
            setLoading(true)

            try {
                // Get screenshot
                if (user?.default_resume?.url) {
                    const imageUrl = await takeScreenshot(user.default_resume.url)
                    setImgUrl(imageUrl)
                }

                // Get cover letter and follow-up mail in parallel
                const [coverLetterRes, followupRes] = await Promise.all([
                    GetCoverletterApi().catch(err => ({ error: err.message })),
                    GetFollowupMailApi().catch(err => ({ error: err.message }))
                ])

                // Handle cover letter response
                if (coverLetterRes.error) {
                    toast.error(coverLetterRes.error)
                } else {
                    setCoverLetter(coverLetterRes.body)
                    // Save cover letter as default
                    SaveCoverletterApi({
                        coverletter: coverLetterRes.body,
                        isDefaultCoverLetter: true,
                    }).catch(err => console.error('Failed to save cover letter:', err))
                }

                // Handle follow-up mail response
                if (followupRes.error) {
                    toast.error(followupRes.error)
                } else {
                    setFollowupMail(followupRes.rawJson?.body || "")
                }
            } catch (err) {
                toast.error("Failed to load data")
                console.error('Initialization error:', err)
            } finally {
                setLoading(false)
            }
        }

        initializeData()
    }, [user])


    const handleComplete = async () => {
        const res = await UpdateUserApi({ onboardingCompleted: true })
        if (res.error) {
            toast.error(res.error)
        } else {
            toast.success("Onboarding completed successfully!")
            window.location.href = "/dashboard"
        }
    }

    const CardSkeleton = () => (
        <div className="bg-white shadow-md border border-gray-200 rounded-xl p-4 flex flex-col h-[300px] xl:h-[400px]">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="flex-1 w-full" />
        </div>
    )

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="px-4 pt-4 w-full max-w-7xl mx-auto flex justify-between items-center">
                <Logo />
                <div className="font-circular cursor-pointer uppercase text-base text-gray-500 font-normal">
                    SIGN OUT
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-4 xl:px-0 flex items-center justify-center py-6">
                <div className="bg-white px-4 flex flex-col items-center justify-center w-full max-w-6xl rounded-2xl py-6 xl:py-10">
                    {/* Top Bar */}
                    <div className="flex items-center w-full xl:pb-6 pb-3 max-w-xl">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-1 text-gray-700 mr-4"
                        >
                            <ArrowLeft size={18} />
                            <span className="text-sm uppercase font-circular text-gray-600 font-medium">
                                Back
                            </span>
                        </button>

                        {/* Progress Bar */}
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mr-4">
                            <div
                                className="h-2 bg-primary-blue rounded-full"
                                style={{ width: "100%" }}
                            />
                        </div>

                        <span className="text-sm font-circular text-primary-blue font-medium">
                            100%
                        </span>
                    </div>

                    {/* Title */}
                    <div className="font-circular font-medium text-xl md:text-2xl xl:text-3xl text-center pb-3 xl:pb-6 flex justify-center">
                        <span className="inline-flex gap-2 items-center whitespace-nowrap">
                            Your Application Kit is Ready
                            <img
                                src="/images/rocket.png"

                                alt="rocket"
                                className="sm:size-8 size-6 inline-block"
                            />
                        </span>
                    </div>


                    {/* Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4 pb-5">
                        {/* Resume Preview */}
                        {loading ? (
                            <CardSkeleton />
                        ) : (
                            <div className="bg-white shadow-md border border-gray-200 rounded-xl p-4 flex flex-col overflow-hidden h-[300px] xl:h-[400px]">
                                <h3 className="font-circular text-lg font-medium text-gray-800">
                                    Customized Resume
                                </h3>
                                <div className="flex-1  shadow-inner bg-gray-50 rounded-lg flex items-center justify-center">
                                    {imgUrl ? (
                                        <img
                                            src={imgUrl}
                                            className="h-full w-full object-contain rounded-lg"
                                            alt="resume preview"
                                        />
                                    ) : (
                                        <div className="text-gray-500 text-sm">
                                            Resume preview unavailable
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Cover Letter */}
                        {loading ? (
                            <CardSkeleton />
                        ) : (
                            <div className="bg-white shadow-md border border-gray-200 rounded-xl p-4 flex flex-col h-[300px] xl:h-[400px]">
                                <h3 className="font-circular text-lg font-medium text-gray-800 xl:pb-4 pb-2">
                                    Cover Letter
                                </h3>
                                <ScrollArea
                                    className="flex-1 rounded-lg overflow-hidden relative"
                                    style={{
                                        backgroundImage:
                                            "url(https://www.toptal.com/designers/subtlepatterns/uploads/handmadepaper.png)",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,white,oklch(0_0_0/0.1))] opacity-50"
                                        style={{ backgroundSize: '50% 50%' }} />
                                    <div className="relative h-full p-4 overflow-y-auto">
                                        {coverletter ? (
                                            <p className="whitespace-pre-line font-circular text-black/80 text-xs leading-relaxed">
                                                {coverletter}
                                            </p>
                                        ) : (
                                            <div className="text-gray-500 text-sm text-center">
                                                Cover letter unavailable
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                            </div>
                        )}

                        {/* Follow-up Mail */}
                        {loading ? (
                            <CardSkeleton />
                        ) : (
                            <div className="bg-white shadow-md border border-gray-200 rounded-xl p-4 flex flex-col h-[300px] xl:h-[400px]">
                                <h3 className="font-circular text-lg font-medium text-gray-800 pb-2 xl:pb-4">
                                    Follow-up Mail
                                </h3>
                                <div className="flex-1 bg-gradient-to-b bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">


                                    {/* Email Body */}
                                    <ScrollArea className="p-4 h-full overflow-y-auto">
                                        {followupMail ? (
                                            <div className="text-xs font-circular text-gray-700 leading-relaxed">

                                                <p className="whitespace-pre-line">{followupMail}</p>

                                            </div>
                                        ) : (
                                            <div className="text-gray-500 text-sm text-center">
                                                Follow-up mail unavailable
                                            </div>
                                        )}
                                    </ScrollArea>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CTA */}
                    <Button onClick={handleComplete} className="w-[220px] hover:bg-cyan-600 duration-300 bg-primary-blue text-white h-10 text-base font-medium font-circular">
                        Continue to Dashboard
                    </Button>
                </div>
            </div>

            {/* Confetti */}
            {showConfetti && (
                <Confetti recycle={false} numberOfPieces={400} gravity={0.2} wind={0.05} />
            )}
        </div>
    )
}

export default ApplicationKit
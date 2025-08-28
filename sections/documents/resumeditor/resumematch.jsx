

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaCheckCircle } from "react-icons/fa"
import { FcIdea } from "react-icons/fc"

const ResumeMatch = ({ open, setOpen, matchScore }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <span />
            <DialogContent className="w-[90%] max-w-sm flex flex-col gap-5" zIndex={100}>
                <DialogHeader>
                    <DialogTitle className="font-circular font-semibold">
                        Keyword Match
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col bg-gray-50 p-4 border rounded-md border-gray-100 items-center gap-2">
                    <div className="font-circular text-gray-500 text-sm">
                        Your resume has {matchScore?.matchedKeywords} out of {matchScore?.totalKeywords} and {matchScore?.resumeMatch} keywords that appear in the job description.
                    </div>

                    <div className="bg-white flex  items-center gap-2 p-4 py-5 rounded-md">
                        <FcIdea size={20} />
                        <div className="font-circular font-light text-sm">
                            Try to get your score above <span className="font-semibold"> 70% </span>to increase your chances!
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">



                    <div className="flex flex-col gap-6">

                        <div className="flex bg-gray-50 justify-between items-center rounded-md border p-2 px-2 border-gray-200 gap-4">


                            <div className=" font-circular text-sm  ">
                                High Priority Keywords

                            </div>


                            <div className="bg-white flex items-center gap-2 py-1 border border-gray-200 px-2.5 rounded-4xl">
                                <FaCheckCircle className="text-primary-light" size={16} />

                                <span className="font-circular text-sm"> {matchScore?.highPriorityKeywords?.matchedCount} / {matchScore?.highPriorityKeywords?.skills?.length}</span>
                            </div>


                        </div>
                        <div className="grid gap-4 grid-cols-2">


                            {matchScore?.highPriorityKeywords?.skills?.map((item, index) => (
                                <div key={index} className={` flex items-center gap-2  ${item.matched ? '' : 'text-gray-500 font-light'}`}>

                                    <FaCheckCircle className={`size-4 ${item.matched ? "text-primary-blue" : "text-gray-400"}`} />

                                    <div className="font-circular font-normal">
                                        {item.skill}

                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="flex bg-gray-50 justify-between items-center rounded-md border p-2 px-2 border-gray-200 gap-4">


                            <div className=" font-circular text-sm  ">
                                Low Priority Keywords

                            </div>


                            <div className="bg-white flex items-center gap-2 py-1 border border-gray-200 px-2.5 rounded-4xl">
                                <FaCheckCircle className="text-primary-light" size={16} />

                                <span className="font-circular text-sm"> {matchScore?.lowPriorityKeywords?.matchedCount} / {matchScore?.lowPriorityKeywords?.skills?.length}</span>
                            </div>


                        </div>


                        <div className="grid gap-4 grid-cols-2">


                            {matchScore?.lowPriorityKeywords?.skills?.map((item, index) => (
                                <div key={index} className={` flex items-center gap-2  ${item.matched ? '' : 'text-gray-500 font-light'}`}>

                                    <FaCheckCircle className={`size-4 ${item.matched ? "text-primary-blue" : "text-gray-400"}`} />

                                    <div className="font-circular font-normal">
                                        {item.skill}

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>


            </DialogContent>
        </Dialog>
    )
}

export default ResumeMatch
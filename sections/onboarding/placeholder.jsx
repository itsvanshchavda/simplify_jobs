
const PlaceholderJobCard = () => (
    <div className="relative bg-white border border-gray-200 rounded-lg p-4 sm:p-6 w-full max-w-4xl mx-auto">
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center z-10">
            <div className="text-center p-8">

                <h3 className="font-circular font-semibold text-xl text-gray-600 mb-2">Add a Job Link</h3>
                <p className="font-circular text-gray-500 text-sm mb-4 max-w-md">
                    Paste the job URL above to fetch job details and customize your resume accordingly
                </p>
            </div>
        </div>

        {/* Background placeholder content */}
        <div className="flex items-start gap-4 sm:pb-4">
            <div className="w-16 h-16 bg-gray-400 rounded-lg animate-pulse"></div>
            <div className="flex-1">
                <div className="w-3/4 h-6 bg-gray-400 rounded mb-2 animate-pulse"></div>
                <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="w-24 h-4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="w-28 h-4 bg-gray-400 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-16 h-4 bg-gray-400 rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-400 rounded animate-pulse"></div>
                </div>
            </div>
        </div>

        <div className="sm:pb-6 pb-2">
            <div className="space-y-2">
                <div className="w-full h-4 bg-gray-400 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-400 rounded animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-400 rounded animate-pulse"></div>
            </div>
        </div>

        <div className="hidden xl:block pb-4">
            <div className="w-32 h-5 bg-gray-400 rounded mb-2 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
                <div className="w-16 h-6 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-20 h-6 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-18 h-6 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
        </div>

        <div className=" hidden xl:flex items-center justify-between pt-4 border-t border-gray-300">
            <div className="w-32 h-4 bg-gray-400 rounded animate-pulse"></div>
            <div className="w-24 h-8 bg-gray-400 rounded animate-pulse"></div>
        </div>
    </div>
)
export default PlaceholderJobCard;
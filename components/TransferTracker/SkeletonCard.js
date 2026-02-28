export default function SkeletonCard() {
    return (
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Date & Badge Skeleton */}
            <div className="flex justify-between items-center mb-6">
                <div className="h-4 w-24 bg-white/10 rounded-full animate-pulse"></div>
                <div className="h-6 w-20 bg-emerald-500/20 rounded-full animate-pulse"></div>
            </div>

            {/* Player Profile Skeleton */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse border border-white/5"></div>
                <div className="flex-1 space-y-3">
                    <div className="h-6 w-3/4 bg-white/10 rounded-md animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-white/5 rounded-md animate-pulse"></div>
                </div>
            </div>

            {/* Clubs Skeleton */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
                    <div className="h-3 w-16 bg-white/5 rounded-full animate-pulse"></div>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
                </div>

                <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
                    <div className="h-3 w-16 bg-white/5 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Fee Skeleton */}
            <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-4">
                <div className="h-4 w-16 bg-white/5 rounded-md animate-pulse"></div>
                <div className="h-6 w-24 bg-white/10 rounded-md animate-pulse"></div>
            </div>
        </div>
    );
}

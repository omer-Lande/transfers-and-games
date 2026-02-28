import { AlertTriangle } from 'lucide-react';

export default function RateLimit({ message = "You've hit the API rate limit. Please grab a coffee and try again in a minute!" }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-amber-500/10 border border-amber-500/20 rounded-2xl max-w-md mx-auto my-8 space-y-4 text-center">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500 mb-2">
                <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-amber-500">Rate Limit Exceeded</h3>
            <p className="text-zinc-400 leading-relaxed">
                {message}
            </p>
            <div className="text-xs text-zinc-500 pt-4 font-mono bg-black/20 px-4 py-2 rounded-lg">
                Error 429: Too Many Requests
            </div>
        </div>
    );
}

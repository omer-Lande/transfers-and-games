"use client";
import { useState } from "react";
import { fetchAPI, CACHE_TTL } from "@/lib/api";
import RateLimit from "@/components/RateLimit";

export default function TestCache() {
    const [logs, setLogs] = useState([]);
    const [rateLimitError, setRateLimitError] = useState(false);

    const addLog = (msg) => {
        setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), msg }]);
    };

    const clearCache = () => {
        localStorage.clear();
        addLog("LocalStorage Cleared");
        setRateLimitError(false);
    };

    const handleFetch = async () => {
        setRateLimitError(false);
        addLog("Triggering fetch for /v4/test-transfers...");

        // We pass isMock=true to simulate a successful API call for testing cache
        const result = await fetchAPI("v4/test-transfers", CACHE_TTL.TRANSFERS, true);

        if (result.error && result.type === 'RATE_LIMIT') {
            setRateLimitError(true);
            addLog("Received 429 Rate Limit Error");
        } else if (result.cached) {
            addLog(`Success! Loaded from Cache: ${JSON.stringify(result.data)}`);
        } else {
            addLog(`Success! Fetched Fresh Data: ${JSON.stringify(result.data)}`);
        }
    };

    const triggerRateLimit = async () => {
        setRateLimitError(true);
        addLog("Manually triggered Rate Limit UI");
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Phase 2: Cache & Error Test</h1>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={handleFetch}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                >
                    1. Fetch Data (Click Twice to test Cache)
                </button>
                <button
                    onClick={clearCache}
                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors"
                >
                    2. Clear Cache
                </button>
                <button
                    onClick={triggerRateLimit}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium transition-colors"
                >
                    3. Test 429 Error UI
                </button>
            </div>

            {rateLimitError && (
                <RateLimit />
            )}

            <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-zinc-950 px-4 py-2 border-b border-zinc-800 font-mono text-xs text-zinc-400 flex justify-between">
                    <span>Application Logs</span>
                </div>
                <div className="p-4 h-64 overflow-y-auto font-mono text-sm space-y-2">
                    {logs.length === 0 && <span className="text-zinc-600">No logs yet. Run a fetch action.</span>}
                    {logs.map((log, i) => (
                        <div key={i} className="text-emerald-400">
                            <span className="text-zinc-500 mr-4">[{log.time}]</span>
                            {log.msg}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

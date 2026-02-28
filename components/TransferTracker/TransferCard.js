"use client";
import { ArrowRight, Sparkles, User, ShieldQuestion } from "lucide-react";

export default function TransferCard({ player }) {
    const { name, date, fromClub, toClub, isNewSigning, fee, position, age } = player;

    return (
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/10 hover:border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
                <span className="text-xs font-medium text-zinc-500 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                    {new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </span>
                {isNewSigning && (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        New Signing
                    </span>
                )}
            </div>

            {/* Player Info */}
            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-white/10 shadow-inner">
                    <User className="w-8 h-8 text-zinc-500" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-1">{name}</h3>
                    <p className="text-sm text-zinc-400 font-medium">{position} • Age {age}</p>
                </div>
            </div>

            {/* Transfer Path */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 relative z-10">
                {/* From Club */}
                <div className="flex flex-col items-center gap-2 w-1/3 text-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
                        {fromClub.crest ? (
                            <img src={fromClub.crest} alt={fromClub.name} className="w-6 h-6 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                        ) : null}
                        <div className="hidden w-full h-full items-center justify-center text-zinc-500">
                            <ShieldQuestion className="w-5 h-5" />
                        </div>
                    </div>
                    <span className="text-xs font-semibold text-zinc-300 truncate w-full px-1" title={fromClub.name}>{fromClub.name}</span>
                </div>

                {/* Arrow */}
                <div className="flex-1 flex justify-center">
                    <div className="bg-white/5 p-2 rounded-full border border-white/10">
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </div>
                </div>

                {/* To Club */}
                <div className="flex flex-col items-center gap-2 w-1/3 text-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                        {toClub.crest ? (
                            <img src={toClub.crest} alt={toClub.name} className="w-6 h-6 object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                        ) : null}
                        <div className="hidden w-full h-full items-center justify-center text-zinc-500">
                            <ShieldQuestion className="w-5 h-5" />
                        </div>
                    </div>
                    <span className="text-xs font-bold text-white truncate w-full px-1" title={toClub.name}>{toClub.name}</span>
                </div>
            </div>

            {/* Fee Footer */}
            <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-4 relative z-10">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Est. Fee</span>
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    {fee}
                </span>
            </div>
        </div>
    );
}

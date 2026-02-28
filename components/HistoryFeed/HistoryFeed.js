import { CalendarDays, HelpCircle, Trophy, ShieldQuestion } from "lucide-react";
import { getRandomTrivia } from "@/lib/trivia";

export default function HistoryFeed({ historyData }) {
    return (
        <div className="relative pl-8 md:pl-0">
            {/* Vertical Timeline Line (Desktop only) */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-transparent -translate-x-1/2 z-0 rounded-full"></div>

            {/* Timeline Line (Mobile) */}
            <div className="md:hidden absolute left-0 top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-transparent z-0 rounded-full"></div>

            <div className="space-y-12">
                {historyData.map((yearData, index) => {
                    const { year, matches } = yearData;
                    const hasMatches = matches && matches.length > 0;
                    const isEven = index % 2 === 0;

                    return (
                        <div key={year} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-8 w-full z-10`}>
                            {/* Year Node */}
                            <div className="absolute left-[-2.5rem] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-12 h-12 bg-zinc-950 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] z-20">
                                <span className="text-emerald-400 font-bold text-sm">{year}</span>
                            </div>

                            {/* Content Card */}
                            <div className="w-full md:w-1/2 flex justify-start md:px-12">
                                <div className="w-full relative group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    {hasMatches ? (
                                        <div>
                                            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                                                <Trophy className="w-5 h-5 text-amber-400" />
                                                <span className="text-sm font-semibold text-zinc-300">
                                                    {matches[0].competition?.name || "Matchday"}
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-6">
                                                {matches.slice(0, 2).map((match, i) => (
                                                    <div key={i} className="flex items-center justify-between bg-black/30 p-4 rounded-2xl border border-white/5">
                                                        {/* Home Team */}
                                                        <div className="flex flex-col items-center gap-2 w-1/3">
                                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center p-2">
                                                                {match.homeTeam?.crest ? (
                                                                    <img src={match.homeTeam.crest} alt={match.homeTeam.name} className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                                                ) : null}
                                                                <div className="hidden w-full h-full items-center justify-center text-zinc-500">
                                                                    <ShieldQuestion className="w-6 h-6" />
                                                                </div>
                                                            </div>
                                                            <span className="text-xs font-semibold text-center truncate w-full px-1">{match.homeTeam?.shortName || match.homeTeam?.name}</span>
                                                        </div>

                                                        {/* Score */}
                                                        <div className="flex-1 flex flex-col items-center justify-center">
                                                            <div className="bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-500/30 text-emerald-400 font-black text-xl tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                                                {match.score?.fullTime?.home ?? '-'} : {match.score?.fullTime?.away ?? '-'}
                                                            </div>
                                                            <span className="text-[10px] text-zinc-500 mt-2 uppercase font-bold tracking-wider">Final</span>
                                                        </div>

                                                        {/* Away Team */}
                                                        <div className="flex flex-col items-center gap-2 w-1/3">
                                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center p-2">
                                                                {match.awayTeam?.crest ? (
                                                                    <img src={match.awayTeam.crest} alt={match.awayTeam.name} className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                                                ) : null}
                                                                <div className="hidden w-full h-full items-center justify-center text-zinc-500">
                                                                    <ShieldQuestion className="w-6 h-6" />
                                                                </div>
                                                            </div>
                                                            <span className="text-xs font-semibold text-center truncate w-full px-1">{match.awayTeam?.shortName || match.awayTeam?.name}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[200px]">
                                            <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/20">
                                                <HelpCircle className="w-8 h-8 text-cyan-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-2">Did You Know?</h3>
                                            <p className="text-zinc-400 text-sm leading-relaxed italic border-l-2 border-cyan-400/50 pl-4 py-1 text-left">
                                                "{getRandomTrivia()}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

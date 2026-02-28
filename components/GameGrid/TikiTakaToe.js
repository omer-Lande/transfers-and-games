"use client";
import { useState, useEffect } from "react";
import { journeymen } from "@/lib/journeymen";
import { masterTeams } from "@/lib/teams";
import { Check, X, RotateCcw, Share2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const getDailySeed = () => {
    const today = new Date().toISOString().split('T')[0];
    return parseInt(today.replace(/-/g, ''));
};

const mulberry32 = (a) => {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
};

const shuffle = (array, randomFunc) => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(randomFunc() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

// Extracted all unique names for the autocomplete
const allPlayerNames = Array.from(new Set(journeymen.map(p => p.name)));

function CellInput({ r, c, cell, updateCell, validatePlayer }) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Virtual Scrolling logic: ensure we only render a max of 50 items to keep DOM performant
    const displayNames = searchQuery
        ? allPlayerNames.filter(name => name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 50)
        : allPlayerNames.slice(0, 50);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button type="button" className="w-full h-full flex flex-col items-center justify-center p-2 z-10 cursor-pointer border-none bg-transparent">
                    <span className="w-full bg-transparent text-center text-sm md:text-base text-white placeholder-zinc-500 truncate block px-1">
                        {cell.value ? cell.value : <span className="opacity-50 text-xs md:text-sm">Player...</span>}
                    </span>
                    {cell.status === "error" && (
                        <div className="absolute top-2 right-2 flex items-center justify-center animate-in fade-in zoom-in">
                            <X className="w-4 h-4 text-red-400" />
                        </div>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] sm:w-[250px] p-0 border-white/20 bg-zinc-950 text-zinc-100" align="center" side="bottom" avoidCollisions={false}>
                <Command shouldFilter={false} className="bg-transparent text-zinc-100">
                    <CommandInput
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        placeholder="Search player..."
                        className="border-none focus:ring-0 text-white outline-none"
                    />
                    <CommandList>
                        {displayNames.length === 0 && <CommandEmpty>No player found.</CommandEmpty>}
                        <CommandGroup className="max-h-[200px] overflow-y-auto">
                            {displayNames.map((name) => (
                                <CommandItem
                                    key={name}
                                    value={name}
                                    onSelect={(currentValue) => {
                                        // Update cell text
                                        updateCell(r, c, name);
                                        setOpen(false);
                                        // Immediately validate
                                        validatePlayer(r, c, name);
                                    }}
                                    className="text-zinc-100 cursor-pointer hover:bg-white/10"
                                >
                                    {name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default function TikiTakaToe() {
    const [grid, setGrid] = useState(
        Array(3).fill(null).map(() => Array(3).fill({ status: "empty", value: "", name: "" }))
    );

    const [shaking, setShaking] = useState({ r: -1, c: -1 });
    const [victoryOpen, setVictoryOpen] = useState(false);
    const [axes, setAxes] = useState({ rows: [], cols: [] });

    useEffect(() => {
        const todayStr = new Date().toISOString().split('T')[0];
        const randomFunc = mulberry32(getDailySeed());
        const shuffledTeams = shuffle(masterTeams, randomFunc);
        setAxes({
            rows: shuffledTeams.slice(0, 3),
            cols: shuffledTeams.slice(3, 6)
        });

        const saved = localStorage.getItem("tiki_taka_game");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.date === todayStr) {
                    setGrid(parsed.grid);
                    checkVictory(parsed.grid);
                } else {
                    localStorage.removeItem("tiki_taka_game");
                }
            } catch (e) {
                console.error("Failed to parse saved grid");
            }
        }
    }, []);

    const saveState = (newGrid) => {
        const todayStr = new Date().toISOString().split('T')[0];
        localStorage.setItem("tiki_taka_game", JSON.stringify({ grid: newGrid, date: todayStr }));
        setGrid(newGrid);
        checkVictory(newGrid);
    };

    const checkVictory = (currentGrid) => {
        let allCorrect = true;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (currentGrid[r][c].status !== "correct") {
                    allCorrect = false;
                }
            }
        }
        if (allCorrect) setVictoryOpen(true);
    };

    const handleClear = () => {
        const emptyGrid = Array(3).fill(null).map(() => Array(3).fill({ status: "empty", value: "", name: "" }));
        saveState(emptyGrid);
        setVictoryOpen(false);
    };

    const updateCell = (r, c, newValue) => {
        const newGrid = [...grid];
        newGrid[r] = [...newGrid[r]];
        newGrid[r][c] = { ...newGrid[r][c], value: newValue, status: "empty" };
        setGrid(newGrid);
    };

    const validatePlayer = (r, c, forcedInput) => {
        if (axes.rows.length === 0) return;

        const inputStr = forcedInput || grid[r][c].value;
        if (!inputStr.trim()) return;

        const rowTeam = axes.rows[r].name;
        const colTeam = axes.cols[c].name;

        // Fuzzy match using toLowerCase().trim()
        const searchStr = inputStr.toLowerCase().trim();

        const matchedPlayer = journeymen.find(p => {
            const pName = p.name.toLowerCase().trim();
            const isNameMatch = pName.includes(searchStr) || searchStr.includes(pName);
            if (!isNameMatch) return false;

            const playedForRow = p.clubs.some(c => c.toLowerCase().trim().includes(rowTeam.toLowerCase().trim().replace("fc", "").replace("cf", "").trim()));
            const playedForCol = p.clubs.some(c => c.toLowerCase().trim().includes(colTeam.toLowerCase().trim().replace("fc", "").replace("cf", "").trim()));

            return playedForRow && playedForCol;
        });

        const newGrid = [...grid];
        newGrid[r] = [...newGrid[r]];

        if (matchedPlayer) {
            newGrid[r][c] = { status: "correct", value: matchedPlayer.name, name: matchedPlayer.name };
            saveState(newGrid);
        } else {
            newGrid[r][c] = { status: "error", value: inputStr, name: "" };
            setGrid(newGrid);

            setShaking({ r, c });
            setTimeout(() => setShaking({ r: -1, c: -1 }), 400);
        }
    };

    if (axes.rows.length === 0) return null;

    let correctCount = 0;
    grid.forEach(row => row.forEach(cell => {
        if (cell.status === "correct") correctCount++;
    }));

    return (
        <div className="flex flex-col items-center">
            <div className="mb-6 inline-flex items-center gap-2 bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Trophy className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm">
                    Progress: {correctCount}/9
                </span>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl overflow-x-auto w-full max-w-4xl mx-auto">
                <div className="grid grid-cols-[80px_1fr_1fr_1fr] md:grid-cols-[100px_150px_150px_150px] gap-2 md:gap-4 mx-auto w-max">
                    <div className="w-full h-full"></div>

                    {axes.cols.map((team, idx) => (
                        <div key={`col-${idx}`} className="flex flex-col items-center justify-center p-2 bg-black/40 rounded-2xl border border-white/10">
                            <img src={team.crest} alt={team.name} title={team.name} className="w-10 h-10 md:w-16 md:h-16 object-contain filter drop-shadow-md" />
                        </div>
                    ))}

                    {axes.rows.map((rowTeam, r) => (
                        <div className="contents" key={`row-${r}`}>
                            <div className="flex flex-col items-center justify-center p-2 bg-black/40 rounded-2xl border border-white/10">
                                <img src={rowTeam.crest} alt={rowTeam.name} title={rowTeam.name} className="w-10 h-10 md:w-16 md:h-16 object-contain filter drop-shadow-md" />
                            </div>

                            {axes.cols.map((colTeam, c) => {
                                const cell = grid[r][c];
                                const isShaking = shaking.r === r && shaking.c === c;

                                let cellClass = "relative overflow-visible rounded-2xl border transition-all duration-300 w-full aspect-square flex items-center justify-center group ";

                                if (cell.status === "correct") {
                                    cellClass += "bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
                                } else if (cell.status === "error") {
                                    cellClass += "bg-red-500/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] ";
                                    if (isShaking) cellClass += " animate-subtle-shake";
                                } else {
                                    cellClass += "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10";
                                }

                                return (
                                    <div key={`${r}-${c}`} className={cellClass}>
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>

                                        {cell.status === "correct" ? (
                                            <div className="flex flex-col items-center justify-center z-10 p-2 text-center animate-in zoom-in duration-300">
                                                <Check className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 mb-1" />
                                                <span className="text-xs md:text-sm font-bold text-white leading-tight">{cell.name}</span>
                                            </div>
                                        ) : (
                                            <CellInput r={r} c={c} cell={cell} updateCell={updateCell} validatePlayer={validatePlayer} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex gap-4">
                <Button onClick={handleClear} variant="destructive" className="rounded-xl flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Clear Game
                </Button>
            </div>

            <Dialog open={victoryOpen} onOpenChange={setVictoryOpen}>
                <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white rounded-2xl p-8">
                    <DialogHeader className="flex flex-col items-center text-center gap-4">
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                            <Trophy className="w-10 h-10 text-emerald-400" />
                        </div>
                        <DialogTitle className="text-3xl font-extrabold tracking-tight text-white mb-2">Tiki-Taka-Master!</DialogTitle>
                        <DialogDescription className="text-zinc-400 text-base mb-6">
                            You flawlessly completed today&apos;s grid of {axes.rows.length + axes.cols.length} elite clubs. Your ball knowledge is legendary.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center mt-2">
                        <Button
                            className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 text-white rounded-xl px-6 py-4 flex items-center gap-2 hover:shadow-[0_0_20px_rgba(29,161,242,0.4)] transition-all font-bold w-full"
                            onClick={() => {
                                const tweetText = `I solved the Tiki-Taka-Toe Grid for ${new Date().toISOString().split('T')[0]}!\n🟩🟩🟩\n🟩🟩🟩\n🟩🟩🟩`;
                                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
                            }}
                        >
                            <Share2 className="w-5 h-5 mr-2" /> Share on X
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

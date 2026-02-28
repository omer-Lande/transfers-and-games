import TikiTakaToe from "@/components/GameGrid/TikiTakaToe";
import { Gamepad2 } from "lucide-react";

export default function GamePage() {
    return (
        <div className="min-h-full p-8 md:p-12 max-w-5xl mx-auto overflow-hidden">
            <header className="mb-12 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <div className="bg-emerald-500/20 p-3 rounded-2xl text-emerald-400 border border-emerald-500/20">
                        <Gamepad2 className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                        Tiki-Taka-<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Toe</span>
                    </h1>
                </div>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto md:mx-0">
                    The ultimate football grid challenge. Name a player who has played competitive minutes for BOTH clubs on the intersecting axes. Press <strong>ENTER</strong> to guess!
                </p>
            </header>

            <div className="w-full flex justify-center pb-20">
                <TikiTakaToe />
            </div>
        </div>
    );
}

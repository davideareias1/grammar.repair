import { LIMITS } from "@/lib/constants";
import { Info } from "lucide-react";

interface WordCountProps {
    wordCount: number;
    charCount: number;
    exceedsWordLimit: boolean;
    exceedsCharLimit: boolean;
}

export default function WordCount({ wordCount, charCount, exceedsWordLimit, exceedsCharLimit }: WordCountProps) {
    return (
        <div className="absolute -bottom-7 left-0 z-10 flex w-full items-center gap-2 rounded-bl-lg rounded-br-lg border border-t-0 border-gray-300 bg-white pb-2 pl-4 pr-4 pt-2 text-sm font-light text-black transition-all duration-500 peer-focus:shadow-lg peer-focus:dark:shadow-gray-800 peer-disabled:blur-[5px] select-none dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            <span data-testid="word-count" className={exceedsWordLimit ? "text-red-400" : ""}>
                {wordCount} Words
            </span>
            |
            <span data-testid="char-count" className={exceedsCharLimit ? "text-red-400" : ""}>
                {charCount} Characters
            </span>

            <div className="group relative ml-auto flex items-center">
                <Info data-testid="help-button" className="h-4 w-4 cursor-help text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
                <div data-testid="help-box" className="absolute bottom-full right-0 mb-2 hidden w-max rounded bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg group-hover:block dark:bg-gray-700">
                    <p>Maximum {LIMITS.MAX_WORDS} words</p>
                    <p>Maximum {LIMITS.MAX_CHARS.toLocaleString()} characters</p>
                </div>
            </div>
        </div>
    )
}
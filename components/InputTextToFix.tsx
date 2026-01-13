"use client";

import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { WavyLine } from "@/components/WavyLine";
import WordCount from "./WordCounter";
import { Copy, Check } from "lucide-react";
import { LIMITS } from "@/lib/constants";
import { countWords } from "@/lib/utils";

export default function InputTextToFix() {
    const { isRateLimited, timeLeft, startRateLimit } = useRateLimit();
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    const { completion, input, setInput, handleInputChange, isLoading, complete } = useCompletion({
        api: "/api/grammar",
        streamProtocol: "text",
        onFinish: async (_prompt, completionText) => {
            setInput(completionText);
            await copyToClipboard(completionText);
        },
        onError: (err) => {
            try {
                const errorData = JSON.parse(err.message);
                if (errorData?.reset) {
                    startRateLimit(errorData.reset);
                }
            } catch {
                startRateLimit(60); // Default fallback
            }
        },
    });

    const handleSubmit = async () => {
        if (!input?.trim() || isLoading) return;
        await complete(input);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget;
        const value = textarea.value;
        const isAllSelected = textarea.selectionStart === 0 && textarea.selectionEnd === value.length;

        if (value.trim().length > 0 && !isAllSelected) return;

        const form = textarea.form;
        setTimeout(() => form?.requestSubmit(), 0);
    };

    // Show completion while streaming, otherwise show input
    const displayValue = isLoading && completion ? completion : input;

    const wordCount = countWords(displayValue || "");
    const charCount = (displayValue || "").length;
    const exceedsWordLimit = wordCount > LIMITS.MAX_WORDS;
    const exceedsCharLimit = charCount > LIMITS.MAX_CHARS;
    const isDisabled = isLoading || isRateLimited || !input?.trim() || exceedsWordLimit || exceedsCharLimit;

    return (
        <form action={handleSubmit} className="flex w-full max-w-3xl flex-col gap-3">
            <div className="relative w-full">
                {isRateLimited && (
                    <div role="alert" aria-live="assertive" className="absolute inset-0 z-10 flex flex-col items-center justify-center font-medium transition-all duration-200 dark:text-white">
                        Too many requests. Please slow down.
                        <WavyLine />
                    </div>
                )}

                <label htmlFor="grammar-input" className="sr-only">Text to fix</label>
                <textarea
                    id="grammar-input"
                    data-testid="text-area"
                    spellCheck={false}
                    data-gramm="false"
                    data-gramm_editor="false"
                    data-enable-grammarly="false"
                    name="text"
                    required
                    value={displayValue}
                    disabled={isRateLimited}
                    onChange={handleInputChange}
                    onPaste={handlePaste}
                    className="peer h-96 w-full resize-none rounded-tl-lg rounded-tr-lg border border-b-0 border-gray-300 bg-white p-4 text-black placeholder:text-black transition-all duration-500 focus:shadow-lg focus:outline-none disabled:blur-[5px] dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-white dark:focus:shadow-gray-800"
                    placeholder={isRateLimited ? `Rate limited, ${timeLeft}s remaining` : "Paste your text or write it here"}
                    autoFocus
                />

                <WordCount
                    wordCount={wordCount}
                    charCount={charCount}
                    exceedsWordLimit={exceedsWordLimit}
                    exceedsCharLimit={exceedsCharLimit}
                />
            </div>

            <div role="status" aria-live="polite" className="sr-only">
                {copied ? "Corrected text copied to clipboard" : ""}
            </div>

            <div className="mt-7 flex items-center justify-end gap-3">
                {input?.trim() && !isLoading && (
                    <button
                        type="button"
                        data-testid="copy-button"
                        onClick={() => copyToClipboard(input)}
                        className={`flex min-w-[100px] cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2 font-medium transition-all duration-300 select-none ${copied
                            ? "border-green-500 bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                            }`}
                    >
                        {copied ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                        <span className="w-14">{copied ? "Copied!" : "Copy"}</span>
                    </button>
                )}

                <button
                    type="submit"
                    data-testid="repair-button"
                    disabled={isDisabled}
                    className="cursor-pointer rounded-lg bg-black px-4 py-2 font-bold text-white transition-all duration-500 select-none hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-default disabled:hover:scale-100 disabled:hover:shadow-none dark:bg-white dark:text-black dark:shadow-gray-800"
                >
                    Repair ⏎
                </button>
            </div>
        </form>
    );
}

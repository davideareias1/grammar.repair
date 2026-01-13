"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function ModeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <button
            data-testid="theme-button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            {resolvedTheme === 'light' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5 text-white" />
            )}
        </button>
    )
}

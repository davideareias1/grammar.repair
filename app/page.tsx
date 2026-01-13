import ModeSwitcher from "@/components/ModeSwitcher"
import InputTextToFix from "@/components/InputTextToFix";
import Image from "next/image";

export default function Home() {

  return (
    <div className="bg-gray-50 dark:bg-black/95 h-screen flex flex-col">
      <header className="flex justify-end pt-3 pr-5">
        <ModeSwitcher />
      </header>
      <main className="flex justify-center items-center h-8/12 flex-1">
        <InputTextToFix />
      </main>

      <footer className="flex items-center justify-center gap-2 pb-6 text-sm text-gray-500 dark:text-gray-400">
        <Image
          src="/logo.png"
          alt="grammar.repair logo"
          width={24}
          height={24}
          className="w-6 h-6 object-contain select-none"
          draggable={false}
        />
        <p className="text-sm select-none">© {new Date().getFullYear()} grammar.repair. All rights reserved.</p>
      </footer>
    </div>
  );
}
"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState("");
  const [videoPosition, setVideoPosition] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const targetDate = new Date("September 24, 2024 00:00:00").getTime();
    const countdownDuration = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft("Countdown ended");
        return;
      }

      const hours = Math.floor((distance % (countdownDuration)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Adjust the trigger point to be more to the left
    setVideoPosition({ x, y, visible: x >= rect.width / 3 });
  };

  const handleMouseEnter = () => {
    setVideoPosition((prev) => ({ ...prev, visible: true }));
  };

  const handleMouseLeave = () => {
    setVideoPosition((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:gap-16 sm:p-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col sm:flex-row gap-4 sm:gap-8 row-start-2 items-center justify-center w-full mt-[-10px] sm:mt-[-20px]">
        <div className="flex flex-col gap-8 items-center sm:items-start order-2 sm:order-1">
          <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-8xl 2xl:text-12xl font-bold bg-gradient-to-br from-white to-silver text-transparent bg-clip-text">DRONEFORGE</h1>
          <ol className="list-inside list-decimal text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Preorder available now until{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold text-green-500">
                {timeLeft}
              </code>
              .
            </li>
            <li>The future of drone technology at your fingertips.</li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Preorder
            </a>
          </div>
        </div>
        <div
          className="relative order-1 sm:order-2 flex justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <Image
            src="/drone.png"
            alt="Drone Image"
            width={500}
            height={500}
          />
          {videoPosition.visible && (
            <div
              className="absolute flex items-center justify-center bg-black bg-opacity-75 rounded-lg"
              style={{
                left: videoPosition.x - 250,
                top: videoPosition.y - 250,
                width: 500,
                height: 500,
              }}
            >
              <video src="/Demo.MOV" autoPlay muted className="w-full h-full object-cover rounded-lg" />
            </div>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm sm:text-base"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={12} // Decreased size for mobile
            height={12} // Decreased size for mobile
            className="sm:w-4 sm:h-4" // Original size for larger screens
          />
          Security
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm sm:text-base"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={12} // Decreased size for mobile
            height={12} // Decreased size for mobile
            className="sm:w-4 sm:h-4" // Original size for larger screens
          />
          Privacy Policy
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm sm:text-base"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={12} // Decreased size for mobile
            height={12} // Decreased size for mobile
            className="sm:w-4 sm:h-4" // Original size for larger screens
          />
          Twitter
        </a>
      </footer>
    </div>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0f] to-[#111827] text-white flex items-center justify-center px-6">
      <section className="max-w-3xl text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
          Momentum
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/80">
          Own the cinematic moments. Trade the experience.
        </p>
        <div className="mt-10">
          <button className="inline-flex items-center rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}

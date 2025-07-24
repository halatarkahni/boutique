"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold text-blue-600 animate-bounce">
        Le shopping, simplifié
      </h1>

      <img
        src="/images/go.jpg"   // ajuste le chemin selon ton dossier public
        alt="Go"
        className="cursor-pointer w-20 h-20"
        onClick={() => router.push("/products")}
      />
    </div>
  );
}

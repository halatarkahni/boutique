
"use client";
import { useRouter } from "next/navigation";

export default function BoutonBack() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-blue-500 text-white px-4 py-2 rounded mx-50 hover:bg-blue-700 transition duration-300"
    >
    Back
    </button>
  );
}
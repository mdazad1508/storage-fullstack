"use client"

import Image from "next/image";
import Authenticate from "@/components/Authenticate";
import { MoralisProvider } from "react-moralis"


export default function Home() {

  return (
    <MoralisProvider initializeOnMount={false}>
      <div className=" bg-[#F0F0F0] p-4 overflow-x-scroll text-black">
        <h1 className="text-4xl font-extrabold text-indigo-600 py-4 border-b-2 border-gray-600 mb-4"> NUMBER STOAGE DAPP </h1>
        <Authenticate />
      </div>
    </MoralisProvider>
  );
}

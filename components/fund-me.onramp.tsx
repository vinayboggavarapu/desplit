"use client"

import { generateOnRampURL } from "@coinbase/cbpay-js";
import { Button } from "./ui/button";
import Image from "next/image";
import { useAccount } from "wagmi";
import { ExternalLink } from "lucide-react";

const FundMeOnRamp = () => {

    const {address}=useAccount()

    if(!address) return null


    const onRampURL = generateOnRampURL({
        appId: process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID,
        destinationWallets: [
          { address: "0x6a111612F1f87869E1A494B40Cc997c70cD3B014", blockchains: ["ETH"] },
        ]
      });
  return  <div className="space-y-4">
    <p className="text-zinc-400 text-sm">  Don't have enough balance?</p>
    <Button variant='ghost' onClick={() => window.open(onRampURL, '_blank')} className="w-full text-white bg-blue-600">
    Add crypto with Coinbase Pay
    <ExternalLink className="w-4 h-4 ml-2" />
    </Button>
  </div>

}  

export default FundMeOnRamp;

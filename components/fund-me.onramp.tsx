import { generateOnRampURL } from "@coinbase/cbpay-js";
import { Button } from "./ui/button";
import Image from "next/image";
import { useAccount } from "wagmi";



const FundMeOnRamp = () => {

    const {address}=useAccount()

    if(!address) return null


    const onRampURL = generateOnRampURL({
        appId: process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID,
        destinationWallets: [
          { address: "0x6a111612F1f87869E1A494B40Cc997c70cD3B014", blockchains: ["ETH"] },
        ]
      });
  return <div className='flex flex-col gap-2 items-center mt-4'>
  Don't have enough balance?
  <Button variant='ghost' className='p-0' onClick={() => window.open(onRampURL, '_blank')}>
    <Image src={"/fund.png"} alt='coinbase' width={1000} height={1000} className="w-30 h-10 object-contain"/>
  </Button>
</div>    
}  

export default FundMeOnRamp;

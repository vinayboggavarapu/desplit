// "use client";

// import React, { useEffect, useState, useRef } from 'react';
// import { QrReader } from 'react-qr-reader';
// import { toast } from '@/hooks/use-toast';

// const QrScannerPage = () => {
//   const [data, setData] = useState<string>('No result');
//   const [isInViewport, setIsInViewport] = useState<boolean>(false);
//   const qrReaderRef = useRef<HTMLDivElement>(null);
//   const [cameraError, setCameraError] = useState<boolean>(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsInViewport(entry.isIntersecting);
//       },
//       {
//         root: null,
//         threshold: 0.1,
//       }
//     );

//     if (qrReaderRef.current) {
//       observer.observe(qrReaderRef.current);
//     }

//     return () => {
//       if (qrReaderRef.current) {
//         observer.unobserve(qrReaderRef.current);
//       }
//       observer.disconnect(); // Ensure observer cleanup
//     };
//   }, []);

//   useEffect(() => {
//     if (isInViewport) {
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then(() => {
//           setCameraError(false); // Reset camera error state
//         })
//         .catch((e) => {
//           setCameraError(true);
//           toast({
//             title: "Error",
//             description: "Camera not found or inaccessible.",
//           });
//         });
//     }
//   }, [isInViewport]);

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <div ref={qrReaderRef} className="w-full">
//         {isInViewport && !cameraError && (
//           <QrReader
//             className="my-32 md:max-h-[30vh] w-full h-full md:max-w-[30vw] mx-auto"
//             onResult={(result, error) => {
//               if (result?.getText()) {
//                 setData(result.getText());
//               }

//               if (error) {
//                 console.error("QR Reader Error:", error.message);
//               }
//             }}
//             constraints={{
//               facingMode: "environment", // Use rear camera when available
//             }}
//           />
//         )}
//         {cameraError && (
//           <p className="text-red-500 text-center mt-4">
//             Unable to access the camera. Please grant permissions and try again.
//           </p>
//         )}
//       </div>
//       <div className="text-center mt-4">
//         <p className="font-semibold text-gray-700">Scanned QR Code:</p>
//         <p className="break-words text-gray-600">{data}</p>
//       </div>
//     </div>
//   );
// };

// export default QrScannerPage;

import React from 'react'

const QrPage = () => {
  return (
    <div>
      Coming soon...
      
    </div>
  )
}

export default QrPage

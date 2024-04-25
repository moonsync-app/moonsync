'use client';
import Image from 'next/image';
{
  /* <div className="relative h-48 mx-4 -mt-16 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40"> */
}

export default function StatsCard({ title, details }) {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-11/12" style={{ backgroundColor: 'rgba(188, 247, 208, 0.5)' }}>
      {/* <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-11/12"> */}
      {/*  <div className="relative h-48 mx-4 -mt-8 overflow-hidden text-white shadow-sm bg-clip-border rounded-xl"> */}
        {/* <Image src={svgIllustration} alt="card-image" className="object-fill" /> */}
      {/*  </div> */}
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center">
          {title}
        </h5>
        {details ? (
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit h-36 overflow-auto">
            {details}
          </p>
        ) : (
          <>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

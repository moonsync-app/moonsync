import Image from 'next/image';
{/* <div className="relative h-48 mx-4 -mt-16 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40"> */}

export default function StatsCard({svgIllustration, title, details}) {
  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-11/12">
      <div className="relative h-48 mx-4 -mt-8 overflow-hidden text-white shadow-sm bg-clip-border rounded-xl">
        <Image
          src={svgIllustration}
          alt="card-image"
          className='object-fill'
        />
      </div>
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center">
          {title}
        </h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit whitespace-pre-wrap">
         {details}
        </p>
      </div>
    </div>
  );
}

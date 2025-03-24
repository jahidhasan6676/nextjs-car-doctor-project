import Image from 'next/image';
import React from 'react';
import bannerImage from "../../../../public/assets/images/checkout/checkout.png"
import Link from 'next/link';

const ServicesDetailsPage = async ({ params }) => {
    const p = await params;
    const res = await fetch(`http://localhost:3000/api/service/${p?.id}`);
    const data = await res.json();
    console.log(data)
    return (
        <div className='w-11/12 mx-auto'>
            {/* banner section */}
            <section className=''>
                <div className='relative'>
                    <Image src={bannerImage} height={300} alt='banner' className='w-full h-[300px] object-cover' />
                    <div className='transparent-layer overlay-bg  absolute w-full h-full top-0'>
                        <div className='w-full h-full flex items-center ps-20'>
                            <div>
                                <h2 className='text-white text-xl md:text-3xl font-semibold'>Service Details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* image section */}
            <section className=" grid grid-cols-12 gap-4 mt-20 mb-20">
                {/* Left Side */}
                <div className="col-span-9 space-y-4">
                    <Image
                        className="w-full h-[380px] object-cover"
                        src={data?.img}
                        width={400}
                        height={280}
                        alt={data.title}
                    />
                    <h1 className="font-bold text-3xl">{data?.title}</h1>
                    <p className="text-justify">{data?.description}</p>
                </div>
                {/* Right Side */}
                <div className="col-span-3 space-y-4">
                    <Link href={`/checkout/${data?._id}`}>
                        <button className="w-full text-white h-9 bg-orange-500 cursor-pointer">
                            Checkout
                        </button>
                    </Link>
                    <p className="text-center text-xl font-bold">
                        Price: $ {data?.price}
                    </p>
                </div>
            </section>

        </div>
    );
};

export default ServicesDetailsPage;
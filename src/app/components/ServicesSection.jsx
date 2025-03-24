
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";

const ServicesSection = async() => {
   const serviceCollection = dbConnect(collectionNameObj.servicesCollection);
   const services = await serviceCollection.find({}).toArray();

    return (
        <div className="py-20 w-11/12 mx-auto">
            {/* Text Part */}
            <div className="text-center mb-10 space-y-1">
                <p className="text-[#ff3811]">Service</p>
                <h2 className="text-2xl font-semibold">Our Service Area</h2>
                <p className="text-semibold text-gray-500">
                    The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                </p>
            </div>

            {/* Card Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {services.length > 0 ? (
                    services.map((service, index) => (
                        <div key={index} className="border border-gray-500 p-3 rounded-sm">
                            <Image src={service?.img} width={400} height={300} alt={service?.title} className="rounded-md" />
                            <h3 className="font-semibold mt-2 mb-2">{service?.title}</h3>
                            <div className="flex justify-between">
                                <p className="text-[#ff3811]">Price: {service?.price}</p>
                                <Link href={`/services/${service?._id}`}><button className="text-[#ff3811] text-sm underline cursor-pointer">See More</button></Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading services...</p>
                )}
            </div>
        </div>
    );
};

export default ServicesSection;

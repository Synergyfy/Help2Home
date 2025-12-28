'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineLocationMarker, HiCheckCircle } from 'react-icons/hi';
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5';
import { MdOutlinePower, MdOutlineSecurity } from 'react-icons/md'; 

interface PropertyCardProps {
  id: string | number;
  image: string;
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  description?: string;
  price: number;
  monthlyPrice?: number;
  featured?: boolean;
  verified?: boolean;
  isNew?: boolean;
  amenities?: {
    garden?: boolean;
    parking?: boolean;
    balcony?: boolean;
    pool?: boolean;
    gym?: boolean;
    serviced?: boolean;
    furnished?: boolean;
    security?: boolean;
    electricity?: boolean;
    waterSupply?: boolean;
  };
  tags?: {
    offPlan?: boolean;
    auction?: boolean;
    sharedOwnership?: boolean;
    retirementHome?: boolean;
    chainFree?: boolean;
  };
}

export default function PropertyCard(props: PropertyCardProps) {
  const { id, image, title, location, bedrooms, bathrooms, price, verified, amenities } = props;

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
      <Link href={`/marketplace/${id}`} className="relative block aspect-[4/3] overflow-hidden bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        
        {verified && (
          <div className="absolute top-3 left-3">
            <span className="bg-brand-green/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
              <HiCheckCircle size={12}/> VERIFIED
            </span>
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-gray-900 truncate text-sm">{title}</h3>
          <p className="text-brand-green font-bold text-sm">{formatCurrency(price)}</p>
        </div>

        <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <HiOutlineLocationMarker size={14} /> {location}
        </p>

        {/* Core Specs */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
            <IoBedOutline size={14} /> <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
            <IoWaterOutline size={14} /> <span>{bathrooms} Baths</span>
          </div>
          
          {/* New Details: Showing specific utilities if they exist */}
          {amenities?.electricity && (
            <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
              <MdOutlinePower size={14} className="text-yellow-500" /> <span>24/7 Power</span>
            </div>
          )}
          {amenities?.security && (
            <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
              <MdOutlineSecurity size={14} className="text-blue-500" /> <span>Secured</span>
            </div>
          )}
        </div>

        <Link href={`/marketplace/${id}`} className="block w-full text-center border border-brand-green text-brand-green hover:bg-brand-green hover:text-white py-2 rounded-lg font-bold transition-all text-xs mt-auto">
          View Listing
        </Link>
      </div>
    </div>
  );
}
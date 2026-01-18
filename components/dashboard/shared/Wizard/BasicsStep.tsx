'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useFormContext, useWatch } from 'react-hook-form';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useUserStore } from '@/store/userStore';
import { PROPERTY_CATEGORIES, PROPERTY_TYPES_BY_LISTING } from '@/config/propertyConfig';

import RoleSwitchModal from '@/components/lib/RoleSwitchModal';
import {
  HiOutlineHome,
  HiOutlineCheckBadge,
  HiOutlineShieldCheck
} from 'react-icons/hi2';
import {
  MdOutlineBusinessCenter,
  MdOutlineHotel,
  MdOutlineKey,
  MdOutlineRealEstateAgent,
  MdOutlineAssignmentInd,
  MdOutlineVilla
} from 'react-icons/md';

import { PropertySchema } from '@/lib/validations/propertySchema';
import 'leaflet/dist/leaflet.css';

const SuccessStep = dynamic(() => import('./SuccessStep'), { ssr: false });

interface BasicsStepProps {
  role?: 'landlord' | 'agent' | 'caretaker';
}

export default function BasicsStep({ role }: BasicsStepProps = {}) {
  const {
    register,
    setValue,
    control,
    formState: { errors }
  } = useFormContext<PropertySchema>();

  const { activeRole, setActiveRole } = useUserStore();
  const { draftData, roleOnboardingCompleted } = useOnboardingStore();

  const [showModal, setShowModal] = useState(false);
  const [pendingRole, setPendingRole] =
    useState<'landlord' | 'agent' | 'caretaker' | null>(null);

  const [hasLandlord, setHasLandlord] = useState(false);
  const [hasCaretaker, setHasCaretaker] = useState(false);

  const selectedListingType = useWatch({ control, name: 'listingType' });

  const inputClasses =
    'w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-[#111811] focus:border-brand-green focus:ring-1 outline-none transition-all placeholder:text-gray-400 shadow-sm';

  const labelClasses =
    'block text-sm font-bold text-[#111811] mb-2';

  const cardClasses =
    'bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8';

  useEffect(() => {
    if (activeRole === 'agent' && draftData.agent) {
      setValue('agencyName', draftData.agent.agencyName || '');
      setValue('agentLicense', draftData.agent.licenseNumber || '');
    }
  }, [activeRole, draftData, setValue]);

  const isRoleOnboarded =
    activeRole ? roleOnboardingCompleted[activeRole] : false;

  return (
    <>
      <RoleSwitchModal
        isOpen={showModal}
        targetRole={pendingRole || ''}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          if (pendingRole) setActiveRole(pendingRole);
          setShowModal(false);
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* MAIN COLUMN */}
        <div className="lg:col-span-2">
          {/* ROLE BANNER */}
          <div className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm border-l-4 border-l-brand-green mb-8">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-green-50 flex items-center justify-center text-brand-green">
                {activeRole === 'agent' ? (
                  <MdOutlineRealEstateAgent size={28} />
                ) : (
                  <MdOutlineVilla size={28} />
                )}
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Active Perspective
                </p>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  Listing as{' '}
                  <span className="capitalize text-brand-green">
                    {activeRole}
                  </span>
                  {isRoleOnboarded && (
                    <HiOutlineCheckBadge className="text-brand-green" />
                  )}
                </h3>
              </div>
            </div>
          </div>

          {/* PROFESSIONAL CONTEXT */}
          <section className={cardClasses}>
            <h3 className="text-xl font-bold mb-1">
              Professional Context
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Details required for{' '}
              <span className="text-brand-green font-medium">
                {activeRole}
              </span>{' '}
              listings
            </p>

            {activeRole === 'agent' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>
                    Agency Name
                  </label>
                  <input
                    {...register('agencyName')}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>
                    Agent License No.
                  </label>
                  <input
                    {...register('agentLicense')}
                    className={inputClasses}
                  />
                </div>
              </div>
            )}
          </section>

          {/* LISTING DETAILS */}
          <section className={cardClasses}>
            <h3 className="text-xl font-bold mb-6">
              Listing Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div>
                <label className={labelClasses}>
                  Property Title
                </label>
                <input
                  {...register('title')}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>
                  Community / Contact Link
                </label>
                <input
                  {...register('communityLink')}
                  className={inputClasses}
                />
                {errors.communityLink && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.communityLink.message}
                  </p>
                )}
              </div>
            </div>

            {/* LISTING TYPE */}
            <label className={labelClasses}>Listing Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { id: 'Rent', label: 'For Rent', icon: HiOutlineHome },
                { id: 'Sale', label: 'For Sale', icon: MdOutlineBusinessCenter },
                { id: 'Service-Apartment', label: 'Short Let', icon: MdOutlineHotel },
                { id: 'Rent-to-Own', label: 'Rent to Own', icon: MdOutlineKey }
              ].map((type) => (
                <label key={type.id} className="cursor-pointer">
                  <input
                    {...register('listingType')}
                    type="radio"
                    value={type.id}
                    className="sr-only peer"
                    onChange={() => {
                      setValue('listingType', type.id as any);
                      setValue('propertyType', '');
                    }}
                  />
                  <div className="p-4 border rounded-xl text-center peer-checked:border-brand-green peer-checked:bg-green-50">
                    <type.icon className="mx-auto mb-2 text-xl" />
                    <span className="text-xs font-bold">
                      {type.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {/* PROPERTY TYPE */}
            {selectedListingType && (
              <>
                <label className={labelClasses}>
                  Property Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {(PROPERTY_TYPES_BY_LISTING[selectedListingType] || []).map(
                    (type) => (
                      <label key={type} className="cursor-pointer">
                        <input
                          {...register('propertyType')}
                          type="radio"
                          value={type}
                          className="sr-only peer"
                        />
                        <div className="p-3 border rounded-xl peer-checked:border-brand-green peer-checked:bg-green-50">
                          <span className="text-xs font-bold">
                            {type}
                          </span>
                        </div>
                      </label>
                    )
                  )}
                </div>
              </>
            )}
          </section>
        </div>

        {/* SIDEBAR */}
        <div>
          <div className="bg-[#00421F] text-white p-6 rounded-2xl shadow-lg">
            <h4 className="font-bold mb-4">Onboarding Tip</h4>
            <p className="text-sm">
              You are listing as a{' '}
              <strong className="capitalize">
                {activeRole}
              </strong>
              . Ensure your details are accurate.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

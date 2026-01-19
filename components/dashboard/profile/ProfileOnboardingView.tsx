'use client';

import React from 'react';
import { useUserStore, Role, DeveloperProfileData, InvestorProfileData, AgentProfileData } from '@/store/userStore';
import {
    HiOutlineHome,
    HiOutlineMapPin,
    HiOutlineBanknotes,
    HiOutlineCreditCard,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineMagnifyingGlass,
    HiOutlineSparkles
} from 'react-icons/hi2';

export default function ProfileOnboardingView() {
    const { roleData, activeRole } = useUserStore();

    if (!activeRole || !roleData[activeRole as keyof typeof roleData]) {
        return (
            <div className="p-8 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">No onboarding data available for this role.</p>
            </div>
        );
    }

    const data = roleData[activeRole as keyof typeof roleData];

    const renderTenantData = () => {
        const tenant = data as any;
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DataCard icon={<HiOutlineMapPin />} label="Preferred Location" value={tenant.preferredLocation || 'Not specified'} />
                <DataCard icon={<HiOutlineBanknotes />} label="Budget Range" value={tenant.budgetRange || 'Not specified'} />
                <DataCard icon={<HiOutlineHome />} label="Property Type" value={tenant.propertyType || 'Not specified'} />
                <DataCard icon={<HiOutlineCalendarDays />} label="Move-in Date" value={tenant.moveInDate || 'Not specified'} />
                {tenant.employmentStatus && (
                    <div className="md:col-span-2 p-6 bg-brand-green/5 rounded-2xl border border-brand-green/10">
                        <div className="flex items-center gap-3 mb-4">
                            <HiOutlineBriefcase className="text-brand-green" size={20} />
                            <h4 className="font-bold text-gray-900">Employment Insights</h4>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">Status</p>
                                <p className="font-bold text-gray-700">{tenant.employmentStatus}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400">Monthly Salary</p>
                                <p className="font-bold text-gray-700">{tenant.monthlySalary || 'Private'}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderLandlordData = () => {
        const landlord = data as any;
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DataCard icon={<HiOutlineSparkles />} label="Portfolio Size" value={`${landlord.propertyCount || 0} Properties`} />
                <DataCard icon={<HiOutlineBriefcase />} label="Experience" value={landlord.experience || 'Not specified'} />
                <div className="md:col-span-2 p-6 bg-orange-50 rounded-2xl border border-orange-100">
                    <h4 className="text-[10px] font-black uppercase text-orange-600 mb-3 tracking-widest">Property Interests</h4>
                    <div className="flex flex-wrap gap-2">
                        {landlord.propertyTypes?.map((type: string) => (
                            <span key={type} className="px-3 py-1.5 bg-white rounded-xl text-xs font-bold text-gray-700 border border-orange-200">
                                {type}
                            </span>
                        )) || 'None listed'}
                    </div>
                </div>
            </div>
        );
    };

    const renderDeveloperData = () => {
        const developer = data as DeveloperProfileData;
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DataCard icon={<HiOutlineSparkles />} label="Company Name" value={developer.companyName || 'Not specified'} />
                <DataCard icon={<HiOutlineBriefcase />} label="Registration No" value={developer.registrationNumber || 'Not specified'} />
                <DataCard icon={<HiOutlineCalendarDays />} label="Experience" value={`${developer.yearsExperience || 0} years`} />
                <DataCard icon={<HiOutlineHome />} label="Completed Projects" value={developer.completedProjects || '0'} />
                <div className="md:col-span-2 p-6 bg-brand-green/5 rounded-2xl border border-brand-green/10">
                    <h4 className="text-[10px] font-black uppercase text-brand-green mb-3 tracking-widest">Specialization</h4>
                    <div className="flex flex-wrap gap-2">
                        {developer.specialization?.map((spec: string) => (
                            <span key={spec} className="px-3 py-1.5 bg-white rounded-xl text-xs font-bold text-gray-700 border border-brand-green/20">
                                {spec}
                            </span>
                        )) || 'None listed'}
                    </div>
                </div>
            </div>
        );
    };

    const renderInvestorData = () => {
        const investor = data as InvestorProfileData;
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DataCard icon={<HiOutlineBriefcase />} label="Investor Type" value={investor.investorType || 'Individual'} />
                <DataCard icon={<HiOutlineBanknotes />} label="Investment Budget" value={investor.investmentBudget || 'Not specified'} />
                <DataCard icon={<HiOutlineCalendarDays />} label="Risk Tolerance" value={investor.riskTolerance || 'Medium'} />
                <div className="md:col-span-2 p-6 bg-purple-50 rounded-2xl border border-purple-100">
                    <h4 className="text-[10px] font-black uppercase text-purple-600 mb-3 tracking-widest">Preferred Categories</h4>
                    <div className="flex flex-wrap gap-2">
                        {investor.preferredCategories?.map((cat: string) => (
                            <span key={cat} className="px-3 py-1.5 bg-white rounded-xl text-xs font-bold text-gray-700 border border-purple-200">
                                {cat}
                            </span>
                        )) || 'Not specified'}
                    </div>
                </div>
            </div>
        );
    };

    const renderAgentData = () => {
        const agent = data as AgentProfileData;
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DataCard icon={<HiOutlineSparkles />} label="Agency Name" value={agent.agencyName || 'Independent'} />
                <DataCard icon={<HiOutlineBriefcase />} label="Experience" value={`${agent.yearsExperience || 0} years`} />
                <DataCard icon={<HiOutlineCreditCard />} label="License Number" value={agent.licenseNumber || 'Not provided'} />
                <div className="md:col-span-2 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <h4 className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-widest">Specialization & Areas</h4>
                    <div className="flex flex-wrap gap-2">
                        {agent.specialization?.map((spec: string) => (
                            <span key={spec} className="px-3 py-1.5 bg-white rounded-xl text-xs font-bold text-gray-700 border border-blue-200">
                                {spec}
                            </span>
                        )) || 'No specialization listed'}
                        {agent.areasServed?.map((area: string) => (
                            <span key={area} className="px-3 py-1.5 bg-blue-100/50 rounded-xl text-xs font-bold text-blue-700 border border-blue-200">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                    <HiOutlineMagnifyingGlass size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Onboarding Insights</h3>
                    <p className="text-sm text-gray-500">Preferences and data captured during setup.</p>
                </div>
            </div>

            {activeRole === 'tenant' && renderTenantData()}
            {activeRole === 'landlord' && renderLandlordData()}
            {activeRole === 'agent' && renderAgentData()}
            {activeRole === 'developer' && renderDeveloperData()}
            {activeRole === 'investor' && renderInvestorData()}
            {activeRole === 'caretaker' && (
                <div className="p-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Data processing for this role is coming soon.</p>
                </div>
            )}
        </div>
    );
}

function DataCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex items-start gap-4">
                <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-green/10 group-hover:text-brand-green transition-colors shrink-0">
                    {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 20 })}
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                    <p className="font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );
}

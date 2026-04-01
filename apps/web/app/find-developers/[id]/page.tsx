'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HiCheckCircle, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineGlobe, HiOutlineShare, HiOutlineAtSymbol } from 'react-icons/hi';
import { MdVerified, MdApartment, MdHistoryEdu, MdStar, MdCall, MdMail, MdMap, MdPublic } from 'react-icons/md';
import FadeIn from '@/components/FadeIn';
import { useUserStore } from '@/store/userStore';
import InvestmentDetailsModal from '@/components/dashboard/investor/InvestmentDetailsModal';
import ContactDeveloperModal from '@/components/ContactDeveloperModal';
import { getDeveloperById } from '@/utils/properties';


export default function DeveloperPortfolioPage() {
  const params = useParams();
  const router = useRouter();
  const developerId = params.id as string;
  const developer = getDeveloperById(developerId);

  const { token, activeRole } = useUserStore();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  if (!developer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Developer Not Found</h1>
          <p className="text-gray-500 mb-6">The developer you're looking for doesn't exist.</p>
          <Link href="/find-developers" className="text-brand-green font-bold hover:underline">
            ← Back to Developers
          </Link>
        </div>
      </div>
    );
  }

  const handleInvestClick = (project: any) => {
    // Check authentication status
    if (!token) {
      // Not logged in at all - redirect to signup
      router.push('/signup');
      return;
    }

    // Check if user is an investor
    if (activeRole === 'investor') {
      // Open investment modal
      setSelectedProject(project);
      setShowInvestModal(true);
    } else {
      // User is logged in but not as investor
      alert('Investment feature is only available for investor accounts. Please switch to investor role or create an investor account.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
          <Link href="/find-developers" className="text-brand-green font-bold text-sm hover:underline mb-4 inline-block">
            ← Back to All Developers
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10 space-y-12">
        {/* Identity Header Section */}
        <FadeIn>
          <section className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="relative group">
              <div className="w-40 h-40 rounded-2xl bg-white shadow-sm border border-gray-100 p-4 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={developer.logo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&h=200&auto=format&fit=crop'}
                    alt={developer.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              {developer.verified && (
                <div className="absolute -bottom-3 -right-3 bg-white p-1 rounded-full border border-gray-100 shadow-sm">
                  <MdVerified className="text-brand-green text-3xl" />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">{developer.name}</h1>
                {developer.verified && (
                  <span className="flex items-center gap-1 bg-green-50 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <HiCheckCircle className="text-sm" />
                    Verified Developer
                  </span>
                )}
              </div>

              <div className="max-w-2xl">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {developer.description}
                </p>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="bg-brand-green text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-green-600 transition-all"
                >
                  Inquire Now
                </button>
                <button className="bg-white border border-gray-200 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
                  Follow
                </button>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Stats Section */}
        <FadeIn delay={0.1}>
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col items-center text-center shadow-sm">
              <MdApartment className="text-brand-green mb-3 text-4xl" />
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Projects</p>
              <p className="text-4xl font-black mt-1">{developer.totalProjects}+</p>
            </div>
            <div className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col items-center text-center shadow-sm">
              <MdHistoryEdu className="text-brand-green mb-3 text-4xl" />
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Years Active</p>
              <p className="text-4xl font-black mt-1">{developer.yearsActive}</p>
            </div>
            <div className="bg-white border border-gray-100 p-8 rounded-2xl flex flex-col items-center text-center shadow-sm">
              <MdStar className="text-brand-green mb-3 text-4xl" />
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Avg Rating</p>
              <p className="text-4xl font-black mt-1">{developer.rating}<span className="text-lg text-gray-400">/5</span></p>
            </div>
          </section>
        </FadeIn>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-10">
          {/* Left: Featured Projects */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-bold">Investment Opportunities</h2>
              <span className="text-brand-green text-sm font-bold">{developer.projects.length} projects available</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {developer.projects.map((project, index) => (
                <FadeIn key={project.id} delay={0.1 * index}>
                  <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      <div className="relative w-full h-full">
                        <Image
                          src={project.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop'}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold group-hover:text-brand-green transition-colors mb-1">
                          {project.title}
                        </h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <HiOutlineLocationMarker className="text-sm" /> {project.location}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-brand-green font-bold text-lg">
                          ₦{(project.totalValue / 1000000).toFixed(1)}M
                        </p>
                        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium">
                          {project.status}
                        </span>
                      </div>

                      {project.investmentCondition && (
                        <div className="pt-4 border-t border-gray-50 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Expected ROI</span>
                            <span className="font-bold text-brand-green">{project.investmentCondition.expectedROI}% ROI</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Timeline</span>
                            <span className="font-bold">{project.investmentCondition.timeline} Months</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Min. Investment</span>
                            <span className="font-bold">₦{(project.investmentCondition.minAmount / 1000000).toFixed(1)}M</span>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => handleInvestClick(project)}
                        className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-all"
                      >
                        Invest Now
                      </button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: Sidebar Contact Info */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm space-y-6 sticky top-24">
              <h3 className="text-xl font-bold border-b border-gray-100 pb-3">Contact Details</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <MdCall className="text-brand-green text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Phone</p>
                    <p className="text-sm font-semibold">{developer.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <MdMail className="text-brand-green text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Email</p>
                    <p className="text-sm font-semibold break-all">{developer.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <MdMap className="text-brand-green text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Office</p>
                    <p className="text-sm font-semibold">{developer.office}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold mb-4 tracking-wider">Social Channels</p>
                <div className="flex gap-4">
                  <a className="size-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-50 hover:border-brand-green transition-colors" href="#">
                    <MdPublic className="text-lg" />
                  </a>
                  <a className="size-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-50 hover:border-brand-green transition-colors" href="#">
                    <HiOutlineShare className="text-lg" />
                  </a>
                  <a className="size-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-green-50 hover:border-brand-green transition-colors" href="#">
                    <HiOutlineAtSymbol className="text-lg" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
              <h4 className="font-bold text-lg mb-2">Work with us</h4>
              <p className="text-sm text-gray-600 mb-4">
                Are you an investor or looking for your next dream home? Let's discuss your requirements.
              </p>
              <button className="w-full bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-all shadow-lg">
                Schedule a Consultation
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Investment Modal */}
      {selectedProject && (
        <InvestmentDetailsModal
          isOpen={showInvestModal}
          onClose={() => {
            setShowInvestModal(false);
            setSelectedProject(null);
          }}
          property={selectedProject}
        />
      )}

      {/* Contact Developer Modal */}
      <ContactDeveloperModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        developerName={developer.name}
        developerEmail={developer.email}
      />
    </div>
  );
}

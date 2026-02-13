'use client';

import React, { useState } from 'react';
import { MdClose, MdSend, MdPerson, MdMail, MdPhone, MdMessage } from 'react-icons/md';

interface ContactDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  developerName: string;
  developerEmail?: string;
}

export default function ContactDeveloperModal({ 
  isOpen, 
  onClose, 
  developerName,
  developerEmail 
}: ContactDeveloperModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Here you would typically send the data to your backend
    console.log('Contact form submitted:', {
      ...formData,
      developer: developerName,
      developerEmail
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Developer</h2>
            <p className="text-sm text-gray-500 mt-1">
              Get in touch with <span className="font-semibold text-brand-green">{developerName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdSend className="text-3xl text-brand-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">
                The developer will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MdPerson className="text-xl" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MdMail className="text-xl" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    placeholder="johndoe@example.com"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <MdPhone className="text-xl" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-400">
                    <MdMessage className="text-xl" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-none"
                    placeholder="Tell us about your project requirements, investment goals, or any questions you have..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <MdSend className="text-xl" />
                      Send Message
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to be contacted by the developer regarding your inquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

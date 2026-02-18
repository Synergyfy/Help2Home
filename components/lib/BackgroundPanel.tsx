"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * BackgroundPanel - A flexible wrapper for background images with overlay and content
 */
export interface BackgroundPanelProps {
  /** URL of the background image */
  backgroundImage?: string | null;

  /** Classes for the outer container */
  containerClassName?: string;

  /** Classes for the background image */
  imageClassName?: string;

  /** Classes for the gradient overlay */
  overlayClassName?: string | null;

  /** Classes for the content wrapper */
  contentClassName?: string;

  /** Any content to render over the background */
  children?: React.ReactNode;

  /** Whether to apply fade-in animation */
  animate?: boolean;
}

export default function BackgroundPanel({
  backgroundImage,
  containerClassName = "hidden md:flex w-[55%] relative overflow-hidden",
  imageClassName = "w-full h-full object-cover object-center",
  overlayClassName = "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent",
  contentClassName = "absolute inset-0 flex items-center justify-center p-8",
  children,
  animate = true,
}: BackgroundPanelProps) {
  const content = (
    <>
      {/* Background Image */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Background"
          className={imageClassName}
        />
      )}

      {/* Overlay */}
      {overlayClassName && <div className={overlayClassName} />}

      {/* Content */}
      {children && <div className={contentClassName}>{children}</div>}
    </>
  );

  return (
    <div className={containerClassName}>
      {animate ? (
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {content}
        </motion.div>
      ) : (
        <div className="absolute inset-0 w-full h-full">{content}</div>
      )}
    </div>
  );
}

/* =========================================================
   Example Usage Components
   ========================================================= */

/* Example 1: Simple text content */
export function SimpleExample(): JSX.Element {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full md:w-[45%] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8">Sign In</h2>
          <p className="text-gray-600">Your login form here...</p>
        </div>
      </div>

      <BackgroundPanel backgroundImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800">
        <div className="text-center">
          <h2 className="text-white text-4xl font-bold mb-4 drop-shadow-lg">
            AI-Powered Research
          </h2>
          <p className="text-gray-200 text-lg drop-shadow-md">
            Transform your workflow with intelligent insights
          </p>
        </div>
      </BackgroundPanel>
    </div>
  );
}

/* Example 2: Custom positioned content */
export function CustomPositionExample(): JSX.Element {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full md:w-[45%] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
          <p className="text-gray-600">Your signup form here...</p>
        </div>
      </div>

      <BackgroundPanel
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
        contentClassName="absolute bottom-12 left-12 p-8"
        overlayClassName="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-black/50 to-transparent"
      >
        <div className="max-w-md">
          <h2 className="text-white text-5xl font-bold mb-4">Join Us Today</h2>
          <p className="text-gray-200 text-xl mb-6">
            Start your journey with powerful AI tools
          </p>
          <ul className="space-y-3 text-white">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-white rounded-full" />
              Real-time collaboration
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-white rounded-full" />
              Advanced analytics
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-white rounded-full" />
              Secure data storage
            </li>
          </ul>
        </div>
      </BackgroundPanel>
    </div>
  );
}

/* Example 3: Complex custom component */
export function ComplexExample(): JSX.Element {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full md:w-[45%] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8">Welcome Back</h2>
          <p className="text-gray-600">Your form here...</p>
        </div>
      </div>

      <BackgroundPanel
        backgroundImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
        contentClassName="absolute inset-0 flex flex-col justify-between p-12"
      >
        {/* Top */}
        <div className="text-white">
          <h3 className="text-2xl font-semibold mb-2">Welcome to</h3>
          <h2 className="text-5xl font-bold">Research Hub</h2>
        </div>

        {/* Middle */}
        <div className="text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-white text-3xl font-bold mb-4">
              10,000+ Researchers
            </h3>
            <p className="text-gray-200">Trust our platform for their work</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex gap-4 justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
            <p className="text-white text-2xl font-bold">500K+</p>
            <p className="text-gray-300 text-sm">Projects</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
            <p className="text-white text-2xl font-bold">98%</p>
            <p className="text-gray-300 text-sm">Satisfaction</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
            <p className="text-white text-2xl font-bold">24/7</p>
            <p className="text-gray-300 text-sm">Support</p>
          </div>
        </div>
      </BackgroundPanel>
    </div>
  );
}

/* Example 4: No image, gradient-only background */
export function ColoredBackgroundExample(): JSX.Element {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full md:w-[45%] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8">Get Started</h2>
        </div>
      </div>

      <BackgroundPanel
        backgroundImage={null}
        overlayClassName="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
        contentClassName="absolute inset-0 flex items-center justify-center p-12"
      >
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-white text-4xl">🚀</span>
          </div>
          <h2 className="text-white text-4xl font-bold">
            Launch Your Research
          </h2>
          <p className="text-white/90 text-lg max-w-md mx-auto">
            Everything you need to conduct groundbreaking research
          </p>
        </div>
      </BackgroundPanel>
    </div>
  );
}

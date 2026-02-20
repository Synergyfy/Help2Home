'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineCamera,
    HiOutlineCheckCircle,
    HiOutlineArrowPath,
    HiOutlineShieldCheck,
    HiOutlineExclamationTriangle,
    HiOutlineUser
} from 'react-icons/hi2';
import { toast } from 'react-toastify';

interface LivenessCaptureProps {
    onCapture: (image: string) => void;
    status: 'pending' | 'verified' | 'failed' | 'in_review';
}

export default function LivenessCapture({ onCapture, status }: LivenessCaptureProps) {
    const [isCapturing, setIsCapturing] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'user' },
                audio: false 
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setIsCapturing(true);
        } catch (err) {
            console.error("Error accessing camera:", err);
            toast.error("Could not access camera. Please ensure permissions are granted.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCapturing(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                const imageData = canvasRef.current.toDataURL('image/jpeg');
                setCapturedImage(imageData);
                stopCamera();
            }
        }
    };

    const handleRetake = () => {
        setCapturedImage(null);
        startCamera();
    };

    const handleConfirm = () => {
        if (capturedImage) {
            onCapture(capturedImage);
            toast.success("Selfie captured successfully!");
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, [stream]);

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Liveness / Selfie Verification</h3>
                    <p className="text-sm text-gray-500">Take a live photo of yourself to verify your identity.</p>
                </div>
                {status === 'verified' ? (
                    <div className="flex items-center gap-1 text-green-600 font-bold text-xs uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
                        <HiOutlineShieldCheck size={16} />
                        Verified
                    </div>
                ) : status === 'in_review' ? (
                    <div className="flex items-center gap-1 text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">
                        <HiOutlineArrowPath size={16} className="animate-spin" />
                        In Review
                    </div>
                ) : null}
            </div>

            <div className="p-8 flex flex-col items-center">
                <div className="relative w-full max-w-sm aspect-square rounded-[3rem] overflow-hidden bg-gray-900 border-8 border-gray-50 shadow-inner flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!isCapturing && !capturedImage ? (
                            <motion.div 
                                key="start"
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                className="text-center p-6"
                            >
                                <div className="size-20 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 mx-auto mb-4 border border-gray-700">
                                    <HiOutlineUser size={40} />
                                </div>
                                <p className="text-gray-400 text-sm mb-6">Position your face within the frame in a well-lit area.</p>
                                <button 
                                    onClick={startCamera}
                                    className="px-8 py-3 bg-brand-green text-white rounded-2xl font-black text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-900/20 active:scale-95 flex items-center gap-2 mx-auto"
                                >
                                    <HiOutlineCamera size={20} />
                                    Start Capture
                                </button>
                            </motion.div>
                        ) : isCapturing ? (
                            <motion.div 
                                key="video"
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                className="w-full h-full relative"
                            >
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    playsInline 
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                                <div className="absolute inset-0 border-[3rem] border-black/40 pointer-events-none">
                                    <div className="w-full h-full border-2 border-brand-green/50 rounded-full"></div>
                                </div>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                                    <button 
                                        onClick={capturePhoto}
                                        className="size-16 bg-white rounded-full border-4 border-brand-green shadow-xl active:scale-90 transition-transform flex items-center justify-center"
                                    >
                                        <div className="size-10 bg-brand-green rounded-full"></div>
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="preview"
                                initial={{ opacity: 0, scale: 1.1 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0 }}
                                className="w-full h-full relative"
                            >
                                <img 
                                    src={capturedImage!} 
                                    alt="Captured" 
                                    className="w-full h-full object-cover scale-x-[-1]"
                                />
                                <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-between gap-4">
                                    <button 
                                        onClick={handleRetake}
                                        className="flex-1 py-3 bg-black/60 backdrop-blur-md text-white rounded-xl text-xs font-bold hover:bg-black/80 transition-all flex items-center justify-center gap-2"
                                    >
                                        <HiOutlineArrowPath size={16} />
                                        Retake
                                    </button>
                                    <button 
                                        onClick={handleConfirm}
                                        className="flex-1 py-3 bg-brand-green text-white rounded-xl text-xs font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <HiOutlineCheckCircle size={16} />
                                        Confirm
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="flex flex-col items-center text-center">
                        <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mb-2">1</div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Good Lighting</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mb-2">2</div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Face Forward</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mb-2">3</div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">No Glasses/Hats</p>
                    </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-start gap-3">
                <HiOutlineExclamationTriangle className="text-amber-500 shrink-0" size={20} />
                <p className="text-[10px] text-gray-500 leading-relaxed">
                    <strong>Note:</strong> We use advanced biometric analysis to compare your live selfie with your provided identification documents. This process is automated and usually takes less than 2 minutes.
                </p>
            </div>
        </div>
    );
}

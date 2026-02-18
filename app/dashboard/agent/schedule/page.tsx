'use client';

import React from 'react';
import {
    HiOutlineCalendarDays,
    HiOutlineClock,
    HiOutlineMapPin,
    HiOutlinePhone,
    HiOutlinePlus,
    MdAccessTime
} from '@/components/shared/Icons';
import RescheduleModal from '@/components/dashboard/agent/RescheduleModal';

interface ScheduleItem {
    id: number;
    client: string;
    property: string;
    time: string;
    date: string;
    type: string;
}

const initialSchedule: ScheduleItem[] = [
    { id: 1, client: 'Princewill Amadi', property: 'Skyline Terrace - Apt 4B', time: '10:30 AM', date: 'Dec 31', type: 'Initial Viewing' },
    { id: 2, client: 'Fatima Lawal', property: 'Palm Grove Villa', time: '02:00 PM', date: 'Jan 02', type: 'Final Inspection' },
];

const appointments = [
    { id: 1, client: 'Olawale Johnson', time: '10:30 AM', date: 'Tomorrow', type: 'Property Viewing' },
    { id: 2, client: 'Chidi Okafor', time: '02:00 PM', date: 'Oct 28', type: 'Virtual Consultation' },
];

export default function SchedulePage() {
    const [schedule, setSchedule] = React.useState<ScheduleItem[]>(initialSchedule);
    const [reschedulingAppt, setReschedulingAppt] = React.useState<ScheduleItem | null>(null);

    const handleReschedule = (newDate: string, newTime: string) => {
        if (!reschedulingAppt) return;

        // Formating the date for display (mock logic)
        const dateObj = new Date(newDate);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthStr = months[dateObj.getMonth()];
        const dayStr = dateObj.getDate().toString().padStart(2, '0');
        const formattedDate = `${monthStr} ${dayStr}`;

        // Convert 24h to 12h for time display
        const [hours, mins] = newTime.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        const formattedTime = `${h12}:${mins} ${ampm}`;

        setSchedule(prev => prev.map(item =>
            item.id === reschedulingAppt.id
                ? { ...item, date: formattedDate, time: formattedTime }
                : item
        ));
    };

    return (
        <div className="space-y-10 pb-12">
            <RescheduleModal
                isOpen={!!reschedulingAppt}
                onClose={() => setReschedulingAppt(null)}
                appointment={reschedulingAppt}
                onConfirm={handleReschedule}
            />
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Inspections Schedule</h1>
                    <p className="text-gray-500 font-medium">Manage your viewings and client consultations.</p>
                </div>
                <button className="flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all active:scale-95">
                    <HiOutlinePlus size={20} strokeWidth={3} />
                    Book Slot
                </button>
            </div>

            {/* Calendar Section */}
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Real Calendar Grid */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">October 2023</h3>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-50 rounded-xl transition-all">←</button>
                                <button className="p-2 hover:bg-gray-50 rounded-xl transition-all">→</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center mb-4">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                <span key={day} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{day}</span>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: 31 }).map((_, i) => {
                                const day = i + 1;
                                const isBooked = [15, 22, 28, 29].includes(day);
                                const isToday = day === 27;

                                return (
                                    <div
                                        key={i}
                                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative cursor-pointer transition-all group ${isToday ? 'bg-brand-green text-white shadow-lg shadow-green-900/20 scale-110 z-10' :
                                            isBooked ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                                'hover:bg-gray-50 text-gray-600'
                                            }`}
                                    >
                                        <span className={`text-sm font-black ${isToday ? 'text-white' : 'text-gray-900'}`}>{day}</span>
                                        {isBooked && !isToday && (
                                            <div className="size-1.5 rounded-full bg-blue-500 mt-1" />
                                        )}

                                        {/* Hover Tooltip */}
                                        {isBooked && (
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-gray-900 text-white text-[10px] p-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-20">
                                                <p className="font-black">Booked Slot</p>
                                                <p className="text-gray-400">Tap to see details</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Today's Outlook & Quick View */}
                    <div className="space-y-6">
                        <div className="bg-brand-green text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden shadow-green-900/20">
                            <div className="relative z-10">
                                <h4 className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Today&apos;s Focus</h4>
                                <p className="text-2xl font-black">0 Pending Viewings</p>
                                <p className="text-xs text-white/70 mt-2 font-medium">Your schedule is clear for today. Use this time to follow up on leads.</p>
                            </div>
                            <div className="absolute -bottom-10 -right-10 size-32 bg-white/10 rounded-full blur-2xl" />
                        </div>

                        <div>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-4">Up Next</h3>
                            <div className="space-y-4">
                                {appointments.map((apt) => (
                                    <div key={apt.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                        <div className="flex gap-4 items-center">
                                            <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shrink-0">
                                                <HiOutlineCalendarDays size={24} />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-black text-gray-900 truncate text-sm">{apt.client}</h4>
                                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{apt.date} • {apt.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* List View */}
            <section>
                <h2 className="text-xl font-black text-gray-900 mb-6">Upcoming Inspections</h2>
                <div className="grid grid-cols-1 gap-4">
                    {schedule.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-all group">
                            <div className="flex gap-6 items-center">
                                <div className="bg-gray-50 p-4 rounded-3xl flex flex-col items-center justify-center min-w-[80px] border border-gray-100 group-hover:bg-brand-green group-hover:text-white transition-all">
                                    <span className="text-[10px] font-black text-gray-400 group-hover:text-white/60 uppercase tracking-widest leading-none mb-1">{item.date.split(' ')[0]}</span>
                                    <span className="text-2xl font-black leading-none">{item.date.split(' ')[1]}</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 text-lg">{item.client}</h3>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <p className="text-sm text-gray-500 font-bold flex items-center gap-1.5">
                                            <HiOutlineMapPin className="text-brand-green" /> {item.property}
                                        </p>
                                        <div className="flex gap-3">
                                            <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest">
                                                <MdAccessTime size={14} /> {item.time}
                                            </span>
                                            <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 border-t md:border-0 pt-6 md:pt-0">
                                <button
                                    onClick={() => setReschedulingAppt(item)}
                                    className="flex-1 md:flex-none px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Reschedule
                                </button>
                                <button className="size-12 bg-brand-green text-white rounded-2xl flex items-center justify-center hover:bg-green-700 transition-all shadow-lg shadow-green-900/20 active:scale-95">
                                    <HiOutlinePhone size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

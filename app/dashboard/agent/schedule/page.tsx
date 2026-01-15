'use client';

import React from 'react';
import { MdEvent, MdAccessTime, MdLocationOn, MdPhone } from 'react-icons/md';

const schedule = [
    { id: 1, client: 'Princewill Amadi', property: 'Skyline Terrace - Apt 4B', time: '10:30 AM', date: 'Dec 31', type: 'Initial Viewing' },
    { id: 2, client: 'Fatima Lawal', property: 'Palm Grove Villa', time: '02:00 PM', date: 'Jan 02', type: 'Final Inspection' },
];

export default function SchedulePage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Inspections</h1>
                <button className="bg-brand-green text-white px-4 py-2 rounded-xl text-sm font-bold">Book Slot</button>
            </div>

            <div className="space-y-4">
                {schedule.map((item) => (
                    <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center justify-center min-w-[70px] border border-gray-100">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">{item.date.split(' ')[0]}</span>
                                <span className="text-xl font-black text-gray-900">{item.date.split(' ')[1]}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{item.client}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                    <MdLocationOn className="text-brand-green" /> {item.property}
                                </p>
                                <div className="flex gap-3 mt-2">
                                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md flex items-center gap-1">
                                        <MdAccessTime /> {item.time}
                                    </span>
                                    <span className="text-[10px] font-bold bg-gray-50 text-gray-500 px-2 py-1 rounded-md">
                                        {item.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 border-t md:border-0 pt-4 md:pt-0">
                            <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">Reschedule</button>
                            <button className="p-2.5 bg-brand-green text-white rounded-xl hover:bg-green-700 transition-all"><MdPhone size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client';

import React, { useState, useMemo } from 'react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    eachDayOfInterval,
    parse
} from 'date-fns';
import {
    HiOutlineCalendarDays,
    HiOutlineClock,
    HiOutlineMapPin,
    HiOutlinePhone,
    HiOutlinePlus,
    HiOutlineInformationCircle
} from 'react-icons/hi2';
import { MdAccessTime } from 'react-icons/md';
import RescheduleModal from '@/components/dashboard/agent/RescheduleModal';
import AgentBookingModal from '@/components/dashboard/agent/AgentBookingModal';
import InspectionDetailsModal, { Inspection } from '@/components/dashboard/agent/InspectionDetailsModal';

interface ScheduleItem extends Inspection {
    id: number;
    client: string;
    property: string;
    time: string;
    date: string;
    type: string;
    fullDate?: string; // YYYY-MM-DD
}

const initialSchedule: ScheduleItem[] = [
    { 
        id: 1, 
        client: 'Princewill Amadi', 
        name: 'Princewill Amadi',
        property: 'Skyline Terrace - Apt 4B', 
        prop: 'Skyline Terrace - Apt 4B',
        time: '10:30 AM', 
        date: format(new Date(), 'MMM dd'), 
        day: format(new Date(), 'dd'),
        month: format(new Date(), 'MMM'),
        type: 'Initial Viewing',
        email: 'princewill@example.com',
        phone: '+234 803 000 1111',
        location: '123 Admiralty Way, Lekki',
        status: 'Confirmed'
    },
    { 
        id: 2, 
        client: 'Fatima Lawal', 
        name: 'Fatima Lawal',
        property: 'Palm Grove Villa', 
        prop: 'Palm Grove Villa',
        time: '02:00 PM', 
        date: format(addDays(new Date(), 2), 'MMM dd'), 
        day: format(addDays(new Date(), 2), 'dd'),
        month: format(addDays(new Date(), 2), 'MMM'),
        type: 'Final Inspection',
        email: 'fatima.l@example.com',
        phone: '+234 809 222 3333',
        location: 'Palm Grove Estate, Ikeja',
        status: 'Pending'
    },
];

export default function SchedulePage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule);
    
    const [reschedulingAppt, setReschedulingAppt] = useState<ScheduleItem | null>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);

    // Calendar logic
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const dayAppointments = useMemo(() => {
        return schedule.filter(apt => {
            // Check if the appointment date matches selectedDate
            // We need a robust check. Let's use isSameDay with parsed dates if needed
            // For mock, we'll try to match the month/day string or fullDate
            if (apt.fullDate) {
                return isSameDay(new Date(apt.fullDate), selectedDate);
            }
            // Fallback for initial data which uses "MMM dd"
            const aptDate = parse(`${apt.date} ${currentMonth.getFullYear()}`, 'MMM dd yyyy', new Date());
            return isSameDay(aptDate, selectedDate);
        }).sort((a, b) => {
            // Sort by time
            return a.time.localeCompare(b.time);
        });
    }, [selectedDate, schedule]);

    const handleReschedule = (newDateStr: string, newTime: string) => {
        if (!reschedulingAppt) return;

        const dateObj = new Date(newDateStr);
        const formattedDate = format(dateObj, 'MMM dd');
        const formattedDay = format(dateObj, 'dd');
        const formattedMonth = format(dateObj, 'MMM');

        // Convert 24h to 12h for time display
        const [hours, mins] = newTime.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        const formattedTime = `${h12}:${mins} ${ampm}`;

        setSchedule(prev => prev.map(item =>
            item.id === reschedulingAppt.id
                ? { 
                    ...item, 
                    date: formattedDate, 
                    time: formattedTime, 
                    day: formattedDay, 
                    month: formattedMonth,
                    fullDate: newDateStr 
                  }
                : item
        ));
    };

    const handleNewBooking = (newBooking: any) => {
        setSchedule(prev => [...prev, {
            ...newBooking,
            name: newBooking.client,
            prop: newBooking.property,
            day: newBooking.date.split(' ')[1],
            month: newBooking.date.split(' ')[0],
            status: 'Confirmed'
        }]);
    };

    return (
        <div className="space-y-10 pb-12">
            <RescheduleModal
                isOpen={!!reschedulingAppt}
                onClose={() => setReschedulingAppt(null)}
                appointment={reschedulingAppt}
                onConfirm={handleReschedule}
            />

            <AgentBookingModal 
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onConfirm={handleNewBooking}
            />

            <InspectionDetailsModal 
                isOpen={!!selectedInspection}
                onClose={() => setSelectedInspection(null)}
                inspection={selectedInspection}
            />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Inspections Schedule</h1>
                    <p className="text-gray-500 font-medium">Manage your viewings and client consultations.</p>
                </div>
                <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all active:scale-95 w-full sm:w-auto justify-center"
                >
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
                            <h3 className="font-semibold text-gray-900 uppercase tracking-widest text-xs">
                                {format(currentMonth, 'MMMM yyyy')}
                            </h3>
                            <div className="flex gap-2">
                                <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-xl transition-all">←</button>
                                <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-xl transition-all">→</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-2 text-center mb-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <span key={day} className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{day}</span>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {calendarDays.map((day, i) => {
                                const isSelected = isSameDay(day, selectedDate);
                                const isCurrentMonth = isSameMonth(day, monthStart);
                                const isToday = isSameDay(day, new Date());
                                
                                const hasApt = schedule.some(apt => {
                                    if (apt.fullDate) return isSameDay(new Date(apt.fullDate), day);
                                    const aptDate = parse(`${apt.date} ${currentMonth.getFullYear()}`, 'MMM dd yyyy', new Date());
                                    return isSameDay(aptDate, day);
                                });

                                return (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedDate(day)}
                                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative cursor-pointer transition-all group ${
                                            isSelected ? 'ring-2 ring-brand-green ring-offset-2' : ''
                                        } ${
                                            !isCurrentMonth ? 'opacity-20' : ''
                                        } ${
                                            isToday ? 'bg-brand-green text-white shadow-lg shadow-green-900/20 scale-105 z-10' :
                                            hasApt ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                            'hover:bg-gray-50 text-gray-600'
                                        }`}
                                    >
                                        <span className={`text-sm font-semibold ${isToday ? 'text-white' : 'text-gray-900'}`}>
                                            {format(day, 'd')}
                                        </span>
                                        {hasApt && !isToday && (
                                            <div className="size-1.5 rounded-full bg-blue-500 mt-1" />
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
                                <h4 className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.2em] mb-2">Selected Day Overview</h4>
                                <p className="text-2xl font-semibold">{dayAppointments.length} Active Slots</p>
                                <p className="text-xs text-white/70 mt-2 font-medium">
                                    {dayAppointments.length > 0
                                        ? `You have ${dayAppointments.length} scheduled event(s) for ${format(selectedDate, 'MMMM do')}.`
                                        : `Your schedule is clear for ${format(selectedDate, 'MMMM do')}.`}
                                </p>
                            </div>
                            <div className="absolute -bottom-10 -right-10 size-32 bg-white/10 rounded-full blur-2xl" />
                        </div>

                        <div>
                            <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-4">
                                {isSameDay(selectedDate, new Date()) ? "Today's Agenda" : `Agenda for ${format(selectedDate, 'MMM do')}`}
                            </h3>
                            <div className="space-y-4">
                                {dayAppointments.length > 0 ? (
                                    dayAppointments.map((apt) => (
                                        <div 
                                            key={apt.id} 
                                            onClick={() => setSelectedInspection(apt)}
                                            className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                                        >
                                            <div className="flex gap-4 items-center">
                                                <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors">
                                                    <HiOutlineClock size={24} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-semibold text-gray-900 truncate text-sm">{apt.client}</h4>
                                                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">{apt.time} • {apt.type}</p>
                                                </div>
                                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <HiOutlineInformationCircle size={20} className="text-brand-green" />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200 text-center">
                                        <p className="text-xs text-gray-400 italic">No bookings for this day.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* List View */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Upcoming Inspections</h2>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{schedule.length} Total</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {schedule
                        .sort((a, b) => {
                            const dateA = a.fullDate ? new Date(a.fullDate) : parse(`${a.date} ${new Date().getFullYear()}`, 'MMM dd yyyy', new Date());
                            const dateB = b.fullDate ? new Date(b.fullDate) : parse(`${b.date} ${new Date().getFullYear()}`, 'MMM dd yyyy', new Date());
                            return dateA.getTime() - dateB.getTime();
                        })
                        .map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedInspection(item)}
                            className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-all group cursor-pointer"
                        >
                            <div className="flex gap-6 items-center">
                                <div className="bg-gray-50 p-4 rounded-3xl flex flex-col items-center justify-center min-w-[80px] border border-gray-100 group-hover:bg-brand-green group-hover:text-white transition-all">
                                    <span className="text-[10px] font-semibold text-gray-400 group-hover:text-white/60 uppercase tracking-widest leading-none mb-1">{item.month}</span>
                                    <span className="text-2xl font-semibold leading-none">{item.day}</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg group-hover:text-brand-green transition-colors">{item.client}</h3>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <p className="text-sm text-gray-500 font-semibold flex items-center gap-1.5">
                                            <HiOutlineMapPin className="text-brand-green" /> {item.property}
                                        </p>
                                        <div className="flex gap-3">
                                            <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest">
                                                <MdAccessTime size={14} /> {item.time}
                                            </span>
                                            <span className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 border-t md:border-0 pt-6 md:pt-0">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setReschedulingAppt(item);
                                    }}
                                    className="flex-1 md:flex-none px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    Reschedule
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.location.href = `tel:${item.phone || '+2348000000000'}`;
                                    }}
                                    className="size-12 bg-brand-green text-white rounded-2xl flex items-center justify-center hover:bg-green-700 transition-all shadow-lg shadow-green-900/20 active:scale-95"
                                >
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

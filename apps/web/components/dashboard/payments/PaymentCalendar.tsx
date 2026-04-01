'use client';

import React, { useState } from 'react';
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
import { IoChevronBack, IoChevronForward, IoCalendarOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { Installment, DownPaymentDetails } from './types';

interface PaymentCalendarProps {
    schedule: Installment[];
    downPayment: DownPaymentDetails | null;
}

export default function PaymentCalendar({ schedule, downPayment }: PaymentCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Combine all payments into a searchable format
    const allPayments = [
        ...(downPayment ? [{
            id: 'down-payment',
            date: parse(downPayment.dueDate, 'MMM d, yyyy', new Date()),
            amount: downPayment.amount,
            type: 'Down Payment',
            status: downPayment.isPaid ? 'Paid' : 'Pending'
        }] : []),
        ...schedule.map(item => ({
            id: item.id,
            date: parse(item.dueDate, 'MMM d, yyyy', new Date()),
            amount: item.totalDue,
            type: `Installment #${item.installmentNumber}`,
            status: item.status
        }))
    ];

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded-xl text-brand-green">
                        <IoCalendarOutline size={20} />
                    </div>
                    <h2 className="text-lg font-black text-gray-900">
                        {format(currentMonth, 'MMMM yyyy')}
                    </h2>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                    >
                        <IoChevronBack size={20} />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                    >
                        <IoChevronForward size={20} />
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <div className="grid grid-cols-7 mb-2">
                {days.map((day, i) => (
                    <div key={i} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest py-2">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const calendarDays = eachDayOfInterval({
            start: startDate,
            end: endDate,
        });

        const rows: React.ReactNode[] = [];
        let days: React.ReactNode[] = [];

        calendarDays.forEach((day, i) => {
            const paymentsOnThisDay = allPayments.filter(p => isSameDay(p.date, day));
            const hasPayment = paymentsOnThisDay.length > 0;
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, monthStart);

            days.push(
                <div
                    key={day.toString()}
                    className={`relative h-14 md:h-20 border-t border-r border-gray-50 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-50 ${
                        !isCurrentMonth ? 'text-gray-300' : 'text-gray-900'
                    } ${isSelected ? 'bg-green-50/50' : ''}`}
                    onClick={() => setSelectedDate(day)}
                >
                    <span className={`text-sm font-bold ${isSelected ? 'text-brand-green' : ''}`}>
                        {format(day, 'd')}
                    </span>
                    
                    {hasPayment && (
                        <div className="absolute bottom-2 flex gap-1">
                            {paymentsOnThisDay.map((p, idx) => (
                                <div 
                                    key={idx} 
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        p.status === 'Paid' ? 'bg-green-500' : 'bg-amber-500'
                                    }`} 
                                />
                            ))}
                        </div>
                    )}

                    {isSelected && (
                        <div className="absolute inset-0 border-2 border-brand-green rounded-sm pointer-events-none opacity-20" />
                    )}
                </div>
            );

            if ((i + 1) % 7 === 0) {
                rows.push(
                    <div className="grid grid-cols-7" key={day.toString()}>
                        {days}
                    </div>
                );
                days = [];
            }
        });

        return <div className="border-l border-b border-gray-50">{rows}</div>;
    };

    const selectedDayPayments = allPayments.filter(p => isSameDay(p.date, selectedDate));

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Calendar Grid */}
                <div className="lg:col-span-2 p-2">
                    {renderHeader()}
                    <div className="p-4">
                        {renderDays()}
                        {renderCells()}
                    </div>
                </div>

                {/* Details Sidebar */}
                <div className="bg-gray-50/50 border-l border-gray-100 p-8 flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Schedule Details</h3>
                        <p className="text-xl font-black text-gray-900">
                            {format(selectedDate, 'do MMMM, yyyy')}
                        </p>
                    </div>

                    <div className="flex-1 space-y-4">
                        {selectedDayPayments.length > 0 ? (
                            selectedDayPayments.map((payment, i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${
                                            payment.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {payment.status}
                                        </span>
                                        <span className="text-lg font-black text-gray-900">
                                            ₦{payment.amount.toLocaleString()}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-1">{payment.type}</h4>
                                    <p className="text-sm text-gray-500">Payment due by end of day</p>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-40">
                                <div className="bg-white p-4 rounded-3xl shadow-sm">
                                    <IoCalendarOutline size={32} className="text-gray-400" />
                                </div>
                                <p className="text-sm font-bold text-gray-500">No payments scheduled<br />for this date.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 p-4 bg-brand-green/5 rounded-2xl border border-brand-green/10 flex gap-3">
                        <IoInformationCircleOutline className="text-brand-green shrink-0" size={20} />
                        <p className="text-[11px] text-brand-green font-medium leading-relaxed">
                            Tip: Enable automated reminders in your settings to never miss a due date.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

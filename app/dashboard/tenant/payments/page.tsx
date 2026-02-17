'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DownPaymentSection from '@/components/dashboard/payments/DownPaymentSection';
import RepaymentSchedule from '@/components/dashboard/payments/RepaymentSchedule';
import PaymentHistory from '@/components/dashboard/payments/PaymentHistory';
import ReminderSettings from '@/components/dashboard/payments/ReminderSettings';
import PaymentCalendar from '@/components/dashboard/payments/PaymentCalendar';
import PaymentProgressBar from '@/components/dashboard/payments/PaymentProgressBar';
import { DownPaymentDetails, Installment, PaymentHistoryItem, ReminderSettings as ReminderSettingsType } from '@/components/dashboard/payments/types';
import { getPaymentData, initiatePayment, updateReminderSettings } from '@/utils/mockPaymentApi';

export default function PaymentsPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [downPayment, setDownPayment] = useState<DownPaymentDetails | null>(null);
    const [schedule, setSchedule] = useState<Installment[]>([]);
    const [history, setHistory] = useState<PaymentHistoryItem[]>([]);
    const [settings, setSettings] = useState<ReminderSettingsType | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getPaymentData();
                setDownPayment(data.downPayment);
                setSchedule(data.schedule);
                setHistory(data.history);
                setSettings(data.settings);
            } catch (error) {
                console.error("Failed to load payment data", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handlePayDownPayment = async () => {
        if (!downPayment) return;
        try {
            const result = await initiatePayment(downPayment.amount, 'Down Payment');
            if (result.success && result.redirectUrl) {
                // In a real app, we'd redirect. For demo, we'll simulate success.
                alert("Redirecting to payment gateway...");
                // Simulate successful return
                setTimeout(() => {
                    setDownPayment({ ...downPayment, isPaid: true });
                    setHistory(prev => [{
                        id: `pay_${Date.now()}`,
                        type: 'Down Payment',
                        amount: downPayment.amount,
                        date: new Date().toLocaleDateString(),
                        status: 'Success'
                    }, ...prev]);
                    alert("Down payment successful!");
                }, 2000);
            }
        } catch (error) {
            alert("Payment failed. Please try again.");
        }
    };

    const handlePayInstallment = async (id: string) => {
        const installment = schedule.find(i => i.id === id);
        if (!installment) return;

        try {
            const result = await initiatePayment(installment.totalDue, `Installment #${installment.installmentNumber}`);
            if (result.success) {
                alert("Redirecting to payment gateway...");
                setTimeout(() => {
                    setSchedule(prev => prev.map(i => i.id === id ? { ...i, status: 'Paid' } : i));
                    setHistory(prev => [{
                        id: `pay_${Date.now()}`,
                        type: `Installment #${installment.installmentNumber}`,
                        amount: installment.totalDue,
                        date: new Date().toLocaleDateString(),
                        status: 'Success'
                    }, ...prev]);
                    alert("Payment successful!");
                }, 2000);
            }
        } catch (error) {
            alert("Payment failed.");
        }
    };

    const handleDownloadReceipt = (id: string) => {
        alert("Downloading receipt PDF...");
    };

    const handleToggleReminder = async (type: 'sms' | 'email') => {
        if (!settings) return;
        const newSettings = { ...settings, [type === 'sms' ? 'smsEnabled' : 'emailEnabled']: !settings[type === 'sms' ? 'smsEnabled' : 'emailEnabled'] };
        setSettings(newSettings);
        await updateReminderSettings(newSettings);
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading payments...</div>;
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments & Billing</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <PaymentProgressBar schedule={schedule} />

                    {downPayment && (
                        <DownPaymentSection
                            details={downPayment}
                            onPay={handlePayDownPayment}
                            onViewApplication={() => router.push('/dashboard/tenant/applications')}
                        />
                    )}

                    <PaymentCalendar 
                        schedule={schedule}
                        downPayment={downPayment}
                    />

                    <RepaymentSchedule
                        schedule={schedule}
                        onPayInstallment={handlePayInstallment}
                    />

                    <PaymentHistory
                        history={history}
                        onDownloadReceipt={handleDownloadReceipt}
                    />
                </div>

                <div className="lg:col-span-1">
                    {settings && (
                        <ReminderSettings
                            settings={settings}
                            onToggle={handleToggleReminder}
                        />
                    )}

                    {/* Support Card */}
                    <div className="bg-blue-50 rounded-xl p-6 mt-6 border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2">Need help with payments?</h3>
                        <p className="text-sm text-blue-800 mb-4">
                            If you're having trouble making a payment or need to discuss a payment plan, our support team is here to help.
                        </p>
                        <Link 
                            href="/dashboard/tenant/support?view=create"
                            className="text-sm font-medium text-blue-700 hover:text-blue-900 flex items-center gap-1 w-fit"
                        >
                            Contact Support
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

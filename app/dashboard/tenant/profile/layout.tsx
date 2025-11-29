import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profile & Verification | Help2Home',
    description: 'Manage your personal details, employment, guarantor information and upload verification documents.',
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

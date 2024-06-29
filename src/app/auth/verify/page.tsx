"use client";
import dynamic from 'next/dynamic';

const DynamicVerifyEmail = dynamic(() => import('@/components/verify-email').then(mod => mod.VerifyEmail), {
    ssr: false, // Disable server-side rendering for this component
});

export default function VerifyEmailPage() {
    return (
        <main>
            <DynamicVerifyEmail />
        </main>
    );
}
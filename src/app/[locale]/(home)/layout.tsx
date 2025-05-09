import React from 'react'
import { Metadata } from 'next';
import { getMessages } from 'next-intl/server';

interface Messages {
    HomePage?: {
        Metadata?: {
            title?: string;
            description?: string;
        };
    };
}

export async function generateMetadata(): Promise<Metadata> {
    const messages = (await getMessages()) as Messages;

    const title = messages?.HomePage?.Metadata?.title || "Analytics";
    const description = messages?.HomePage?.Metadata?.description || "Analytics";

    const alternates = {
        canonical: 'https://www.qubefyn.com/analytics',
        languages: {
            ar: 'https://www.qubefyn.com/ar/analytics',
            en: 'https://www.qubefyn.com/en/analytics',
        },
    };

    return {
        title,
        description,
        alternates,
    };
}

export default function AnalyticsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        children
    );
}
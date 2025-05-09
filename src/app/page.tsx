'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {
    const router = useRouter();
    const [location, setLocation] = useState<string>('SA');
    useEffect(() => {
        const redirectBasedOnCountry = async () => {
            try {
                const response = await axios.get('https://ipv4-check-perf.radar.cloudflare.com/api/info');
                if (response.data && response.data.country) {
                    setLocation(response.data.country);
                } else {
                    setLocation('US');
                }

                const arabCountries = [
                    'SY', 'JO', 'LB', 'IQ', 'KW',
                    'OM', 'QA', 'BH', 'YE', 'LY', 'TN', 'DZ', 'MA', 'PS', 'MR', 'DJ', 'KM', 'SO'
                ];

                console.log("location: ",location);
                
                switch (location) {
                    case 'TR':
                        router.push('/tr');
                        break;
                    case 'SA':
                        router.push('/sa');
                        break;
                    case 'EG':
                        router.push('/eg');
                        break;
                    case 'AE':
                        router.push('/ae');
                        break;
                    case 'SD':
                        router.push('/sd');
                        break;
                    default:
                        if (arabCountries.includes(location)) {
                            router.push('/ar');
                        } else {
                            router.push('/en');
                        }
                }

            } catch (error) {
                console.error('Error fetching IP info:', error);
                router.push('/en');
            }
        };

        redirectBasedOnCountry();
    }, [location, router]);

    return (
        <div>
            <p>Redirecting based on your location...</p>
            <p>{location}</p>
        </div>
    );
}

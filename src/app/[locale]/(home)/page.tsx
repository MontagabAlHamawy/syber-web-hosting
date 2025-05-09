import { getTranslations } from 'next-intl/server';
import { Button } from "@/components/ui/button"

export default async function HomePage() {
    const t = await getTranslations('HomePage');
    return (
        <>
        <Button>{t('title')}</Button>
        <h1 className='text-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quo, minus veritatis veniam autem sunt assumenda! Esse, accusamus dolore aperiam blanditiis numquam quas, ab sunt magnam nemo vel sed! Ad?</h1>
        </>
    );
}
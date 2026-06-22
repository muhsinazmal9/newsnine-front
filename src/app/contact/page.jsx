import { getSettings } from '@/lib/api'

export const metadata = { title: 'যোগাযোগ' }

export default async function ContactPage() {
    const settings = await getSettings()
    const content = settings?.pages?.contact || ''

    return (
        <div className="max-w-3xl mx-auto px-4 pb-12">
            <div className="mb-6">
                <h1 className='text-2xl font-bold text-teal-900 border-b border-teal-900/50 pb-2'>যোগাযোগ</h1>
            </div>
            <div className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] p-8 space-y-4">
                <div className="text-stone-700 leading-8 text-lg whitespace-pre-line">{content}</div>
                {settings?.contact_email && (
                    <p className="text-stone-600 text-sm">
                        ইমেইলঃ <a href={`mailto:${settings.contact_email}`} className="text-teal-700 hover:underline">{settings.contact_email}</a>
                    </p>
                )}
                {settings?.contact_phone && (
                    <p className="text-stone-600 text-sm">ফোনঃ {settings.contact_phone}</p>
                )}
                {settings?.address && (
                    <p className="text-stone-600 text-sm">ঠিকানাঃ {settings.address}</p>
                )}
            </div>
        </div>
    )
}

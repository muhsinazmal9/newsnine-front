import { getSettings } from '@/lib/api'

export const metadata = { title: 'গোপনীয়তা নীতি' }

export default async function PrivacyPage() {
    const settings = await getSettings()
    const content = settings?.pages?.privacy || ''

    return (
        <div className="max-w-3xl mx-auto px-4 pb-12">
            <div className="mb-6">
                <h1 className='text-2xl font-bold text-teal-900 border-b border-teal-900/50 pb-2'>গোপনীয়তা নীতি</h1>
            </div>
            <div className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] p-8">
                <div className="text-stone-700 leading-8 text-lg whitespace-pre-line">{content}</div>
            </div>
        </div>
    )
}

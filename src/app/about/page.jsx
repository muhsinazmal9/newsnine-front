import { getSettings } from '@/lib/api'

export const metadata = { title: 'আমাদের সম্পর্কে' }

export default async function AboutPage() {
    const settings = await getSettings()
    const content = settings?.pages?.about || ''

    return (
        <div className="max-w-3xl mx-auto px-4 pb-12">
            <div className="mb-6">
                <h1 className='text-2xl font-bold text-teal-900 border-b border-teal-900/50 pb-2'>আমাদের সম্পর্কে</h1>
            </div>
            <div className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] p-8">
                <div className="text-stone-700 leading-8 text-lg whitespace-pre-line">{content}</div>
            </div>
        </div>
    )
}

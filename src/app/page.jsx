import React from 'react'
import Link from 'next/link'
import { getHome, articleUrl } from '@/lib/api'
import AdSlot from '@/components/AdSlot'

const PLACEHOLDER = 'https://placehold.co/300x200';

function Page() {
    return <PageContent />;
}

async function PageContent() {
    const data = await getHome();
    const latest = data.latest ?? [];
    const featured = (data.featured?.length ? data.featured : latest);
    const mostViewed = (data.most_viewed?.length ? data.most_viewed : latest);
    const breaking = (data.breaking?.length ? data.breaking : latest);

    const sectionBySlug = (slug) => {
        const found = data.sections?.find((s) => s.slug === slug)?.articles;
        return (found && found.length) ? found : latest;
    };

    const mainNews = featured.length ? featured : latest;
    const hero = mainNews[0];

    const jatiyo = sectionBySlug('jatiyo');
    const orthoniti = sectionBySlug('orthoniti');
    const antorjatik = sectionBySlug('antorjatik');
    const panchmishali = sectionBySlug('panchmishali');
    const probas = sectionBySlug('probas');
    const positive = sectionBySlug('positive-bangladesh');
    const ainAdalat = sectionBySlug('ain-adalat');

    const img = (news) => news?.image || PLACEHOLDER;
    const detailHref = (news) => articleUrl(news);
    const categoryHref = (news) => news?.category?.slug ? `/${news.category.slug}` : '#';

    return (
        <>
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-7 gap-4 pb-12">

                {/* News Grid */}
                <div className="col-span-3">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Single Feature News */}
                        {hero && (
                            <div className="col-span-2">
                                <div className="relative h-100 rounded-sm overflow-hidden shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition">

                                    {/* Background Image */}
                                    <img
                                        src={img(hero)}
                                        alt={hero.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    {/* Dark Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full h-[30%] bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col justify-end h-full p-4">
                                        <Link href={detailHref(hero)}>
                                            <h3 className="text-white text-3xl font-bold leading-11">
                                                {hero.title}
                                            </h3>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        )}

                        {mainNews.map((news, index) => (
                            <div key={index} className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_3px_1px_0_rgba(0,0,0,0.1)] transition">
                                <div className="relative">
                                    <img src={img(news)} alt={news.title} className="w-full h-48 object-cover" />
                                </div>
                                <div>
                                    <Link href={detailHref(news)}>
                                        <h3 className="font-bold text-stone-700 hover:text-teal-900 mb-2 py-3 px-4 transition text-lg">{news.title}</h3>
                                    </Link>
                                    <div className="p-3 border-t border-stone-200">
                                        <Link href={categoryHref(news)} className="text-teal-700 text-sm hover:text-teal-900">{news.category?.name}</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-span-2">
                    <div className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden">
                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                {latest.map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4">
                                            <img src={img(news)} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <Link href={detailHref(news)}>
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </Link>
                                            </div>
                                        </div>
                                        <hr className="border-stone-200 last:hidden" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Another Sidebar */}
                <div className="col-span-2 space-y-4">
                        <AdSlot placement="sidebar" className="bg-stone-200 h-48" />
                    <div className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden">
                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                {mostViewed.map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4">
                                            <img src={img(news)} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <Link href={detailHref(news)}>
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </Link>
                                            </div>
                                        </div>
                                        <hr className="border-stone-200 last:hidden" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Section */}
            <div className="py-20 bg-teal-950">
                <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4'>
                    {breaking.slice(0, 4).map((news, index) => (
                        <div key={index} className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.2)] overflow-hidden hover:shadow-[0_3px_1px_0_rgba(0,0,0,0.2)] transition">
                            <div className="relative">
                                <img src={img(news)} alt={news.title} className="w-full h-48 object-cover" />
                            </div>
                            <div>
                                <Link href={detailHref(news)}>
                                    <h3 className="font-bold text-stone-700 hover:text-teal-900 mb-2 py-3 px-4 transition">{news.title}</h3>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* National Section */}
            <div className="py-20 bg-white">
                <div className='max-w-7xl mx-auto px-4'>
                    <h2 className="text-2xl font-bold text-teal-900 mb-4 border-l-4 border-teal-900/20 pl-3">জাতীয়</h2>

                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        {jatiyo[0] && (
                            <div className='col-span-2'>
                                <img src={img(jatiyo[0])} alt={jatiyo[0].title} className="w-full object-cover mb-4" />
                                <Link href={detailHref(jatiyo[0])} className="bg-white rounded-sm overflow-hidden pt-5 space-y-3 group">
                                    <h3 className="font-bold text-teal-900 mb-2 text-2xl group-hover:text-teal-800 transition">{jatiyo[0].title}</h3>
                                    <p className="text-stone-500 leading-7 group-hover:text-stone-600 transition">{jatiyo[0].excerpt}</p>
                                </Link>
                            </div>
                        )}

                        <div className="bg-stone-100 rounded-sm overflow-hidden">
                            <div className="py-4">
                                <div className="flex flex-col gap-4">
                                    {jatiyo.map((news, index) => (
                                        <React.Fragment key={index}>
                                            <div className="flex items-start space-x-4 px-4">
                                                <img src={img(news)} alt={news.title} className="w-16 h-12 object-cover" />
                                                <div>
                                                    <Link href={detailHref(news)}>
                                                        <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr className="border-stone-200 last:hidden" />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-sm overflow-hidden">
                            <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">অর্থনীতি</div>
                            <div className="flex flex-col gap-4">
                                {orthoniti.map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4">
                                            <img src={img(news)} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <Link href={detailHref(news)}>
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </Link>
                                            </div>
                                        </div>
                                        <hr className="border-stone-200 last:hidden" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* International Section */}
            <div className="py-20 bg-stone-100">
                <div className='max-w-7xl mx-auto px-4'>
                    <h2 className="text-2xl font-bold text-teal-900 mb-4 border-l-4 border-teal-900/20 pl-3">আন্তর্জাতিক</h2>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        {antorjatik[0] && (
                            <div className='col-span-2'>
                                <img src={img(antorjatik[0])} alt={antorjatik[0].title} className="w-full object-cover" />
                                <div className="rounded-sm overflow-hidden pt-5 space-y-3">
                                    <Link href={detailHref(antorjatik[0])}>
                                        <h3 className="font-bold text-teal-900 mb-2 text-2xl">{antorjatik[0].title}</h3>
                                    </Link>
                                    <p className="text-stone-600 leading-7">{antorjatik[0].excerpt}</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-sm overflow-hidden">
                            <div className="py-4">
                                <div className="flex flex-col gap-4">
                                    {antorjatik.map((news, index) => (
                                        <React.Fragment key={index}>
                                            <div className="flex items-start space-x-4 px-4">
                                                <img src={img(news)} alt={news.title} className="w-16 h-12 object-cover" />
                                                <div>
                                                    <Link href={detailHref(news)}>
                                                        <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr className="border-stone-200 last:hidden" />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-stone-100 rounded-sm overflow-hidden">
                            <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">বিশ্ব অর্থনীতি</div>
                            <div className="flex flex-col gap-4">
                                {orthoniti.map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4">
                                            <img src={img(news)} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <Link href={detailHref(news)}>
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </Link>
                                            </div>
                                        </div>
                                        <hr className="border-stone-200 last:hidden" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Another News Section */}
            <div className="py-20 bg-white">
                <div className='max-w-7xl mx-auto px-4'>
                    <AdSlot placement="in_content" className="w-full h-32 bg-stone-200 mb-4" />
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        {[
                            { label: 'খেলা', items: sectionBySlug('khela') },
                            { label: 'বিনোদন', items: sectionBySlug('binodon') },
                            { label: 'লাইফ স্টাইল', items: sectionBySlug('lifestyle') },
                            { label: 'মতামত', items: sectionBySlug('motamot') },
                        ].map((col, colIndex) => (
                            <div key={colIndex} className="bg-stone-100 rounded-sm overflow-hidden">
                                <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">{col.label}</div>
                                <div className="flex flex-col gap-4 mb-4">
                                    {col.items.map((news, index) => (
                                        <React.Fragment key={index}>
                                            <div className="flex items-start space-x-4 px-4">
                                                <img src={img(news)} alt={news.title} className="w-16 h-12 object-cover" />
                                                <div>
                                                    <Link href={detailHref(news)}>
                                                        <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr className="border-stone-200 last:hidden" />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Another News Section */}
            <div className="py-20 bg-stone-100">
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        {[
                            { label: 'পাঁচমিশালি', items: panchmishali },
                            { label: 'প্রবাস', items: probas },
                            { label: 'পজেটিভ বাংলাদেশ', items: positive },
                            { label: 'আইন আদালত', items: ainAdalat },
                        ].map((col, colIndex) => (
                            <div key={colIndex} className="bg-white rounded-sm overflow-hidden">
                                <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">{col.label}</div>
                                <div className="flex flex-col gap-4 mb-4">
                                    {col.items.map((news, index) => (
                                        <React.Fragment key={index}>
                                            <div className="flex items-start space-x-4 px-4">
                                                <img src={img(news)} alt={news.title} className="w-16 h-12 object-cover" />
                                                <div>
                                                    <Link href={detailHref(news)}>
                                                        <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr className="border-stone-200 last:hidden" />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;

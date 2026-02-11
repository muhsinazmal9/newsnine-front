import React from 'react'

const mainNews = [
    { title: 'অসৎ উদ্দেশে বাসা-বাড়িতে তল্লাশি করছে আইনশৃঙ্খলা বাহিনী: ইউট্যাব', image: 'https://placehold.co/300x200', category: 'জাতীয়' },
    { title: 'বাজারে নেই পেঁয়াজ আর কমেনি দাম, নেই যন্ত্রণাকার', image: 'https://placehold.co/300x200', category: 'জাতীয়' },
    { title: 'ইউক্রেনের সাথে আলোচনা নিয়ে ভ্যাটিকানের প্রস্তাব প্রত্যাখ্যান রাশিয়ার', image: 'https://placehold.co/300x200', category: 'আন্তর্জাতিক' },
    { title: 'মানবতাবিরোধী অপরাধ : সিএভির পর পুনঃশুনানি, ময়মনসিংহের পাঁচজনের রায় যেকোনো দিন', image: 'https://placehold.co/300x200', category: 'আন্তর্জাতিক' }
];

function Page() {
    return (
        <>
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-7 gap-4 pb-12">

                {/* News Grid */}
                <div className="col-span-3">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Single Feature News */}
                        <div className="col-span-2">
                            <div className="relative h-100 rounded-sm overflow-hidden shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition">

                                {/* Background Image */}
                                <img
                                    src={mainNews[0].image}
                                    alt={mainNews[0].title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                {/* Dark Overlay */}
                                <div className="absolute bottom-0 left-0 w-full h-[30%] bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col justify-end h-full p-4">
                                    <a href="news-detail">
                                        <h3 className="text-white text-3xl font-bold leading-11">
                                            {mainNews[0].title}
                                        </h3>
                                    </a>
                                </div>

                            </div>
                        </div>

                        {mainNews.map((news, index) => (
                            <div key={index} className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_3px_1px_0_rgba(0,0,0,0.1)] transition">
                                <div className="relative">
                                    <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                                </div>
                                <div>
                                    <a href="#">
                                        <h3 className="font-bold text-stone-700 hover:text-teal-900 mb-2 py-3 px-4 transition text-lg">{news.title}</h3>
                                    </a>
                                    <div className="p-3 border-t border-stone-200">
                                        <a href="#" className="text-teal-700 text-sm hover:text-teal-900">{news.category}</a>
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
                                {[...mainNews, ...mainNews, ...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
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
                    {/* Ad area */}
                    <div className='bg-stone-200 h-48'></div>
                    <div className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden">
                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                {[...mainNews, ...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
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
                    {mainNews.map((news, index) => (
                        <div key={index} className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.2)] overflow-hidden hover:shadow-[0_3px_1px_0_rgba(0,0,0,0.2)] transition">
                            <div className="relative">
                                <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                            </div>
                            <div>
                                <a href="#">
                                    <h3 className="font-bold text-stone-700 hover:text-teal-900 mb-2 py-3 px-4 transition">{news.title}</h3>
                                </a>
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
                        <div className='col-span-2'>
                            <img src={mainNews[0].image} alt={mainNews[0].title} className="w-full object-cover mb-4" />
                            <a href="#" className="bg-white rounded-sm overflow-hidden pt-5 space-y-3 group">
                                <h3 className="font-bold text-teal-900 mb-2 text-2xl group-hover:text-teal-800 transition">জানুয়ারিতে প্রধানমন্ত্রী আসবেন ঝালকাঠি</h3>
                                <p className="text-stone-500 leading-7 group-hover:text-stone-600 transition">ঝালকাঠি সংবাদদাতা: ঝালকাঠি জেলা আওয়ামী লীগের বর্ধিত সভা অনুষ্ঠিত হয়েছে। বুধবার বিকেলে জেলা আওয়ামী লীগ কার্যালয়ে এ সভার আয়োজন করা হয়। এতে প্রধান অতিথি ছিলেন আওয়ামী লীগের উপদেষ্টা পরিষদের সদস্য ও সাবেক শিল্পমন্ত্রী আমির হোসেন আমু। বর্ধিত সভায় জানানো হয় আগামী বছরের জানুয়ারি মাসে ঝালকাঠিতে আওয়ামী লীগের বিশাল সমাবেশ অনুষ্ঠিত</p>
                            </a>
                        </div>

                        <div className="bg-stone-100 rounded-sm overflow-hidden">
                            <div className="py-4">
                                <div className="flex flex-col gap-4">
                                    {[...mainNews].map((news, index) => (
                                        <React.Fragment key={index}>
                                            <div className="flex items-start space-x-4 px-4">
                                                <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                                <div>
                                                    <a href="#">
                                                        <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                    </a>
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
                                {[...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
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
                        <div className='col-span-2'>
                            <img src={mainNews[0].image} alt={mainNews[0].title} className="w-full object-cover" />
                            <div className="rounded-sm overflow-hidden pt-5 space-y-3">
                                <a href="#">
                                    <h3 className="font-bold text-teal-900 mb-2 text-2xl">জানুয়ারিতে প্রধানমন্ত্রী আসবেন ঝালকাঠি</h3>
                                </a>
                                <p className="text-stone-600 leading-7">ঝালকাঠি সংবাদদাতা: ঝালকাঠি জেলা আওয়ামী লীগের বর্ধিত সভা অনুষ্ঠিত হয়েছে। বুধবার বিকেলে জেলা আওয়ামী লীগ কার্যালয়ে এ সভার আয়োজন করা হয়। এতে প্রধান অতিথি ছিলেন আওয়ামী লীগের উপদেষ্টা পরিষদের সদস্য ও সাবেক শিল্পমন্ত্রী আমির হোসেন আমু। বর্ধিত সভায় জানানো হয় আগামী বছরের জানুয়ারি মাসে ঝালকাঠিতে আওয়ামী লীগের বিশাল সমাবেশ অনুষ্ঠিত</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-sm overflow-hidden">
                            <div className="py-4">
                                <div className="flex flex-col gap-4">
                                    {[...mainNews].map((news, index) => (
                                        <React.Fragment key={index}>
                                            <div className="flex items-start space-x-4 px-4">
                                                <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                                <div>
                                                    <a href="#">
                                                        <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                    </a>
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
                                {[...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
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
                    {/* Ad area */}
                    <div className="w-full h-32 bg-stone-200 mb-4">
                        <p className="text-center text-stone-500"></p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        <div className="bg-stone-100 rounded-sm overflow-hidden">
                            <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">বিশ্ব অর্থনীতি</div>
                            <div className="flex flex-col gap-4 mb-4">
                                {[...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4 px-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
                                            </div>
                                        </div>
                                        <hr className="border-stone-200 last:hidden" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="bg-stone-100 rounded-sm overflow-hidden">
                            <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">বিশ্ব অর্থনীতি</div>
                            <div className="flex flex-col gap-4 mb-4">
                                {[...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4 px-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
                                            </div>
                                        </div>
                                        <hr className="border-stone-200 last:hidden" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="bg-stone-100 rounded-sm overflow-hidden">
                            <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">বিশ্ব অর্থনীতি</div>
                            <div className="flex flex-col gap-4 mb-4">
                                {[...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4 px-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
                                            </div>
                                        </div>
                                        <hr className="border-stone-200 last:hidden" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="bg-stone-100 rounded-sm overflow-hidden">
                            <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">বিশ্ব অর্থনীতি</div>
                            <div className="flex flex-col gap-4 mb-4">
                                {[...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4 px-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
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
            <div className="py-20 bg-stone-100">
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        <div className="bg-white rounded-sm overflow-hidden">
                            <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">পাঁচমিশালি</div>
                            <div className="flex flex-col gap-4 mb-4">
                                {[...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4 px-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
                                            </div>
                                        </div>
                                        <hr className="border-stone-200 last:hidden" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-sm overflow-hidden">
                            <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">প্রবাস</div>
                            <div className="flex flex-col gap-4 mb-4">
                                {[...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4 px-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
                                            </div>
                                        </div>
                                        <hr className="border-stone-200 last:hidden" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-sm overflow-hidden">
                            <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">পজেটিভ বাংলাদেশ</div>
                            <div className="flex flex-col gap-4 mb-4">
                                {[...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4 px-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
                                            </div>
                                        </div>
                                        <hr className="border-stone-200 last:hidden" />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-sm overflow-hidden">
                            <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">আইন আদালত</div>
                            <div className="flex flex-col gap-4 mb-4">
                                {[...mainNews].map((news, index) => (
                                    <React.Fragment key={index}>
                                        <div className="flex items-start space-x-4 px-4">
                                            <img src={news.image} alt={news.title} className="w-16 h-12 object-cover" />
                                            <div>
                                                <a href="#">
                                                    <h3 className="text-stone-700 font-bold">{news.title}</h3>
                                                </a>
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
        </>
    );
}

export default Page;

import React from 'react'

const mainNews = [
    { title: 'অসৎ উদ্দেশে বাসা-বাড়িতে তল্লাশি করছে আইনশৃঙ্খলা বাহিনী: ইউট্যাব', image: 'https://placehold.co/300x200', category: 'জাতীয়' },
    { title: 'বাজারে নেই পেঁয়াজ আর কমেনি দাম, নেই যন্ত্রণাকার', image: 'https://placehold.co/300x200', category: 'জাতীয়' },
    { title: 'ইউক্রেনের সাথে আলোচনা নিয়ে ভ্যাটিকানের প্রস্তাব প্রত্যাখ্যান রাশিয়ার', image: 'https://placehold.co/300x200', category: 'আন্তর্জাতিক' },
    { title: 'মানবতাবিরোধী অপরাধ : সিএভির পর পুনঃশুনানি, ময়মনসিংহের পাঁচজনের রায় যেকোনো দিন', image: 'https://placehold.co/300x200', category: 'আন্তর্জাতিক' }
];

function SingleCategory() {
    return (
        <>
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="mb-6">
                    <h1 className='text-2xl font-bold text-teal-900 border-b border-teal-900/50 pb-2'>জাতীয়</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Single Feature News */}
                    <div className="col-span-1 md:col-span-2 relative h-96 rounded-sm overflow-hidden shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition">
                        {/* Background Image */}
                        <img
                            src={mainNews[0].image}
                            alt={mainNews[0].title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-end h-full p-4">
                            <a href="news-detail">
                                <h3 className="text-white text-3xl font-bold leading-snug ">
                                    {mainNews[0].title}
                                </h3>
                            </a>
                        </div>
                    </div>

                    {/* Rest of the news in left column */}
                    {[...mainNews, ...mainNews, ...mainNews.slice(0, 2)].map((news, index) => (
                        <div key={index} className="bg-white rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_3px_1px_0_rgba(0,0,0,0.1)] transition">
                            <div className="relative">
                                <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                            </div>
                            <div>
                                <a href="#">
                                    <h3 className="font-bold text-stone-800 hover:text-teal-900 mb-2 py-3 px-4 transition">{news.title}</h3>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SingleCategory;

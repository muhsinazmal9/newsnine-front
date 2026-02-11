import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { RiZoomInFill, RiZoomOutFill } from "react-icons/ri";


const mainNews = [
    { title: 'অসৎ উদ্দেশে বাসা-বাড়িতে তল্লাশি করছে আইনশৃঙ্খলা বাহিনী: ইউট্যাব', image: 'https://placehold.co/300x200', category: 'জাতীয়' },
    { title: 'বাজারে নেই পেঁয়াজ আর কমেনি দাম, নেই যন্ত্রণাকার', image: 'https://placehold.co/300x200', category: 'জাতীয়' },
    { title: 'ইউক্রেনের সাথে আলোচনা নিয়ে ভ্যাটিকানের প্রস্তাব প্রত্যাখ্যান রাশিয়ার', image: 'https://placehold.co/300x200', category: 'আন্তর্জাতিক' },
    { title: 'মানবতাবিরোধী অপরাধ : সিএভির পর পুনঃশুনানি, ময়মনসিংহের পাঁচজনের রায় যেকোনো দিন', image: 'https://placehold.co/300x200', category: 'আন্তর্জাতিক' }
];

function NewsDetail() {
    return (
        <>
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-7 gap-4 pb-12">
                {/* TITLE */}
                <div className="col-span-7">
                    <span className='text-teal-700 font-bold text-sm border-b-2 border-teal-700 inline-block mb-4'>সারাদেশ</span>
                    <h1 className='text-3xl font-bold text-stone-800'>জানুয়ারিতে প্রধানমন্ত্রী আসবেন ঝালকাঠি</h1>
                </div>

                {/* Main Content */}
                <div className="col-span-5">
                    <div className='border-y border-stone-200 py-2 flex justify-between mb-4'>
                        <div className='flex items-center gap-4 text-stone-600 text-sm'>
                            <p>ঝালকাঠি সংবাদদাতা</p>
                            <div className='w-px h-4 bg-stone-300'></div>
                            <p>প্রকাশ: ১১ ফেব্রুয়ারি ২০২৬, ১৪: ৪১</p>
                        </div>
                        <div className='flex items-center gap-3 text-stone-600 text-xl'>
                            <i className='transition-colors cursor-pointer hover:text-stone-800'><FaFacebook /></i>
                            <i className='transition-colors cursor-pointer hover:text-stone-800'><FaTwitter /></i>
                            <i className='transition-colors cursor-pointer hover:text-stone-800'><FaLinkedin /></i>
                            <i className='transition-colors cursor-pointer hover:text-stone-800'><FaWhatsapp /></i>
                            <div className='w-px h-4 bg-stone-300'></div>
                            <i className='transition-colors cursor-pointer hover:text-stone-800'><RiZoomOutFill /></i>
                            <i className='transition-colors cursor-pointer hover:text-stone-800'><RiZoomInFill /></i>
                        </div>
                    </div>

                    <article className='rounded-sm shadow-[0_2px_1px_0_rgba(0,0,0,0.1)] overflow-hidden bg-white'>
                        {/* Image */}
                        <figure className='space-y-3'>
                            <img src="https://placehold.co/300x200" alt="" className="w-full object-cover" />
                            <figcaption className='text-center text-sm text-stone-500 italic'>ঝালকাঠি জেলা আওয়ামী লীগের বর্ধিত সভা অনুষ্ঠিত হয়েছে। বুধবার বিকেলে জেলা আওয়ামী লীগ কার্যালয়ে এ সভার আয়োজন করা হয়। | ছবি: বিএনপি</figcaption>
                        </figure>
                        {/* Content */}
                        <section className="p-6 space-y-6 text-stone-700 leading-8 text-lg">
                            <p>ঝালকাঠি সংবাদদাতা: ঝালকাঠি জেলা আওয়ামী লীগের বর্ধিত সভা অনুষ্ঠিত হয়েছে। বুধবার বিকেলে জেলা আওয়ামী লীগ কার্যালয়ে এ সভার আয়োজন করা হয়। এতে প্রধান অতিথি ছিলেন আওয়ামী লীগের উপদেষ্টা পরিষদের সদস্য ও সাবেক শিল্পমন্ত্রী আমির হোসেন আমু। বর্ধিত সভায় জানানো হয় আগামী বছরের জানুয়ারি মাসে ঝালকাঠিতে আওয়ামী লীগের বিশাল সমাবেশ অনুষ্ঠিত হবে। এতে প্রধানমন্ত্রী শেখ হাসিনা প্রধান অতিথি হিসেবে যোগদা করার কথা রয়েছে। এ জন্য দলের নেতাকর্মীদের প্রস্তুতি নিতে বলা হয় বর্ধিত সভায়।</p>
                            <p>জেলা আওয়ামী লীগ সভাপতি সরদার মো. শাহ আলমের সভাপতিত্বে বর্ধিত সভায় বক্তব্য রাখেন জেলা আওয়ামী লীগের সাধারণ সম্পাদক অ্যাডভোকেট খান সাইফুল্লাহ পনিরসহ দলের নেতৃবৃন্দ।</p>
                            <p>প্রধান অতিথির বক্তব্যে আমির হোসেন আমু বলেন, রাজনৈতিক কর্মীর হাতিয়ার সেই হচ্ছে দলের আদর্শ বাস্তবায়ন করা। আওয়ামী লীগ ক্ষমতা থাকাকালীন অবস্থায় যে উন্নয়ন কাজগুলো করেছে, সেগুলো যুদ্ধক্ষেতের গোলা বারুদের চেয়েও বড় গোলা বারুদ। আওয়ামী লীগ ধংসাত্মক রাজনীত চাই না। বর্তমান সরকারের যে অর্জন তা-ই যথেষ্ঠ।</p>
                            <p>আমির হোসেন আমু আরো বলেন, প্রধানমন্ত্রীর আগমনের আগেই জেলা আওয়ামী লীগের সাংগঠনিক ভিত্তি তৃণমূলস্তর থেকে শক্তিশালী করার জন্য ইউনিয়ন পর্যায়ে আওয়ামী লীগ নেতা কর্মীদের নিয়ে ইউনিয়ন কমিটি ও ওয়ার্ড কমিটিগুলো গঠন করতে হবে। ইউনিয়ন পর্যায়ে কমিটি গঠন করে জাতীয় কাউন্সিলের পূর্বে স্থানীয় পর্যায়ে কমিটিগুলো চূড়ান্ত করার নির্দেশ প্রদান করেন আমু।</p>


                        </section>

                        <footer className='p-6'>
                            <div className="flex items-center gap-2 text-stone-700 text-sm">
                                <strong>বিষয়:</strong>
                                <a className="bg-stone-100 hover:bg-stone-200 border border-stone-200 px-3 py-1 rounded-sm transition" href="/tag/atok">আটক</a>
                                <a className="bg-stone-100 hover:bg-stone-200 border border-stone-200 px-3 py-1 rounded-sm transition" href="/tag/db">ডিবি</a>
                                <a className="bg-stone-100 hover:bg-stone-200 border border-stone-200 px-3 py-1 rounded-sm transition" href="/tag/jiggashabad">জিজ্ঞাসাবাদ</a>
                            </div>
                        </footer>
                    </article>
                </div>

                {/* Another Sidebar */}
                <div className="col-span-2 space-y-4">
                    {/* Ad area */}
                    <div className='bg-stone-200 h-48'></div>
                    <div className="bg-white rounded-sm overflow-hidden">
                        <div className="py-2 px-4 text-lg bg-teal-950 text-white text-center mb-4">অন্যান্য সংবাদ</div>
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
        </>
    );
}

export default NewsDetail;

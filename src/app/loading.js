export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen absolute top-0 left-0 w-full h-full bg-neutral-100 z-9999999">
            <div className="relative w-12 h-12">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-stone-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-900 rounded-full animate-spin border-t-transparent"></div>
            </div>
        </div>
    );
}

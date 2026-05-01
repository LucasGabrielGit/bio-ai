export function BackgroundCards() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                viewBox="0 0 1440 900"
            >
                <rect x="100" y="150" rx="12" ry="12" width="200" height="70" fill="#6366F1" opacity="0.2" />
                <rect x="400" y="300" rx="12" ry="12" width="220" height="60" fill="#8B5CF6" opacity="0.25" />
                <rect x="700" y="480" rx="12" ry="12" width="250" height="80" fill="#0EA5E9" opacity="0.2" />
            </svg>

            <div className="absolute bottom-12 left-12">
                <div className="w-40 h-40 bg-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/30 rounded-full"></div>
            </div>
        </div>
    );
}

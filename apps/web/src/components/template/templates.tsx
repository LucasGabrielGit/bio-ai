export const TemplatePreview = ({ templateId }: { templateId: string }) => {
    const previews = {
        'minimalista': (
            <div className="w-full h-32 bg-linear-to-b from-gray-50 to-gray-100 rounded border p-2 text-xs">
                <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded mb-1 w-full"></div>
                <div className="h-2 bg-gray-200 rounded mb-1 w-5/6"></div>
                <div className="h-2 bg-gray-200 rounded mb-2 w-4/5"></div>
                <div className="flex space-x-1 mt-2">
                    <div className="h-2 w-2 bg-blue-300 rounded-full"></div>
                    <div className="h-2 w-2 bg-green-300 rounded-full"></div>
                </div>
            </div>
        ),
        'profissional-executivo': (
            <div className="w-full h-32 bg-linear-to-b from-blue-50 to-blue-100 rounded border p-2 text-xs">
                <div className="flex items-center mb-2">
                    <div className="h-4 w-4 bg-blue-400 rounded-full mr-2"></div>
                    <div className="h-2 bg-blue-300 rounded w-1/2"></div>
                </div>
                <div className="h-2 bg-blue-200 rounded mb-1 w-full"></div>
                <div className="h-2 bg-blue-200 rounded mb-2 w-4/5"></div>
                <div className="grid grid-cols-2 gap-1 mt-2">
                    <div className="h-3 bg-blue-300 rounded"></div>
                    <div className="h-3 bg-blue-300 rounded"></div>
                </div>
            </div>
        ),
        'criativo-artistico': (
            <div className="w-full h-32 bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 rounded border p-2 text-xs">
                <div className="h-3 bg-linear-to-r from-purple-300 to-pink-300 rounded mb-2 w-2/3"></div>
                <div className="grid grid-cols-3 gap-1 mb-2">
                    <div className="h-4 bg-purple-200 rounded"></div>
                    <div className="h-4 bg-pink-200 rounded"></div>
                    <div className="h-4 bg-orange-200 rounded"></div>
                </div>
                <div className="h-2 bg-purple-200 rounded mb-1 w-full"></div>
                <div className="h-2 bg-pink-200 rounded w-3/4"></div>
            </div>
        ),
        'tech-developer': (
            <div className="w-full h-32 bg-linear-to-b from-green-50 to-emerald-100 rounded border p-2 text-xs">
                <div className="flex items-center mb-2">
                    <div className="h-2 w-2 bg-green-400 rounded mr-1"></div>
                    <div className="h-2 bg-green-300 rounded w-1/3"></div>
                </div>
                <div className="bg-gray-800 rounded p-1 mb-2">
                    <div className="h-1 bg-green-400 rounded mb-1 w-2/3"></div>
                    <div className="h-1 bg-blue-400 rounded w-1/2"></div>
                </div>
                <div className="flex space-x-1">
                    <div className="h-2 bg-green-300 rounded px-2 text-center">JS</div>
                    <div className="h-2 bg-blue-300 rounded px-2 text-center">TS</div>
                    <div className="h-2 bg-purple-300 rounded px-2 text-center">React</div>
                </div>
            </div>
        ),
        'influencer-social': (
            <div className="w-full h-32 bg-linear-to-br from-pink-50 to-rose-100 rounded border p-2 text-xs">
                <div className="flex items-center mb-2">
                    <div className="h-4 w-4 bg-pink-400 rounded-full mr-2"></div>
                    <div className="h-2 bg-pink-300 rounded w-1/2"></div>
                    <div className="ml-auto h-2 w-6 bg-rose-300 rounded">1.2M</div>
                </div>
                <div className="grid grid-cols-4 gap-1 mb-2">
                    <div className="h-3 bg-pink-200 rounded"></div>
                    <div className="h-3 bg-rose-200 rounded"></div>
                    <div className="h-3 bg-pink-200 rounded"></div>
                    <div className="h-3 bg-rose-200 rounded"></div>
                </div>
                <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-pink-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-purple-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-red-400 rounded-full"></div>
                </div>
            </div>
        ),
        'empreendedor-startup': (
            <div className="w-full h-32 bg-linear-to-br from-orange-50 to-yellow-100 rounded border p-2 text-xs">
                <div className="flex items-center mb-2">
                    <div className="h-3 w-3 bg-orange-400 rounded mr-2">⚡</div>
                    <div className="h-2 bg-orange-300 rounded w-1/2"></div>
                </div>
                <div className="h-2 bg-yellow-200 rounded mb-1 w-full"></div>
                <div className="h-2 bg-orange-200 rounded mb-2 w-4/5"></div>
                <div className="flex justify-between">
                    <div className="h-4 w-8 bg-orange-300 rounded text-center">MVP</div>
                    <div className="h-4 w-8 bg-yellow-300 rounded text-center">$1M</div>
                    <div className="h-4 w-8 bg-green-300 rounded text-center">B2B</div>
                </div>
            </div>
        ),
        'consultor-especialista': (
            <div className="w-full h-32 bg-linear-to-b from-indigo-50 to-blue-100 rounded border p-2 text-xs">
                <div className="flex items-center mb-2">
                    <div className="h-4 w-4 bg-indigo-400 rounded mr-2"></div>
                    <div className="h-2 bg-indigo-300 rounded w-1/2"></div>
                    <div className="ml-auto text-xs">⭐ 4.9</div>
                </div>
                <div className="h-2 bg-indigo-200 rounded mb-1 w-full"></div>
                <div className="h-2 bg-blue-200 rounded mb-2 w-3/4"></div>
                <div className="bg-indigo-100 rounded p-1">
                    <div className="h-1 bg-indigo-300 rounded mb-1 w-full"></div>
                    <div className="h-1 bg-indigo-200 rounded w-2/3"></div>
                </div>
            </div>
        ),
        'educador-mentor': (
            <div className="w-full h-32 bg-linear-to-b from-teal-50 to-cyan-100 rounded border p-2 text-xs">
                <div className="flex items-center mb-2">
                    <div className="h-3 w-3 bg-teal-400 rounded mr-2">📚</div>
                    <div className="h-2 bg-teal-300 rounded w-1/2"></div>
                </div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                    <div className="h-3 bg-teal-200 rounded text-center"></div>
                    <div className="h-3 bg-cyan-200 rounded text-center"></div>
                </div>
                <div className="h-2 bg-teal-200 rounded mb-1 w-full"></div>
                <div className="h-2 bg-cyan-200 rounded w-4/5"></div>
            </div>
        ),
        'freelancer-multiplo': (
            <div className="w-full h-32 bg-linear-to-br from-violet-50 to-purple-100 rounded border p-2 text-xs">
                <div className="h-2 bg-violet-300 rounded mb-2 w-2/3"></div>
                <div className="grid grid-cols-3 gap-1 mb-2">
                    <div className="h-3 bg-violet-200 rounded text-center"></div>
                    <div className="h-3 bg-purple-200 rounded text-center"></div>
                    <div className="h-3 bg-pink-200 rounded text-center"></div>
                </div>
                <div className="h-2 bg-violet-200 rounded mb-1 w-full"></div>
                <div className="h-2 bg-purple-200 rounded w-3/4"></div>
            </div>
        ),
        'premium-luxury': (
            <div className="w-full h-32 bg-linear-to-br from-amber-50 via-yellow-50 to-orange-50 rounded border-2 border-amber-200 p-2 text-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 h-4 w-4 bg-amber-300 rounded-bl transform rotate-12"></div>
                <div className="flex items-center mb-2">
                    <div className="h-4 w-4 bg-linear-to-br from-amber-400 to-orange-400 rounded mr-2"></div>
                    <div className="h-2 bg-linear-to-r from-amber-300 to-orange-300 rounded w-1/2"></div>
                </div>
                <div className="h-2 bg-amber-200 rounded mb-1 w-full"></div>
                <div className="h-2 bg-orange-200 rounded mb-2 w-4/5"></div>
                <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
            </div>
        )
    }

    return previews[templateId as keyof typeof previews] || (
        <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center">
            <span className="text-gray-400 text-xs">Preview não disponível</span>
        </div>
    )
}
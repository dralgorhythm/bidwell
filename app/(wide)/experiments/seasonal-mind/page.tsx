export default function SeasonalMindPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Seasonal Mind</h1>
            <p className="text-lg text-gray-600 mb-6">The Circadian Dashboard</p>
            <div className="prose max-w-none">
                <p>
                    Seasonal Mind correlates the user's personal digital activity with local circadian and seasonal cycles.
                    It visualizes the disconnect between "Social Time" (clock time) and "Solar Time" (sun position),
                    helping users manage Seasonal Affective Disorder (SAD).
                </p>
                <p className="text-sm text-gray-500 mt-8">
                    This experiment is currently under development.
                </p>
            </div>
        </div>
    );
}

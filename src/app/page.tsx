import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">👩‍🍳</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mom AI
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            From Lab Report to Dinner Plate - AI-Powered Clinical Nutrition
          </p>
          <Link 
            href="/chat"
            className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all"
          >
            Start Cooking Smarter →
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🍳</div>
            <h3 className="text-xl font-bold mb-2">Ingredient-Based Recipes</h3>
            <p className="text-gray-600">
              "I have chicken and rice" → Instant personalized suggestions
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Smart Meal Planning</h3>
            <p className="text-gray-600">
              Weekly/monthly plans for busy families and professionals
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🩺</div>
            <h3 className="text-xl font-bold mb-2">Medical Report Analysis</h3>
            <p className="text-gray-600">
              Upload lab results → Get targeted nutritional meal plans
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600">800+</div>
              <div className="text-gray-600 mt-2">Ingredients Database</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">91%</div>
              <div className="text-gray-600 mt-2">AI Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">3</div>
              <div className="text-gray-600 mt-2">User Types Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600">5</div>
              <div className="text-gray-600 mt-2">Adaptive UI Components</div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Who Uses Mom AI?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">🏠 Home Cooks</h3>
              <p className="text-gray-700 text-sm">
                "What should I cook today?" → Solved with personalized suggestions
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">⚕️ Healthcare Professionals</h3>
              <p className="text-gray-700 text-sm">
                Generate clinical meal plans for patients with conditions
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">🩺 Patients</h3>
              <p className="text-gray-700 text-sm">
                Upload lab results → Get deficiency-targeted meal plans
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600">
        <p>Built with Tambo AI • WeMakeDevs Hackathon 2025</p>
      </footer>
    </div>
  );
}
"use client";

interface RecipeSuggestion {
  name: string;
  cuisine: string;
  cookTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  matchPercentage?: number;
  dietary?: string[];
}

interface QuickRecipeSuggestionsProps {
  suggestions: RecipeSuggestion[];
  title?: string;
  subtitle?: string;
}

export function QuickRecipeSuggestions({ 
  suggestions = [], 
  title = "Recipe Suggestions",
  subtitle 
}: QuickRecipeSuggestionsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((recipe, idx) => (
          <div 
            key={idx} 
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
            
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
              <span>🍴 {recipe.cuisine}</span>
              <span>⏱️ {recipe.cookTime}m</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </span>
              {recipe.matchPercentage && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {recipe.matchPercentage}% match
                </span>
              )}
            </div>
            
            {recipe.dietary && recipe.dietary.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {recipe.dietary.map((diet, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs"
                  >
                    {diet}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
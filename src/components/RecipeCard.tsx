"use client";

interface RecipeCardProps {
  title: string;
  cuisine: string;
  cookTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  dietary?: string[];
}

export function RecipeCard({
  title,
  cuisine,
  cookTime,
  difficulty,
  ingredients = [],  // ← Added default empty array
  instructions = [], // ← Added default empty array
  dietary = []
}: RecipeCardProps) {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-lg max-w-2xl">
      <h2 className="text-2xl font-bold mb-2">{title || "Untitled Recipe"}</h2>
      
      <div className="flex gap-4 mb-4 text-sm text-gray-600">
        <span>🍴 {cuisine || "Unknown"}</span>
        <span>⏱️ {cookTime || 0} mins</span>
        <span>📊 {difficulty || "Medium"}</span>
      </div>
      
      {dietary && dietary.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {dietary.map((diet, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
            >
              {diet}
            </span>
          ))}
        </div>
      )}

      {ingredients && ingredients.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {ingredients.map((ing, idx) => (
              <li key={idx} className="text-gray-700">{ing}</li>
            ))}
          </ul>
        </div>
      )}

      {instructions && instructions.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            {instructions.map((step, idx) => (
              <li key={idx} className="text-gray-700">{step}</li>
            ))}
          </ol>
        </div>
      )}

      {(!ingredients || ingredients.length === 0) && (!instructions || instructions.length === 0) && (
        <p className="text-gray-500 italic">No recipe details available.</p>
      )}
    </div>
  );
}

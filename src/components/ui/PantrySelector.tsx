"use client";

interface Ingredient {
  name: string;
  category: string;
}

interface PantrySelectorProps {
  ingredients: Ingredient[];
  title?: string;
}

export function PantrySelector({ 
  ingredients = [], 
  title = "Your Pantry Ingredients" 
}: PantrySelectorProps) {
  // Group by category
  const grouped = ingredients.reduce((acc, ing) => {
    if (!acc[ing.category]) acc[ing.category] = [];
    acc[ing.category].push(ing.name);
    return acc;
  }, {} as Record<string, string[]>);

  const totalCategories = Object.keys(grouped).length;

  return (
    <div className="border rounded-lg p-6 bg-white shadow-lg max-w-4xl">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600">
          {ingredients.length} ingredients available across {totalCategories} categories
        </p>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="border-b pb-4 last:border-b-0">
            <h3 className="font-semibold text-lg mb-3 text-blue-600 capitalize">
              {category} ({items.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.slice(0, 50).map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full text-sm bg-green-50 border border-green-200 text-green-800"
                >
                  {item}
                </span>
              ))}
              {items.length > 50 && (
                <span className="px-3 py-1.5 text-sm text-gray-500 italic">
                  +{items.length - 50} more...
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {ingredients.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No ingredients found in pantry.
        </div>
      )}
    </div>
  );
}
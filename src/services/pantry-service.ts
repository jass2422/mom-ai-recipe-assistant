import pantryData from '@/data/pantry.json';

export interface Ingredient {
  name: string;
  category: string;
}

export async function getPantryIngredients() {
  // Convert your JSON structure to flat array
  const ingredients: Ingredient[] = [];
  
  Object.entries(pantryData).forEach(([category, items]) => {
    (items as string[]).forEach((item) => {
      ingredients.push({
        name: item,
        category: category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      });
    });
  });
  
  return ingredients;
}

export async function searchIngredients(query: string) {
  const allIngredients = await getPantryIngredients();
  return allIngredients.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getIngredientsByCategory(category: string) {
  const allIngredients = await getPantryIngredients();
  return allIngredients.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
}
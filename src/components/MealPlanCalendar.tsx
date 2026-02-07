"use client";

interface MealPlan {
  day: string;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
}

interface MealPlanCalendarProps {
  weekPlan: MealPlan[];
  title?: string;
}

export function MealPlanCalendar({ weekPlan = [], title = "Your Weekly Meal Plan" }: MealPlanCalendarProps) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Ensure we have all 7 days
  const fullWeek = daysOfWeek.map(day => {
    const existingDay = weekPlan.find(p => p.day === day);
    return existingDay || { day, breakfast: undefined, lunch: undefined, dinner: undefined };
  });

  return (
    <div className="border rounded-lg p-6 bg-white shadow-lg max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {fullWeek.map((dayPlan) => (
          <div key={dayPlan.day} className="border-b pb-4 last:border-b-0">
            <h3 className="font-semibold text-lg mb-2 text-blue-600">{dayPlan.day}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-yellow-50 p-3 rounded">
                <span className="font-medium text-sm text-gray-600">🌅 Breakfast</span>
                <p className="mt-1 text-sm">{dayPlan.breakfast || "Not planned"}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded">
                <span className="font-medium text-sm text-gray-600">☀️ Lunch</span>
                <p className="mt-1 text-sm">{dayPlan.lunch || "Not planned"}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <span className="font-medium text-sm text-gray-600">🌙 Dinner</span>
                <p className="mt-1 text-sm">{dayPlan.dinner || "Not planned"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
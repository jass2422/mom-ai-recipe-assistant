/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */
import { analyzeHealthReport } from "@/services/medical-analysis";
import { HealthAnalysisCard } from "@/components/ui/HealthAnalysisCard";
import { getPantryIngredients, searchIngredients } from "@/services/pantry-service";
import { CookingTimerAssistant } from "@/components/CookingTimerAssistant";
import { PantrySelector } from "@/components/ui/PantrySelector";
import { QuickRecipeSuggestions } from "@/components/QuickRecipeSuggestions";
import { MealPlanCalendar } from "@/components/MealPlanCalendar";
import { RecipeCard } from "@/components/RecipeCard";
import { Graph, graphSchema } from "@/components/tambo/graph";
import { DataCard, dataCardSchema } from "@/components/ui/card-data";
import {
  getCountryPopulations,
  getGlobalPopulationTrend,
} from "@/services/population-stats";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [
  {
    name: "countryPopulation",
    description:
      "A tool to get population statistics by country with advanced filtering options",
    tool: getCountryPopulations,
    inputSchema: z.object({
      continent: z.string().optional(),
      sortBy: z.enum(["population", "growthRate"]).optional(),
      limit: z.number().optional(),
      order: z.enum(["asc", "desc"]).optional(),
    }),
    outputSchema: z.array(
      z.object({
        countryCode: z.string(),
        countryName: z.string(),
        continent: z.enum([
          "Asia",
          "Africa",
          "Europe",
          "North America",
          "South America",
          "Oceania",
        ]),
        population: z.number(),
        year: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
  {
    name: "globalPopulation",
    description:
      "A tool to get global population trends with optional year range filtering",
    tool: getGlobalPopulationTrend,
    inputSchema: z.object({
      startYear: z.number().optional(),
      endYear: z.number().optional(),
    }),
    outputSchema: z.array(
      z.object({
        year: z.number(),
        population: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
  {
  name: "getPantryIngredients",
  description: "Get list of all available ingredients from the user's pantry. Use this when user asks 'what do I have', 'show my pantry', 'what ingredients are available'",
  tool: getPantryIngredients,
  inputSchema: z.object({}),  // ✅ Correct for tools
  outputSchema: z.array(z.object({
    name: z.string(),
    category: z.string(),
    available: z.boolean().optional(),
  })),
},
{
    name: "analyzeHealthReport",
    description: "Analyze a medical health checkup report or lab results image to extract key health metrics and nutritional deficiencies. Use when user uploads a medical report or mentions they have lab results.",
    tool: analyzeHealthReport,  // ✅ This must be the actual function
    inputSchema: z.object({
      imageBase64: z.string().describe("Base64 encoded medical report image"),
    }),
    outputSchema: z.object({
      reportDate: z.string().optional(),
      metrics: z.array(z.object({
        name: z.string(),
        value: z.string(),
        normalRange: z.string(),
        status: z.enum(["normal", "low", "high", "critical"]),
        recommendation: z.string().optional(),
      })),
      summary: z.string(),
      urgency: z.enum(["routine", "monitor", "consult_doctor"]),
    }),
  },
];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  {
    name: "Graph",
    description:
      "A component that renders various types of charts (bar, line, pie) using Recharts. Supports customizable data visualization with labels, datasets, and styling options.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "DataCard",
    description:
      "A component that displays options as clickable cards with links and summaries with the ability to select multiple items.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },
  {
    name: "RecipeCard",
    description: "Displays a detailed recipe with ingredients, cooking instructions, cuisine type, cooking time, difficulty level, and dietary information (vegan, gluten-free, lactose-free, etc.)",
    component: RecipeCard,
    propsSchema: z.object({
      title: z.string().describe("Name of the recipe"),
      cuisine: z.string().describe("Type of cuisine (Indian, Thai, Chinese, Italian, etc.)"),
      cookTime: z.number().describe("Total cooking time in minutes"),
      difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("Difficulty level"),
      ingredients: z.array(z.string()).describe("List of ingredients with quantities"),
      instructions: z.array(z.string()).describe("Step-by-step cooking instructions"),
      dietary: z.array(z.string()).optional().describe("Dietary tags: vegan, vegetarian, gluten-free, lactose-free, nut-free, halal, etc."),
    }),
  },
  {
  name: "MealPlanCalendar",
  description: "Use this component when the user asks to plan meals for the week, wants a meal plan, asks 'what should I eat this week', or requests weekly menu planning. Shows a 7-day calendar with breakfast, lunch, and dinner suggestions.",
  component: MealPlanCalendar,
  propsSchema: z.object({
    weekPlan: z.array(z.object({
      day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
      breakfast: z.string().optional().describe("Breakfast meal name"),
      lunch: z.string().optional().describe("Lunch meal name"),
      dinner: z.string().optional().describe("Dinner meal name"),
    })),
    title: z.string().optional().describe("Title for the meal plan"),
  }),
},
{
  name: "QuickRecipeSuggestions",
  description: "Use this component when the user asks 'what should I cook today', wants quick recipe ideas, asks for suggestions based on ingredients, or needs multiple options to choose from. Shows a grid of recipe cards with quick overview info.",
  component: QuickRecipeSuggestions,
  propsSchema: z.object({
    suggestions: z.array(z.object({
      name: z.string().describe("Recipe name"),
      cuisine: z.string().describe("Cuisine type"),
      cookTime: z.number().describe("Cooking time in minutes"),
      difficulty: z.enum(["Easy", "Medium", "Hard"]),
      matchPercentage: z.number().optional().describe("How well it matches available ingredients (0-100)"),
      dietary: z.array(z.string()).optional().describe("Dietary tags"),
    })),
    title: z.string().optional().describe("Section title"),
    subtitle: z.string().optional().describe("Additional context or description"),
  }),
},

{
  name: "CookingTimerAssistant",
  description: "Use this component when the user is actively cooking and needs step-by-step guidance with timers. Triggers: 'start cooking', 'help me cook', 'guide me through the recipe', 'I'm cooking now'.",
  component: CookingTimerAssistant,
  propsSchema: z.object({
    recipeName: z.string(),
    steps: z.array(z.object({
      step: z.number(),
      instruction: z.string(),
      duration: z.number().optional().describe("Timer duration in minutes for this step"),
      timerActive: z.boolean().optional(),
    })),
  }),
},
{
  name: "PantrySelector",
  description: "ALWAYS use this component when user asks to see their pantry, show ingredients, list available items, or asks 'what do I have'. Displays all 800+ ingredients organized by category with counts.",
  component: PantrySelector,
  propsSchema: z.object({
    ingredients: z.array(z.object({
      name: z.string(),
      category: z.string(),
    })),
    title: z.string().optional(),
  }),
},
{
  name: "HealthAnalysisCard",
  description: "Use this component when analyzing a medical health checkup report or lab results. Shows extracted metrics, identifies deficiencies, and provides dietary recommendations. Trigger when user uploads a medical report or mentions lab results.",
  component: HealthAnalysisCard,
  propsSchema: z.object({
    reportDate: z.string().optional(),
    metrics: z.array(z.object({
      name: z.string().describe("Lab test name like 'Hemoglobin', 'Vitamin D', 'Iron', etc."),
      value: z.string().describe("Patient's test value"),
      normalRange: z.string().describe("Normal reference range"),
      status: z.enum(["normal", "low", "high", "critical"]),
      recommendation: z.string().optional().describe("Dietary recommendation for this metric"),
    })),
    summary: z.string().describe("Overall health summary from the report"),
    urgency: z.enum(["routine", "monitor", "consult_doctor"]).optional(),
  }),
},
  // Add more components here
];



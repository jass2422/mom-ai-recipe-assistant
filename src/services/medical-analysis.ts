interface HealthMetric {
  name: string;
  value: string;
  normalRange: string;
  status: "normal" | "low" | "high" | "critical";
  recommendation?: string;
}

interface HealthReport {
  reportDate?: string;
  metrics: HealthMetric[];
  summary: string;
  urgency: "routine" | "monitor" | "consult_doctor";
}

// This is the actual tool function that Tambo will call
export async function analyzeHealthReport(params: { imageBase64: string }): Promise<HealthReport> {
  try {
    const response = await fetch('/api/analyze-health-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: params.imageBase64 }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze health report');
    }

    return await response.json();
  } catch (error) {
    console.error('Health report analysis error:', error);
    // Return mock data as fallback
    return {
      reportDate: "Recent",
      metrics: [
        {
          name: "Hemoglobin",
          value: "10.2 g/dL",
          normalRange: "12-16 g/dL",
          status: "low",
          recommendation: "Increase iron-rich foods like spinach, red meat, lentils. Pair with vitamin C for better absorption."
        }
      ],
      summary: "Analysis temporarily unavailable. Using sample data.",
      urgency: "monitor"
    };
  }
}
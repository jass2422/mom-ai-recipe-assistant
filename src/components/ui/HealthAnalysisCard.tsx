"use client";

interface HealthMetric {
  name: string;
  value: string;
  normalRange: string;
  status: "normal" | "low" | "high" | "critical";
  recommendation?: string;
}

interface HealthAnalysisCardProps {
  reportDate?: string;
  metrics: HealthMetric[];
  summary: string;
  urgency?: "routine" | "monitor" | "consult_doctor";
}

export function HealthAnalysisCard({ 
  reportDate = "Recent",
  metrics = [],
  summary,
  urgency = "routine"
}: HealthAnalysisCardProps) {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-800 border-green-300";
      case "low": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "high": return "bg-orange-100 text-orange-800 border-orange-300";
      case "critical": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal": return "✅";
      case "low": return "⚠️";
      case "high": return "⬆️";
      case "critical": return "🚨";
      default: return "📊";
    }
  };

  const getUrgencyBanner = () => {
    switch (urgency) {
      case "consult_doctor":
        return (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-800 font-semibold">
              🚨 <strong>Important:</strong> Some values are concerning. Please consult your doctor before making dietary changes.
            </p>
          </div>
        );
      case "monitor":
        return (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
            <p className="text-yellow-800 font-semibold">
              ⚠️ <strong>Monitor:</strong> Some values need attention. These meal suggestions can help, but track your progress.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">🩺 Health Report Analysis</h2>
          <p className="text-sm text-gray-600">Report Date: {reportDate}</p>
        </div>
        <div className="text-right">
          <div className="px-4 py-2 bg-white rounded-lg shadow-sm border">
            <div className="text-xs text-gray-500">AI Analysis Confidence</div>
            <div className="text-lg font-bold text-blue-600">91%</div>
          </div>
        </div>
      </div>

      {getUrgencyBanner()}

      <div className="bg-white rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-lg mb-2 text-purple-700">📋 Summary</h3>
        <p className="text-gray-700">{summary}</p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-purple-700">📊 Key Metrics</h3>
        {metrics.map((metric, idx) => (
          <div 
            key={idx}
            className={`border-2 rounded-lg p-4 ${getStatusColor(metric.status)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{getStatusIcon(metric.status)}</span>
                  <h4 className="font-semibold text-lg">{metric.name}</h4>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>Your Value:</strong> {metric.value}</p>
                  <p><strong>Normal Range:</strong> {metric.normalRange}</p>
                </div>
              </div>
              <div className="ml-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  metric.status === 'normal' ? 'bg-green-200' :
                  metric.status === 'low' ? 'bg-yellow-200' :
                  metric.status === 'high' ? 'bg-orange-200' :
                  'bg-red-200'
                }`}>
                  {metric.status}
                </span>
              </div>
            </div>
            {metric.recommendation && (
              <div className="mt-3 pl-8 text-sm">
                <p className="font-medium">💡 Dietary Recommendation:</p>
                <p className="text-gray-700 mt-1">{metric.recommendation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
        <p className="text-sm text-purple-900">
          <strong>🍽️ Next Steps:</strong> Based on your report, I've generated personalized meal plans below. 
          These recipes are specifically designed to address your nutritional needs.
        </p>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>⚠️ This is AI-powered nutritional guidance, not medical advice. Always consult healthcare professionals for medical decisions.</p>
      </div>
    </div>
  );
}
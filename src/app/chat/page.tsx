"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";

/**
 * Home page component that renders the Tambo chat interface.
 *
 * @remarks
 * The `NEXT_PUBLIC_TAMBO_URL` environment variable specifies the URL of the Tambo server.
 * You do not need to set it if you are using the default Tambo server.
 * It is only required if you are running the API server locally.
 *
 * @see {@link https://github.com/tambo-ai/tambo/blob/main/CONTRIBUTING.md} for instructions on running the API server locally.
 */
export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      {/* Custom Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">👩‍🍳</div>
            <div>
              <h1 className="text-2xl font-bold">Mom AI</h1>
              <p className="text-sm text-green-100">Clinical Recipe Assistant</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-green-100">Powered by Tambo AI</div>
            <div className="text-sm font-semibold">800+ Ingredients • 91% Accuracy</div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <TamboProvider
          apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
          components={components}
          tools={tools}
        >
          <MessageThreadFull />
        </TamboProvider>
      </div>
    </div>
  );
}


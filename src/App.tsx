import { useState } from "react";
import "./App.css";
import MutationExample from "./components/MutationExample";
import QueryExample from "./components/QueryExample";
import CachingExample from "./components/CachingExample";

function App() {
    const [activeTab, setActiveTab] = useState<
        "query" | "mutation" | "caching"
    >("query");

    return (
        <div className="mx-auto max-w-4xl p-6">
            <div className="mb-6 flex gap-2 border-b">
                <button
                    onClick={() => setActiveTab("query")}
                    className={`rounded-t-lg px-4 py-2 font-medium transition ${
                        activeTab === "query"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Query Example
                </button>

                <button
                    onClick={() => setActiveTab("mutation")}
                    className={`rounded-t-lg px-4 py-2 font-medium transition ${
                        activeTab === "mutation"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Mutation Example
                </button>

                <button
                    onClick={() => setActiveTab("caching")}
                    className={`rounded-t-lg px-4 py-2 font-medium transition ${
                        activeTab === "caching"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    Caching Example
                </button>
            </div>

            <div className="rounded-lg border p-4">
                {activeTab === "query" && <QueryExample />}
                {activeTab === "mutation" && <MutationExample />}
                {activeTab === "caching" && <CachingExample />}
            </div>
        </div>
    );
}

export default App;

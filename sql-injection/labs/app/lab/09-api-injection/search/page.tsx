"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, Package, Eye, EyeOff } from "lucide-react";
import HintSystem from "@/app/components/lab-shared/HintSystem";
import QueryVisualizer from "@/app/components/lab-shared/QueryVisualizer";

const hints = [
  {
    title: "Hint 1 - API Endpoint",
    text: "The search API passes user input directly to SQL. Inject via the query parameter.",
  },
  {
    title: "Hint 2 - UNION Injection",
    text: "Use UNION to read store_admin_secrets: ' UNION SELECT 1,secret_name,secret_value,4,5,6,7 FROM store_admin_secrets --",
  },
  {
    title: "Hint 3 - Extract Keys",
    text: "The admin_secrets table contains payment gateway keys, AWS credentials, and JWT signing keys.",
  },
];

export default function Lab09Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<{ id: number; sku: string; name: string; description: string; category: string; price: number; stock: number }[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [showQuery, setShowQuery] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    setError("");
    try {
      const res = await fetch(`/api/lab09-search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
      } else {
        setError(data.details || "Search failed");
      }
    } catch {
      setError("Connection failed");
    }
  };

  const normalQuery = `GET /api/lab09-search?q=${"laptop"}`;
  const injectedQuery = `GET /api/lab09-search?q=${query}`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button onClick={() => router.push("/lab/09-api-injection")} className="mb-2 flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-mono text-2xl font-bold text-cyan-400">Product Catalog</h1>
          <p className="text-sm text-zinc-500">Search products via API endpoint</p>
        </div>
        <button onClick={async () => { await fetch("/api/lab09-logout", { method: "POST" }); router.push("/lab/09-api-injection/search"); }} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:text-white">Logout</button>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 font-mono text-white placeholder-zinc-500 outline-none focus:border-cyan-500" />
          </div>
          <button type="submit" className="rounded-lg bg-cyan-500 px-6 py-3 font-mono text-sm font-bold text-black transition-colors hover:bg-cyan-400">Search</button>
        </div>
      </form>

      <button onClick={() => setShowQuery(!showQuery)} className="mb-6 flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300">
        {showQuery ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
        {showQuery ? "Hide" : "Show"} Query Visualizer
      </button>

      {showQuery && <div className="mb-6"><QueryVisualizer normalQuery={normalQuery} injectedQuery={injectedQuery} explanation="The API endpoint passes user input directly to SQL. Inject via the query parameter to access admin secrets." /></div>}

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-mono text-sm text-red-400">{error}</p>
        </div>
      )}

      {searched && !error && (
        <div className="mb-6 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
          <p className="font-mono text-sm text-cyan-400">Found {products.length} products</p>
        </div>
      )}

      <div className="space-y-4">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border border-white/10 bg-[#0b0f17] p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-mono text-lg font-semibold text-white">{p.name}</h3>
                </div>
                <p className="text-sm text-zinc-400">{p.description}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg text-cyan-400">${p.price}</p>
                <p className="text-xs text-zinc-500">{p.stock} in stock</p>
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-400">{p.category}</span>
              <span className="rounded bg-white/5 px-2 py-0.5 text-xs text-zinc-400">{p.sku}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <HintSystem hints={hints} />
      </div>
    </div>
  );
}

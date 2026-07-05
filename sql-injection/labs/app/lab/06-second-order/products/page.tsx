"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import HintSystem from "@/app/components/lab-shared/HintSystem";
import QueryVisualizer from "@/app/components/lab-shared/QueryVisualizer";

const hints = [
  {
    title: "Hint 1 - Store First",
    text: "The payload should be placed in the username during registration. It is not expected to execute immediately.",
  },
  {
    title: "Hint 2 - Trigger Later",
    text: "After logging in, the profile update uses the stored username in a new query.",
  },
  {
    title: "Hint 3 - Error Leak",
    text: "A CAST failure in the profile update can reveal text from shop_admin_notes.",
  },
];

export default function Lab06Products() {
  const router = useRouter();
  const [products, setProducts] = useState<{ id: number; name: string; description: string; price: number; category: string; stock: number }[]>([]);
  const [showQuery, setShowQuery] = useState(false);

  useEffect(() => {
    fetch("/api/lab06-products").then((r) => r.json()).then((d) => setProducts(d.products || []));
  }, []);

  const normalQuery = `SELECT * FROM shop_products WHERE name LIKE '%${"laptop"}%'`;
  const injectedQuery = `-- Profile update query (second-order):\nUPDATE shop_users SET email='...' WHERE username='<stored_username>'`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button onClick={() => router.push("/lab/06-second-order")} className="mb-2 flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-mono text-2xl font-bold text-[#00f3ff]">Product Catalog</h1>
          <p className="text-sm text-zinc-500">Browse products, then register to edit a profile</p>
        </div>
        <div className="flex gap-2">
          <a href="/lab/06-second-order/cart" className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-[#00f3ff] hover:border-[#00f3ff]">Cart</a>
          <a href="/lab/06-second-order/profile" className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-[#00f3ff] hover:border-[#00f3ff]">Profile</a>
          <button onClick={async () => { await fetch("/api/lab06-logout", { method: "POST" }); }} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:text-white">Logout</button>
        </div>
      </div>

      <button onClick={() => setShowQuery(!showQuery)} className="mb-6 flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300">
        {showQuery ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
        {showQuery ? "Hide" : "Show"} Query Visualizer
      </button>

      {showQuery && <div className="mb-6"><QueryVisualizer normalQuery={normalQuery} injectedQuery={injectedQuery} explanation="Second-order injection: the payload is stored during registration and executed later during profile update." /></div>}

      <div className="mb-6 rounded-xl border border-[#00f3ff]/20 bg-[#00f3ff]/5 p-5">
        <h2 className="mb-2 font-mono text-sm font-bold text-[#00f3ff]">Fulfillment Brief</h2>
        <p className="text-sm leading-relaxed text-zinc-300">
          The catalog is clean. The interesting path is account creation followed by profile edit,
          where stored customer data is reused by a legacy update query.
        </p>
      </div>

      <div className="space-y-4">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border border-white/10 bg-[#0b0f17] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-mono text-lg font-semibold text-white">{p.name}</h3>
                <p className="text-sm text-zinc-400">{p.description}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg text-[#00f3ff]">${p.price}</p>
                <p className="text-xs text-zinc-500">{p.stock} in stock</p>
              </div>
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

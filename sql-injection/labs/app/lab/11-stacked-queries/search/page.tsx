"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, Bed, Lock, Eye, EyeOff } from "lucide-react";
import HintSystem from "@/app/components/lab-shared/HintSystem";
import QueryVisualizer from "@/app/components/lab-shared/QueryVisualizer";

const hints = [
  {
    title: "Hint 1 - Stacked Queries",
    text: "The search allows multiple statements using semicolons. Inject an UPDATE to change your role.",
  },
  {
    title: "Hint 2 - Role Escalation",
    text: "Use: test'; UPDATE booking_users SET role='admin' WHERE username='guest.alice'; --",
  },
  {
    title: "Hint 3 - Access VIP",
    text: "After escalation, refresh the page to access VIP notes with admin privileges.",
  },
];

export default function Lab11Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [rooms, setRooms] = useState<{ id: number; room_number: string; room_type: string; floor: number; price_per_night: number; status: string; amenities: string }[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [showQuery, setShowQuery] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    setError("");
    try {
      const res = await fetch(`/api/lab11-rooms?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (res.ok) {
        setRooms(data.rooms);
      } else {
        setError(data.details || "Search failed");
      }
    } catch {
      setError("Connection failed");
    }
  };

  const normalQuery = `SELECT id, room_number, room_type, floor, price_per_night, status, amenities\nFROM booking_rooms\nWHERE room_type LIKE '%${"Suite"}%' OR amenities LIKE '%${"Suite"}%'`;
  const injectedQuery = `SELECT id, room_number, room_type, floor, price_per_night, status, amenities\nFROM booking_rooms\nWHERE room_type LIKE '%${query}%' OR amenities LIKE '%${query}%'`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 pt-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button onClick={() => router.push("/lab/11-stacked-queries")} className="mb-2 flex items-center gap-2 text-sm text-zinc-500 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="font-mono text-2xl font-bold text-amber-400">Room Search</h1>
          <p className="text-sm text-zinc-500">Search available rooms</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setError("Access denied: Admin role required")} className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:text-white">
            <Lock className="h-4 w-4" /> VIP Notes
          </button>
          <button onClick={async () => { await fetch("/api/lab11-logout", { method: "POST" }); router.push("/lab/11-stacked-queries/search"); }} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:text-white">Logout</button>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by room type (e.g., Suite, Deluxe)..." className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 font-mono text-white placeholder-zinc-500 outline-none focus:border-amber-500" />
          </div>
          <button type="submit" className="rounded-lg bg-amber-500 px-6 py-3 font-mono text-sm font-bold text-black transition-colors hover:bg-amber-400">Search</button>
        </div>
      </form>

      <button onClick={() => setShowQuery(!showQuery)} className="mb-6 flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300">
        {showQuery ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
        {showQuery ? "Hide" : "Show"} Query Visualizer
      </button>

      {showQuery && <div className="mb-6"><QueryVisualizer normalQuery={normalQuery} injectedQuery={injectedQuery} explanation="The search allows multiple statements using semicolons. Inject UPDATE to change your role, then access VIP notes." /></div>}

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-mono text-sm text-red-400">{error}</p>
        </div>
      )}

      {searched && !error && (
        <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="font-mono text-sm text-amber-400">Found {rooms.length} rooms</p>
        </div>
      )}

      <div className="space-y-4">
        {rooms.map((r) => (
          <div key={r.id} className="rounded-xl border border-white/10 bg-[#0b0f17] p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-amber-400" />
                  <h3 className="font-mono text-lg font-semibold text-white">Room {r.room_number}</h3>
                </div>
                <p className="text-sm text-zinc-400">{r.room_type} - Floor {r.floor}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg text-amber-400">${r.price_per_night}/night</p>
                <span className={`rounded px-2 py-0.5 text-xs ${r.status === "available" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{r.status}</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-zinc-500">{r.amenities}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <HintSystem hints={hints} />
      </div>
    </div>
  );
}

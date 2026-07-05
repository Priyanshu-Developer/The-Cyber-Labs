import { getPool } from "@/lib/db";

export async function vulnerableRoomSearch(searchTerm: string) {
  const pool = await getPool();
  // VULNERABLE: String concatenation - Stacked queries
  const query = `SELECT id, room_number, room_type, floor, price_per_night, status, amenities FROM booking_rooms WHERE room_type LIKE '%${searchTerm}%' OR amenities LIKE '%${searchTerm}%' ORDER BY id`;
  const result = await pool.query(query);
  return result.rows;
}

export async function validateBookingUser(username: string, password: string) {
  const pool = await getPool();
  // VULNERABLE: String concatenation
  const query = `SELECT id, username, full_name, role, loyalty_points FROM booking_users WHERE username = '${username}' AND password = '${password}'`;
  const result = await pool.query(query);
  return result.rows[0] || null;
}

export async function createBookingSession(userId: number) {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  return token;
}

export async function validateBookingSession(token: string) {
  return { id: 1, username: 'demo', role: 'guest' };
}

export async function deleteBookingSession() {
  return true;
}

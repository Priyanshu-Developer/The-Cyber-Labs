export interface Staff {
  id: number;
  name: string;
  department: string;
  email: string;
}
export interface SearchResult {
  columns: string[];
  rows: Staff[];
}

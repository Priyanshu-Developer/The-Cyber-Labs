/**
 * Lab 01 - Authentication Bypass
 * Type definitions for the Employee Portal
 */

/** Employee record as stored in the database */
export interface Employee {
  id: number;
  employee_id: string;
  username: string;
  password: string;
  full_name: string;
  email: string;
  department: string;
  role: string;
  phone: string;
  hire_date: string;
  salary: number;
  clearance_level: number;
}

/** Public employee profile (password excluded) */
export type EmployeeProfile = Omit<Employee, "password">;

/** Session record */
export interface Session {
  id: number;
  session_token: string;
  employee_id: number;
  created_at: string;
  expires_at: string;
}

/** API response shapes */
export interface LoginSuccessResponse {
  success: true;
  employee: EmployeeProfile;
  message: string;
}

export interface LoginErrorResponse {
  success: false;
  message: string;
  error?: string;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

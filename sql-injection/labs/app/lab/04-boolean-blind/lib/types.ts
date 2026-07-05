export interface Patient {
  id: number;
  patient_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  diagnosis: string;
  treatment: string;
  attending_doctor: string;
  room_number: string;
}

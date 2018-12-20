export interface User {
  id: number;
  login: string;
  role?: string;
  password ?: string;
  password_confirmation ?: string;
  home_dir ?: string;
  created_at ?: string;
  updated_at ?: string;

}

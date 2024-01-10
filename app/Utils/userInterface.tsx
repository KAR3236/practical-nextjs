export interface RegisterDataInterface {
  id?: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  dob: string;
  role: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActiveUserInterface {
  email: string;
  status: string;
}

export interface LoginDataInterface {
  email: string;
  password: string;
}

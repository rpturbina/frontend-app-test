export interface User {
  name: string;
  address: string;
  gender: 'Pria' | 'Wanita';
  birthDate: string;
  createdAt: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

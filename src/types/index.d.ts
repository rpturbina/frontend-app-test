export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  gender: 'l' | 'p';
  born_date: string;
  created_at: string;
}

export interface UserDetailDTO {
  address: string;
  born_date: string;
  created_at: string;
  file: string;
  gender: 'l' | 'p';
  id: number;
  name: string;
  photo: string;
  user_id: number;
  user_name: string;
}

export type UserDetail = Omit<User, 'email' | 'password'>;

export type UserList = UserDetail[];

export type UserLogin = Pick<User, 'email' | 'password'>;

export interface UserRegister
  extends Pick<User, 'name' | 'email' | 'password'> {
  confirmPassword?: string;
}

export type UserCreate = Omit<User, 'email' | 'password'>;

export type UserUpdate = UserCreate;

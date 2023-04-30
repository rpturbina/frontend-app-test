export type Gender = 'l' | 'p';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  gender: Gender;
  born_date: Date | string;
  created_at: string;
}

export type UserDetail = Omit<User, 'email' | 'password'>;

export type UserList = UserDetail[];

export type UserLogin = Pick<User, 'email' | 'password'>;

export type UserCreate = Omit<User, 'email' | 'password' | 'id'> & {
  created_at?: string;
};

export type UserRegister = Pick<User, 'name' | 'email' | 'password'> & {
  confirmPassword?: string;
};

export type UserUpdate = Omit<User, 'email' | 'password' | 'created_at'>;

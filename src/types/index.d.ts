export interface User {
  name: string;
  email: string;
  password: string;
  address: string;
  gender: 'Pria' | 'Wanita';
  bornDate: string;
  createdAt: string;
}

export type UserDetail = Omit<User, 'email' | 'password'>;

export type UserList = UserDetail[];

export type UserLogin = Pick<User, 'email' | 'password'>;

export interface UserRegister
  extends Pick<User, 'name' | 'email' | 'password'> {
  confirmPassword?: string;
}

export type UserAdd = Omit<User, 'createdAt' | 'email' | 'password'>;

export type UserUpdate = Partial<UserAdd>;

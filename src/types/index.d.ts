type Gender = 'l' | 'p';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  gender: Gender;
  born_date: Date | string;
  created_at: string;
}

type UserDetail = Omit<User, 'email' | 'password'>;

type UserList = UserDetail[];

type UserLogin = Pick<User, 'email' | 'password'>;

type UserCreate = Omit<User, 'email' | 'password' | 'id'> & {
  created_at?: string;
};

type UserRegister = Pick<User, 'name' | 'email' | 'password'> & {
  confirmPassword?: string;
};

type UserUpdate = Omit<User, 'email' | 'password' | 'created_at'>;

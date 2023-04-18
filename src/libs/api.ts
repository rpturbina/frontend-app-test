import { UserLogin, UserRegister } from '@/types';

interface LoginDTO {
  token: string;
  detail: string;
}

type APIResponse<T> = {
  isOk: boolean;
  data: T extends null ? null : T;
  error: T extends null ? string : null;
};

type LoginSuccess = APIResponse<LoginDTO>;

type LoginError = APIResponse<null>;

type LoginResponse = LoginSuccess | LoginError;

type RegisterDTO = LoginDTO;

type RegisterSuccess = APIResponse<RegisterDTO>;

type RegisterError = APIResponse<null>;

type RegisterResponse = RegisterSuccess | RegisterError;

export const API_BASE_URL = 'https://cms-admin-v2.ihsansolusi.co.id/testapi';

export const login = async ({
  email,
  password,
}: UserLogin): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error: LoginDTO = await res.json();
      throw new Error(error.detail);
    }

    const data: LoginDTO = await res.json();

    return { isOk: true, data, error: null };
  } catch (error) {
    return { isOk: false, error: (error as Error).message, data: null };
  }
};

// export const logout = async (token: string): Promise<void> => {
//   await fetch(`${API_BASE_URL}/auth/logout`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const register = async ({
  name,
  email,
  password,
}: UserRegister): Promise<RegisterResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const error: RegisterDTO = await res.json();
      throw new Error(error.detail);
    }

    const data: RegisterDTO = await res.json();

    return { isOk: true, data, error: null };
  } catch (error) {
    return { isOk: false, error: (error as Error).message, data: null };
  }
};

// export const getAllUsers = () => {
//   const { data, error } = useSWR<User[]>(`${API_BASE_URL}/users`, fetcher);

//   return {
//     data: data ?? [],
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

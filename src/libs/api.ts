import { UserCreate, UserLogin, UserRegister } from '@/types';

interface LoginDTO {
  token: string;
  detail: string;
}

interface RegisterDTO {
  token: string;
  detail: string;
}

export interface APIResponse<T> {
  isOk: boolean;
  data: T | null;
  error: string | null;
}

export type ResponseStatus<T> = APIResponse<T | null>;

export const API_BASE_URL = 'https://cms-admin-v2.ihsansolusi.co.id/testapi';

export const login = async ({
  email,
  password,
}: UserLogin): Promise<ResponseStatus<LoginDTO>> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data: LoginDTO | null = await res.json();

    if (!res.ok) {
      throw new Error(
        data?.detail || 'An error occurred while fetching the data.'
      );
    }

    return { isOk: true, data, error: null };
  } catch (error) {
    return { isOk: false, error: (error as Error).message, data: null };
  }
};

export const register = async ({
  name,
  email,
  password,
}: UserRegister): Promise<ResponseStatus<RegisterDTO>> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data: RegisterDTO | null = await res.json();

    if (!res.ok) {
      throw new Error(
        data?.detail || 'An error occurred while fetching the data.'
      );
    }

    return { isOk: true, data, error: null };
  } catch (error) {
    return { isOk: false, error: (error as Error).message, data: null };
  }
};

const _fetchWithAuth = async (
  url: RequestInfo,
  token: string | null,
  options: RequestInit = {}
) =>
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

export interface UserCreateDTO {
  detail: string;
}

export const createUser = async (
  { name, address, gender, bornDate }: UserCreate,
  token: string | null
): Promise<ResponseStatus<UserCreateDTO>> => {
  const newUser = {
    name,
    address,
    gender: gender === 'Laki-laki' ? 'l' : 'p',
    born_date: bornDate,
  };
  try {
    const res = await _fetchWithAuth(`${API_BASE_URL}/user`, token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const data: UserCreateDTO | null = await res.json();

    if (!res.ok) {
      throw new Error(
        data?.detail || 'An error occurred while fetching the data.'
      );
    }

    return { isOk: true, data, error: null };
  } catch (error) {
    return { isOk: false, error: (error as Error).message, data: null };
  }
};

export const deleteUser = async (id: number, token: string | null) => {
  try {
    const res = await _fetchWithAuth(`${API_BASE_URL}/user/${id}`, token, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    return { isOk: true, error: null };
  } catch (error) {
    return { isOk: false, error: (error as Error).message };
  }
};

// import { fetchApi } from './fetch';
import { User, UserCreate, UserLogin, UserRegister, UserUpdate } from '@/types';

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
    // console.log(res.statusText, 'login');
    const data: LoginDTO | null = await res.json();

    // console.log(data, 'login');

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

// export const login = async ({ email, password }: UserLogin) => {
//   try {
//     const res = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     // if (typeof res === '')
//     // if (!res.isOk) {
//     //   throw new Error(
//     //     res. || 'An error occurred while fetching the data.'
//     //   );
//     // }

//     return res;

//     // const data: LoginDTO | null = await res.json();

//     // console.log(data, 'login');

//     // if (!res.ok) {
//     //   throw new Error(
//     //     data?.detail || 'An error occurred while fetching the data.'
//     //   );
//     // }

//     // return { isOk: true, data, error: null };
//   } catch (error) {
//     // return { isOk: false, error: (error as Error).message, data: null };
//   }
// };

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

    // console.log(data, 'register');

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
  data: User;
}

export interface UserUpdateDTO {
  detail: string;
  data: User;
}

export const createUser = async (
  { name, address, gender, born_date }: UserCreate,
  token: string | null
): Promise<ResponseStatus<UserCreateDTO>> => {
  const newUser = {
    name,
    address,
    gender,
    born_date,
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

    // console.log(data, 'createUser');
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

export const updateUser = async (
  { id, name, address, gender, born_date }: UserUpdate,
  token: string | null
): Promise<ResponseStatus<UserUpdateDTO>> => {
  const updatedUser = {
    name,
    address,
    gender,
    born_date,
  };
  try {
    const res = await _fetchWithAuth(`${API_BASE_URL}/user/${id}`, token, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    const data: UserUpdateDTO | null = await res.json();

    // console.log(data, 'updateUser');

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

    // const data = await res.json();

    // console.log(data, 'deleteUser');

    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    return { isOk: true, error: null };
  } catch (error) {
    return { isOk: false, error: (error as Error).message };
  }
};

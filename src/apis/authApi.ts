import { fetchBase } from '@/apis/apiBase';

interface LoginDTO {
  token: string;
  detail: string;
}

interface RegisterDTO {
  token: string;
  detail: string;
}

interface AuthResponse {
  success: boolean;
  data: LoginDTO | RegisterDTO | null;
  error: string | null;
}

const login = async ({ email, password }: UserLogin): Promise<AuthResponse> => {
  try {
    const res = await fetchBase('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data = (await res.json()) as LoginDTO;

    if (!res.ok) {
      throw new Error(
        data.detail || 'An error occurred while fetching the data.'
      );
    }

    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null };
  }
};

const register = async ({
  name,
  email,
  password,
}: UserRegister): Promise<AuthResponse> => {
  try {
    const res = await fetchBase('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = (await res.json()) as RegisterDTO;

    if (!res.ok) {
      throw new Error(
        data.detail || 'An error occurred while fetching the data.'
      );
    }

    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null };
  }
};

export default { login, register };

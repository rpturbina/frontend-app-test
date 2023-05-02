import { fetchWithAuth } from '@/apis/apiBase';

export interface UserDTO {
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

export type UserDTOList = UserDTO[];

interface UserAPIResponse<T> {
  detail?: string;
  message?: string;
  data: T | null;
}

export interface APIResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
  error?: string;
}

const convertUserDTOListToUserList = (users: UserDTOList): UserList =>
  users.map((user) => ({
    id: user.id,
    name: user.name,
    address: user.address,
    gender: user.gender,
    born_date: user.born_date,
    created_at: user.created_at,
  }));

const convertUserDTOToUserDetail = (user: UserDTO): UserDetail => ({
  id: user.id,
  name: user.name,
  address: user.address,
  gender: user.gender,
  born_date: user.born_date,
  created_at: user.created_at,
});

const getAllUser = async (): Promise<APIResponse<UserList>> => {
  const res = await fetchWithAuth('/user', {
    method: 'GET',
  });

  const { data, detail, message } =
    (await res.json()) as UserAPIResponse<UserDTOList>;

  if (!res.ok) {
    throw new Error(detail || 'An error occurred while fetching the data.');
  }

  const convertedData = convertUserDTOListToUserList(data as UserDTOList);

  return { success: true, data: convertedData, message };
};

const getUserById = async (id: number): Promise<APIResponse<UserDetail>> => {
  const res = await fetchWithAuth(`/user/${id}`, {
    method: 'GET',
  });

  const { data, detail, message } =
    (await res.json()) as UserAPIResponse<UserDTO>;

  if (!res.ok) {
    throw new Error(detail || 'An error occurred while fetching the data.');
  }

  const convertedData = convertUserDTOToUserDetail(data as UserDTO);

  return { success: true, data: convertedData, message };
};

const createUser = async ({
  name,
  address,
  gender,
  born_date,
}: UserCreate): Promise<APIResponse<UserDetail>> => {
  const newUser = {
    name,
    address,
    gender,
    born_date,
  };
  try {
    const res = await fetchWithAuth('/user', {
      method: 'POST',
      body: JSON.stringify(newUser),
    });

    const { data, detail, message } =
      (await res.json()) as UserAPIResponse<UserDTO>;

    if (!res.ok) {
      throw new Error(detail || 'An error occurred while fetching the data.');
    }

    const convertedData = convertUserDTOToUserDetail(data as UserDTO);

    return { success: true, data: convertedData, message };
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null };
  }
};

const updateUser = async ({
  id,
  name,
  address,
  gender,
  born_date,
}: UserUpdate): Promise<APIResponse<UserDetail>> => {
  const updatedUser = {
    name,
    address,
    gender,
    born_date,
  };
  try {
    const res = await fetchWithAuth(`/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
    });

    const { data, detail, message } =
      (await res.json()) as UserAPIResponse<UserDTO>;

    if (!res.ok) {
      throw new Error(detail || 'An error occurred while fetching the data.');
    }

    const convertedData = convertUserDTOToUserDetail(data as UserDTO);

    return { success: true, data: convertedData, message };
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null };
  }
};

const deleteUser = async (id: number): Promise<APIResponse<null>> => {
  try {
    const res = await fetchWithAuth(`/user/${id}`, {
      method: 'DELETE',
    });

    const { detail } = (await res.json()) as UserAPIResponse<UserDTO>;

    if (!res.ok) {
      throw new Error(detail || 'An error occurred while fetching the data.');
    }

    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: (error as Error).message, data: null };
  }
};

export default {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

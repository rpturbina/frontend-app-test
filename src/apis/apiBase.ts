export const API_BASE_URL = 'https://cms-admin-v2.ihsansolusi.co.id/testapi';

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const uri = API_BASE_URL + url;
  const token = localStorage.getItem('token');
  return fetch(uri, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ? token : ''}`,
    },
  });
};

export const fetchBase = async (url: string, options: RequestInit = {}) => {
  const uri = API_BASE_URL + url;
  return fetch(uri, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });
};

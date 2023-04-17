// import { RegisterUser } from '@/types';

// const BASE_URL = 'https://cms-admin.ihsansolusi.co.id/testapi';

// export const signUp = async ({ name, email, password }: RegisterUser) => {
//   const response = await fetch(`${BASE_URL}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name, email, password }),
//   });
//   console.log(response.ok);

//   if (!response.ok) {
//     throw new Error(
//       `HTTP error! status ${response.status}: ${response.statusText}`,
//     );
//   }

//   const data = await response.json();

//   return data;
// };

export {};

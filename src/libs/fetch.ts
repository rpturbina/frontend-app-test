// export interface ApiSuccessResponse<T> {
//   data: T;
//   message: string;
//   // isOk: boolean;
// }

// interface ApiSuccessResponseWithToken {
//   token: string;
//   detail: string;
//   // isOk: boolean;
// }

// type InputType =
//   | 'email'
//   | 'password'
//   | 'name'
//   | 'born_data'
//   | 'address'
//   | 'gender';

// type ValidationError = {
//   [key in InputType]?: string[];
// };

// type ValidationEmptyBodyError = {
//   loc: string[];
//   msg: string;
//   type: string;
// };

// interface ApiErrorResponse {
//   detail: string | ValidationError[] | ValidationEmptyBodyError[];
//   // isOk: boolean;
// }

// // type ApiResponse<T> =
// //   | ApiSuccessResponse<T>
// //   | ApiSuccessResponseWithToken
// //   | ApiErrorResponse;

// // type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// export const fetchApi = async <T>(
//   url: string,
//   options?: RequestInit
//   // method: HttpMethod = 'GET'
// ): Promise<T> => {
//   // ApiSuccessResponse<T> | ApiSuccessResponseWithToken | ApiErrorResponse
//   const response = await fetch(url, {
//     // method,
//     // headers: {
//     //   'Content-Type': 'application/json',
//     // },
//     ...options,
//   });

//   if (!response.ok) {
//     // const errorResponse: ApiErrorResponse = {
//     //   isOk: false,
//     //   ...(await response.json()),
//     // };
//     const errorResponse: ApiErrorResponse = await response.json();
//     return errorResponse as ApiErrorResponse;
//   }

//   const data = await response.json();

//   if ('token' in data) {
//     const successResponse: ApiSuccessResponseWithToken = {
//       isOk: true,
//       ...data,
//     };
//     return successResponse;
//   }

//   const successResponse: ApiSuccessResponse<T> = {
//     isOk: true,
//     ...data,
//   };

//   return successResponse;
// };

export {};

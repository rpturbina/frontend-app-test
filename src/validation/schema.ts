import * as yup from 'yup';

import { UserCreate, UserLogin, UserRegister, UserUpdate } from '@/types';

export const userRegistrationSchema: yup.ObjectSchema<UserRegister> =
  yup.object({
    name: yup
      .string()
      .required('Nama harus diisi')
      .min(8, 'Nama minimal 8 karakter'),
    email: yup
      .string()
      .required('Email harus diisi')
      .email('Email tidak valid'),
    password: yup
      .string()
      .required('Password harus diisi')
      .min(8, 'Password minimal 8 karakter'),
    confirmPassword: yup
      .string()
      .required('Konfirmasi password harus diisi')
      .oneOf([yup.ref('password')], 'Password harus sama'),
  });

export const userLoginSchema: yup.ObjectSchema<UserLogin> = yup.object({
  email: yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: yup
    .string()
    .required('Password harus diisi')
    .min(8, 'Password minimal 8 karakter'),
});

export const userCreateSchema: yup.ObjectSchema<
  Omit<UserCreate, 'created_at'>
> = yup.object({
  name: yup
    .string()
    .required('Nama harus diisi')
    .min(8, 'Nama minimal 8 karakter'),
  gender: yup.string().oneOf(['l', 'p']).required('Pilih jenis kelamin'),
  born_date: yup
    .string()
    .required('Tanggal lahir harus diisi')
    .test(
      'maxDate',
      'Tanggal tidak bisa lebih dari hari ini',
      (value: string) => {
        const maxDate = new Date();
        const inputDate = new Date(value);
        return inputDate <= maxDate;
      }
    )
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus dalam "YYYY-MM-DD"'),
  address: yup.string().required('Alamat harus diisi'),
});

export const userUpdateSchema: yup.ObjectSchema<Omit<UserUpdate, 'id'>> =
  userCreateSchema;

import * as yup from 'yup';

import { UserLogin, UserRegister } from '@/types';

export const userRegistrationSchema: yup.ObjectSchema<UserRegister> =
  yup.object({
    name: yup
      .string()
      .required('Nama harus diisi')
      .min(8, 'Nama minimal 8 karakter'),
    email: yup
      .string()
      .email('Email tidak valid')
      .required('Email harus diisi'),
    password: yup
      .string()
      .required('Password harus diisi')
      .min(8, 'Password minimal 8 karakter'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Password harus sama')
      .required('Konfirmasi password harus diisi'),
  });

export const userLoginSchema: yup.ObjectSchema<UserLogin> = yup.object({
  email: yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: yup
    .string()
    .required('Password harus diisi')
    .min(8, 'Password minimal 8 karakter'),
});

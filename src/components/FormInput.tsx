import { FieldErrors, UseFormRegister } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormInputProps = {
  label: string;
  id: keyof FormData;
  type: 'text' | 'email' | 'password';
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  required: boolean;
};

const FormInput = ({ label, id, type, register, errors }: FormInputProps) => {
  return (
    <FormControl isInvalid={!!errors.name}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input id={id} type={type} {...register} />
      {errors.name?.type === 'required' && (
        <FormErrorMessage>
          Kolom {label.toLowerCase()} harus diisi
        </FormErrorMessage>
      )}
      {errors.name?.type === 'minLength' && (
        <FormErrorMessage>{label} minimal 8 karakter</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormInput;

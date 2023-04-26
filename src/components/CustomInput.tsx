import { RegisterOptions, useFormContext } from 'react-hook-form';

import { CheckIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

type InputProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'password' | 'date';
  validation?: RegisterOptions;
};

const CustomInput = ({
  id,
  label,
  placeholder,
  type = 'text',
  validation,
}: InputProps) => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors[id]} mt={4}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, validation)}
        />
        <InputRightElement>
          {touchedFields[id] && !errors[id] && <CheckIcon color={'green'} />}
        </InputRightElement>
      </InputGroup>
      {errors[id] && (
        <FormErrorMessage>{errors[id]?.message?.toString()}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CustomInput;

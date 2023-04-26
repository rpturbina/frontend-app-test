import { RegisterOptions, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from '@chakra-ui/react';

type DateInputProps = {
  label: string;
  id: string;
  placeholder: string;
  validation?: RegisterOptions;
};

const DateInput = ({ label, id, placeholder, validation }: DateInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl isInvalid={!!errors[id]} mt={4}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup>
        <Input
          id={id}
          type="date"
          placeholder={placeholder}
          {...register(id, validation)}
          max={new Date().toISOString().split('T')[0]}
        />
      </InputGroup>
      {errors[id] && (
        <FormErrorMessage>{errors[id]?.message?.toString()}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default DateInput;

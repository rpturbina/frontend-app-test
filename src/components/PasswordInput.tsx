import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import { CheckIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

type InputProps = {
  id?: string;
  label: string;
  placeholder: string;
  validation?: RegisterOptions;
  withConfirmationPassword?: boolean;
};

const PasswordInput = ({
  id = 'password',
  label,
  placeholder,
  validation,
  withConfirmationPassword = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();

  const handleTogglePassword = () => setShowPassword((prevState) => !prevState);
  return (
    <>
      <FormControl isInvalid={!!errors[id]} mt={4}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <InputGroup>
          <Input
            id={id}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            {...register(id, validation)}
          />
          <InputRightElement>
            <Button variant={'ghost'} onClick={handleTogglePassword}>
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors[id] && (
          <FormErrorMessage>{errors[id]?.message?.toString()}</FormErrorMessage>
        )}
      </FormControl>
      {withConfirmationPassword && (
        <FormControl isInvalid={!!errors['confirmPassword']} mt={4}>
          <FormLabel htmlFor={'confirmPassword'}>Konfirmasi Password</FormLabel>
          <InputGroup>
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Konfirmasi password"
              {...register('confirmPassword', validation)}
            />
            <InputRightElement>
              {touchedFields['confirmPassword'] &&
                !errors['confirmPassword'] && <CheckIcon color={'green'} />}
            </InputRightElement>
          </InputGroup>
          {errors['confirmPassword'] && (
            <FormErrorMessage>
              {errors['confirmPassword']?.message?.toString()}
            </FormErrorMessage>
          )}
        </FormControl>
      )}
    </>
  );
};

export default PasswordInput;

import * as React from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Link as NavLink, useNavigate } from 'react-router-dom';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';

import { register as registerUser } from '@/libs/api';
import { UserRegister } from '@/types';
import { isEmpty } from '@/utils';

const RegisterForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UserRegister>();

  const password = useWatch({
    name: 'password',
    control,
    defaultValue: '',
  });

  const onSubmit: SubmitHandler<UserRegister> = async ({
    name,
    email,
    password,
  }) => {
    setIsLoading(true);
    const { isOk, error } = await registerUser({ name, email, password });

    if (isOk) {
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    }

    if (!isOk) {
      toast({
        title: 'An error occurred. Please try again later.',
        description: error || 'Unable to create your account.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <Box
      w="full"
      maxW="md"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Box p={6} bgColor={'white'}>
        <Heading as={'h2'} size={'lg'} textAlign={'center'}>
          Register
        </Heading>
        <Box as="form" mt={4} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Nama</FormLabel>
            <Input
              id="name"
              type="text"
              {...register('name', { required: true, minLength: 8 })}
            />
            {errors.name?.type === 'required' && (
              <FormErrorMessage>Kolom nama harus diisi</FormErrorMessage>
            )}
            {errors.name?.type === 'minLength' && (
              <FormErrorMessage>Nama minimal 8 karakter</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.email} mt={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email?.type === 'required' && (
              <FormErrorMessage>Kolom email harus diisi</FormErrorMessage>
            )}
            {errors.email?.type === 'pattern' && (
              <FormErrorMessage>Email tidak valid</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password} mt={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                  minLength: 8,
                })}
              />
              <InputRightElement h={'full'}>
                <Button variant={'ghost'} onClick={handleTogglePassword}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password?.type === 'required' && (
              <FormErrorMessage>Kolom password harus diisi</FormErrorMessage>
            )}
            {errors.password?.type === 'minLength' && (
              <FormErrorMessage>Password minimal 8 karakter</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword} mt={4}>
            <FormLabel htmlFor="confirmPassword">Konfirmasi Password</FormLabel>
            <InputGroup>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: true,
                  validate: (value) => value === password,
                })}
              />
            </InputGroup>
            {errors.confirmPassword?.type === 'required' && (
              <FormErrorMessage>
                Kolom konfimasi password harus diisi
              </FormErrorMessage>
            )}
            {errors.confirmPassword?.type === 'validate' && (
              <FormErrorMessage>Password harus sama</FormErrorMessage>
            )}
          </FormControl>

          <Button
            mt={6}
            colorScheme="blue"
            size={'lg'}
            type="submit"
            isDisabled={!isEmpty(errors)}
            w={'full'}
            isLoading={isLoading}
            loadingText="Register"
          >
            Register
          </Button>

          <Text align={'center'} mt={6}>
            Sudah punya akun?{' '}
            <NavLink to={'/login'}>
              <Link as={'span'} color={'blue.400'}>
                Masuk
              </Link>
            </NavLink>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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

import { useAuth } from '@/context/auth';
import { login } from '@/libs/api';
// import { login } from '@/lib/service';
import { UserLogin } from '@/types';
import { isEmpty } from '@/utils';

const LoginForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const onSubmit: SubmitHandler<UserLogin> = async ({ email, password }) => {
    setIsLoading(true);
    const { isOk, data, error } = await login({ email, password });

    if (isOk && data !== null) {
      auth.login(data?.token);
      toast({
        title: 'Login success.',
        description: "Yuhu you're logged in.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard');
    }

    if (!isOk) {
      toast({
        title: 'An error occurred. Please try again later.',
        description: error,
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
          Login
        </Heading>
        <Box as="form" mt={4} onSubmit={handleSubmit(onSubmit)}>
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

          <Button
            mt={6}
            colorScheme="blue"
            size={'lg'}
            type="submit"
            isDisabled={!isEmpty(errors)}
            w={'full'}
            isLoading={isLoading}
            loadingText="Login"
          >
            Login
          </Button>

          <Text align={'center'} mt={6}>
            Belum punya akun?{' '}
            <NavLink to={'/register'}>
              <Link as={'span'} color={'blue.400'}>
                Daftar
              </Link>
            </NavLink>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;

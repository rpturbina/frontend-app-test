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
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as NavLink } from 'react-router-dom';

import { isEmpty } from '@/utils';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const myPromise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('foo');
    }, 500);
  });

const SignInForm = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({
    name,
    email,
    password,
  }) => {
    setIsLoading(true);
    console.log({ name, email, password });
    try {
      // await signUp({ name, email, password });
      await myPromise();
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (errors) {
      toast({
        title: 'Something went wrong. Please try again.',
        description: '',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
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
          Sign in
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
                  minLength: 6,
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
              <FormErrorMessage>Password minimal 6 karakter</FormErrorMessage>
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
            loadingText="Signing ip"
          >
            Sign In
          </Button>

          <Text align={'center'} mt={6}>
            Belum punya akun?{' '}
            <NavLink to={'/signup'}>
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

export default SignInForm;

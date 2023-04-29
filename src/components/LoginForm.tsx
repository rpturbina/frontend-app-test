import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link as NavLink, useNavigate } from 'react-router-dom';

import { Box, Button, Heading, Link, Text, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import CustomInput from '@/components/CustomInput';
import PasswordInput from '@/components/PasswordInput';

import { useAuth } from '@/context/auth';
import { login } from '@/libs/api';
import { UserLogin } from '@/types';
import { isEmpty } from '@/utils';
import { userLoginSchema } from '@/validation/schema';

const LoginForm = () => {
  const methods = useForm<UserLogin>({
    mode: 'onTouched',
    resolver: yupResolver(userLoginSchema),
  });
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

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
        <FormProvider {...methods}>
          <Box as="form" mt={4} onSubmit={methods.handleSubmit(onSubmit)}>
            <CustomInput
              id="email"
              label="Email"
              placeholder="Email"
              type="email"
            />
            <PasswordInput label="Password" placeholder="Password" />
            <Button
              mt={6}
              colorScheme="blue"
              size={'lg'}
              type="submit"
              isDisabled={!isEmpty(methods.formState.errors)}
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
        </FormProvider>
      </Box>
    </Box>
  );
};

export default LoginForm;

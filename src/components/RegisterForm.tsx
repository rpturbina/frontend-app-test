import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Link as NavLink, useNavigate } from 'react-router-dom';

import { Box, Button, Heading, Link, Text, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import CustomInput from '@/components/CustomInput';
import PasswordInput from '@/components/PasswordInput';

import { register as registerUser } from '@/libs/api';
import { UserRegister } from '@/types';
import { isEmpty } from '@/utils';
import { userRegistrationSchema } from '@/validation/schema';

const RegisterForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const methods = useForm<UserRegister>({
    mode: 'onTouched',
    resolver: yupResolver(userRegistrationSchema),
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
      navigate('/login');
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
        <FormProvider {...methods}>
          <Box as="form" mt={4} onSubmit={methods.handleSubmit(onSubmit)}>
            <CustomInput id="name" label="Nama" placeholder="Nama" />
            <CustomInput
              id="email"
              label="Email"
              placeholder="Email"
              type="email"
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              withConfirmationPassword
            />
            <Button
              mt={6}
              colorScheme="blue"
              size={'lg'}
              type="submit"
              isDisabled={!isEmpty(methods.formState.errors)}
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
        </FormProvider>
      </Box>
    </Box>
  );
};

export default RegisterForm;

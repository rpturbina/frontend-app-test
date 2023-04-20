import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  chakra,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { useAuth } from '@/context/auth';
import useUser from '@/hooks/useUser';
import { createUser } from '@/libs/api';
import { UserCreate } from '@/types';
import { formatDateToDateAndTimeGMT7, formatDateToYYYYMMDD } from '@/utils';

const ChakraPoweredDatePicker = chakra(DatePicker);

const AddUserModal = () => {
  const auth = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { mutateUser, users } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, formState, reset, control } =
    useForm<UserCreate>();

  const initialRef = React.useRef<HTMLInputElement | null>(null);
  const finalRef = React.useRef(null);

  const { ref, ...rest } = register('name', { required: true, minLength: 8 });

  const onSubmit: SubmitHandler<UserCreate> = async (data) => {
    const newUser = {
      ...data,
      born_date: formatDateToYYYYMMDD(data.born_date),
      created_at: formatDateToDateAndTimeGMT7(new Date().toISOString()),
    };
    console.log(newUser, 'newUser');

    setIsLoading(true);
    const { isOk, error } = await createUser(newUser, auth.token);

    if (isOk) {
      mutateUser({ ...users, data: [...users.data, newUser] });
      toast({
        title: 'User created successfully.',
        description: 'Yuhu you created a new user.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      reset();
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
    <>
      <Button
        size={['xs', 'sm']}
        onClick={onOpen}
        leftIcon={<AddIcon />}
        colorScheme="blue"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
      >
        Tambah User
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <ModalOverlay />
        <ModalContent as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Tambahkan user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              isInvalid={!!formState.errors.name}
              isDisabled={isLoading}
            >
              <FormLabel htmlFor="name">Nama</FormLabel>
              <Input
                id="name"
                type="text"
                {...rest}
                ref={(e) => {
                  ref(e);
                  initialRef.current = e;
                }}
              />
              {formState.errors.name?.type === 'required' && (
                <FormErrorMessage>Kolom nama harus diisi</FormErrorMessage>
              )}
              {formState.errors.name?.type === 'minLength' && (
                <FormErrorMessage>Nama minimal 8 karakter</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              mt={4}
              isInvalid={!!formState.errors.address}
              isDisabled={isLoading}
            >
              <FormLabel htmlFor="address">Alamat</FormLabel>
              <Input
                id="address"
                type="text"
                {...register('address', { required: true })}
              />
              {formState.errors.name?.type === 'required' && (
                <FormErrorMessage>Kolom alamat harus diisi</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              as="fieldset"
              mt={4}
              isInvalid={!!formState.errors.gender}
              isDisabled={isLoading}
            >
              <FormLabel as="legend">L/P</FormLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue="l"
                render={({ field }) => (
                  <RadioGroup value={field.value} onChange={field.onChange}>
                    <HStack spacing="24px">
                      <Radio value="l">Laki-laki</Radio>
                      <Radio value="p">Perempuan</Radio>
                    </HStack>
                  </RadioGroup>
                )}
              />
              <FormErrorMessage>Pilih jenis kelamin</FormErrorMessage>
            </FormControl>

            <FormControl
              mt={4}
              isInvalid={!!formState.errors.born_date}
              isDisabled={isLoading}
            >
              <FormLabel>Tanggal lahir</FormLabel>
              <Controller
                name="born_date"
                control={control}
                rules={{ required: true }}
                defaultValue={new Date().toISOString()}
                render={({ field }) => {
                  return (
                    <ChakraPoweredDatePicker
                      display="block"
                      borderRadius="md"
                      dateFormat="yyyy-MM-dd"
                      px={4}
                      py={2}
                      borderColor="gray.300"
                      selected={new Date(field.value)}
                      onChange={field.onChange}
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      todayButton={<Button>Today</Button>}
                      customInput={<Input />}
                      maxDate={new Date()}
                    />
                  );
                }}
              />
              <FormErrorMessage>Pilih tanggal lahir</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              isLoading={isLoading}
            >
              Save
            </Button>
            <Button
              isDisabled={isLoading}
              onClick={() => {
                onClose();
                reset();
              }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUserModal;

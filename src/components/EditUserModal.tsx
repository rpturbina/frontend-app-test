import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
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
import { updateUser } from '@/libs/api';
import { UserDetail, UserUpdate } from '@/types';
import { formatDateToYYYYMMDD } from '@/utils';

const ChakraPoweredDatePicker = chakra(DatePicker);

type EditUserModalProps = {
  initialValues: UserUpdate;
};

const EditUserModal = ({ initialValues }: EditUserModalProps) => {
  const auth = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { mutateUser, users } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, formState, reset, control } =
    useForm<UserUpdate>({ defaultValues: initialValues });

  const initialRef = React.useRef<HTMLInputElement | null>(null);
  const finalRef = React.useRef(null);

  const { ref, ...rest } = register('name', { required: true, minLength: 8 });

  const onSubmit: SubmitHandler<UserUpdate> = async (data) => {
    const newUpdateUser = {
      ...data,
      born_date: formatDateToYYYYMMDD(data.born_date),
    };

    setIsLoading(true);
    const {
      isOk,
      error,
      data: updatedUser,
    } = await updateUser(newUpdateUser, auth.token);

    // console.log('updatedUser', updatedUser);

    if (isOk && updatedUser !== null) {
      const newUsers = users.data.map((user: UserDetail) => {
        if (user.id === initialValues.id) {
          return updatedUser.data;
        }
        return user;
      });
      mutateUser({ ...users, data: [...newUsers] });
      toast({
        title: 'User updated successfully.',
        description: `Yuhu you updated ${updatedUser.data.name}.`,
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
      <IconButton
        variant={'outline'}
        icon={<EditIcon />}
        aria-label="Edit user"
        colorScheme="blue"
        size={'sm'}
        border={'none'}
        onClick={onOpen}
      />

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
          <ModalHeader>Edit user</ModalHeader>
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

export default EditUserModal;

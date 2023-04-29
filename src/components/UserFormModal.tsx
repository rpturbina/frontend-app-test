import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import CustomInput from '@/components/CustomInput';
import CustomModal from '@/components/CustomModal';
import CustomRadioGroup from '@/components/CustomRadioGroup';
import DateInput from '@/components/DateInput';

import { useAuth } from '@/context/auth';
import useUser from '@/hooks/useUser';
import { createUser, updateUser } from '@/libs/api';
import { UserCreate, UserDetail, UserUpdate } from '@/types';
import { formatDateToDateAndTimeGMT7 } from '@/utils';
import { userCreateSchema, userUpdateSchema } from '@/validation/schema';

type UserFormModalProps = {
  children: (onOpen: () => void) => React.ReactNode;
  initialValues?: UserUpdate;
  isEditing?: boolean;
};

const UserFormModal = ({
  children,
  initialValues,
  isEditing = false,
}: UserFormModalProps) => {
  const auth = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { mutateUser, users } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const methods = useForm<UserCreate>({
    mode: 'onTouched',
    resolver: yupResolver(isEditing ? userUpdateSchema : userCreateSchema),
    defaultValues: isEditing ? initialValues : {},
  });

  const initialRef = React.useRef<HTMLInputElement | null>(null);
  const finalRef = React.useRef(null);

  const onAddSubmit: SubmitHandler<UserCreate> = async (data) => {
    const newUser = {
      ...data,
      created_at: formatDateToDateAndTimeGMT7(new Date().toISOString()),
    };
    setIsLoading(true);
    const {
      isOk,
      error,
      data: createdUser,
    } = await createUser(newUser, auth.token);

    if (isOk && createdUser !== null) {
      await mutateUser({ ...users, data: [...users.data, createdUser.data] });
      toast({
        title: 'User created successfully.',
        description: 'Yuhu you created a new user.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
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

  React.useEffect(() => {
    if (methods.formState.isSubmitSuccessful) methods.reset(initialValues);
  }, [methods.formState.isSubmitSuccessful]);

  const onEditSubmit: SubmitHandler<UserUpdate> = async (data) => {
    setIsLoading(true);
    const {
      isOk,
      error,
      data: updatedUser,
    } = await updateUser(data, auth.token);

    if (isOk && updatedUser !== null && initialValues !== undefined) {
      const newUsers = users.data.map((user: UserDetail) => {
        if (user.id === initialValues.id) {
          return updatedUser.data;
        }
        return user;
      });
      await mutateUser({ ...users, data: newUsers });
      toast({
        title: 'User updated successfully.',
        description: `Yuhu you updated ${updatedUser.data.name}.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
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
    <CustomModal
      openTrigger={(onOpen) => children(onOpen)}
      initialRef={initialRef}
      onClose={onClose}
      onOpen={onOpen}
      isOpen={isOpen}
      finalRef={finalRef}
    >
      <ModalHeader>{isEditing ? 'Edit user' : 'Tambahkan user'}</ModalHeader>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(
            isEditing ? onEditSubmit : onAddSubmit
          )}
        >
          <ModalBody pb={6}>
            <CustomInput id="name" label="Nama" placeholder="Nama" />
            <CustomInput id="address" label="Alamat" placeholder="Alamat" />
            <CustomRadioGroup
              id="gender"
              label="L/P"
              defaultValue={isEditing ? methods.getValues('gender') : 'l'}
              options={[
                { value: 'l', label: 'Laki-laki' },
                { value: 'p', label: 'Perempuan' },
              ]}
            />
            <DateInput
              label="Tanggal lahir"
              id="born_date"
              placeholder="Pilih tanggal lahir"
            />
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
              loadingText="Saving"
              isDisabled={!methods.formState.isValid}
            >
              Save
            </Button>
            <Button
              isDisabled={isLoading}
              onClick={onClose}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </FormProvider>
    </CustomModal>
  );
};

export default UserFormModal;

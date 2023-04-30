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

import userApi from '@/apis/userApi';
import useUser from '@/hooks/useUser';
import { UserCreate } from '@/types';
import { formatDateToDateAndTimeGMT7 } from '@/utils';
import { userCreateSchema } from '@/validation/schema';

type AddUserFormModalProps = {
  children: (onOpen: () => void) => React.ReactNode;
};

const UserFormModal = ({ children }: AddUserFormModalProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { mutateUser, users } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const methods = useForm<UserCreate>({
    mode: 'onTouched',
    resolver: yupResolver(userCreateSchema),
  });

  const initialRef = React.useRef<HTMLInputElement | null>(null);
  const finalRef = React.useRef(null);

  const onSubmit: SubmitHandler<UserCreate> = async (data) => {
    const newUser = {
      ...data,
      created_at: formatDateToDateAndTimeGMT7(new Date().toISOString()),
    };
    setIsLoading(true);
    const {
      success,
      error,
      data: createdUser,
    } = await userApi.createUser(newUser);

    if (success && createdUser !== null) {
      await mutateUser({
        ...users,
        data: [...users.data, createdUser],
        success: true,
      });
      toast({
        title: 'User created successfully.',
        description: 'Yuhu you created a new user.',
        status: 'success',
      });
      onClose();
    }

    if (!success) {
      toast({
        title: 'An error occurred. Please try again later.',
        description: error,
        status: 'error',
      });
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (methods.formState.isSubmitSuccessful) methods.reset();
  }, [methods.formState.isSubmitSuccessful]);

  return (
    <CustomModal
      openTrigger={(onOpen) => children(onOpen)}
      initialRef={initialRef}
      onClose={onClose}
      onOpen={onOpen}
      isOpen={isOpen}
      finalRef={finalRef}
    >
      <ModalHeader>Tambahkan user</ModalHeader>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <CustomInput id="name" label="Nama" placeholder="Nama" />
            <CustomInput id="address" label="Alamat" placeholder="Alamat" />
            <CustomRadioGroup
              id="gender"
              label="L/P"
              defaultValue={'l'}
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

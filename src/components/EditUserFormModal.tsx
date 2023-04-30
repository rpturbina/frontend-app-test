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
import { UserDetail, UserUpdate } from '@/types';
import { userUpdateSchema } from '@/validation/schema';

type EditUserFormModalProps = {
  children: (onOpen: () => void) => React.ReactNode;
  initialValues: UserUpdate;
};

const UserFormModal = ({ children, initialValues }: EditUserFormModalProps) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const { mutateUser, users } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const methods = useForm<UserUpdate>({
    mode: 'onTouched',
    resolver: yupResolver(userUpdateSchema),
    defaultValues: initialValues,
  });

  const initialRef = React.useRef<HTMLInputElement | null>(null);
  const finalRef = React.useRef(null);

  React.useEffect(() => {
    if (methods.formState.isSubmitSuccessful) methods.reset(initialValues);
  }, [methods.formState.isSubmitSuccessful]);

  const onSubmit: SubmitHandler<UserUpdate> = async (data) => {
    if (initialValues === undefined) return;
    const newUserUpdate = {
      ...data,
      id: initialValues.id,
    };
    setIsLoading(true);
    const {
      success,
      error,
      data: updatedUser,
    } = await userApi.updateUser(newUserUpdate);

    if (success && updatedUser !== null && initialValues !== undefined) {
      const newUsers = users.data.map((user: UserDetail) => {
        if (user.id === initialValues.id) {
          return updatedUser;
        }
        return user;
      });
      await mutateUser({ ...users, data: newUsers, success: true });
      toast({
        title: 'User updated successfully.',
        description: `Yuhu you updated ${updatedUser.name}.`,
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

  return (
    <CustomModal
      openTrigger={(onOpen) => children(onOpen)}
      initialRef={initialRef}
      onClose={() => {
        onClose();
        methods.reset();
      }}
      onOpen={onOpen}
      isOpen={isOpen}
      finalRef={finalRef}
    >
      <ModalHeader>Edit user</ModalHeader>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <CustomInput id="name" label="Nama" placeholder="Nama" />
            <CustomInput id="address" label="Alamat" placeholder="Alamat" />
            <CustomRadioGroup
              id="gender"
              label="L/P"
              defaultValue={methods.getValues('gender')}
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
              onClick={() => {
                onClose();
                methods.reset();
              }}
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

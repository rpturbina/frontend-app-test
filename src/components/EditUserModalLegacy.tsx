import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import CustomInput from '@/components/CustomInput';
import CustomRadioGroup from '@/components/CustomRadioGroup';
import DateInput from '@/components/DateInput';

import { useAuth } from '@/context/auth';
import useUser from '@/hooks/useUser';
import { updateUser } from '@/libs/api';
import { UserDetail, UserUpdate } from '@/types';
import { userUpdateSchema } from '@/validation/schema';

type EditUserModalProps = {
  initialValues: UserUpdate;
  children: (onOpen: () => void) => React.ReactNode;
};

const EditUserModal = ({ initialValues, children }: EditUserModalProps) => {
  const auth = useAuth();
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

  const onSubmit: SubmitHandler<UserUpdate> = async (data) => {
    setIsLoading(true);
    const {
      isOk,
      error,
      data: updatedUser,
    } = await updateUser(data, auth.token);

    if (isOk && updatedUser !== null) {
      const newUsers = users.data.map((user: UserDetail) => {
        if (user.id === initialValues.id) {
          return updatedUser.data;
        }
        return user;
      });
      mutateUser({ ...users, data: newUsers });
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
    <>
      {children(onOpen)}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          methods.reset();
        }}
      >
        <ModalOverlay />
        <FormProvider {...methods}>
          <ModalContent as={'form'} onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalHeader>Edit user</ModalHeader>
            <ModalCloseButton />
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
          </ModalContent>
        </FormProvider>
      </Modal>
    </>
  );
};

export default EditUserModal;

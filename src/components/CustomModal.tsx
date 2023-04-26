import * as React from 'react';

import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

type CustomModalProps = {
  openTrigger: (onOpen: () => void) => React.ReactNode;
  children: React.ReactNode;
  onOpen: () => void;
  initialRef: React.MutableRefObject<HTMLInputElement | null>;
  finalRef: React.MutableRefObject<null>;
  isOpen: boolean;
  onClose: () => void;
};

const CustomModal = ({
  openTrigger,
  children,
  onOpen,
  initialRef,
  finalRef,
  isOpen,
  onClose,
}: CustomModalProps) => {
  return (
    <>
      {openTrigger(onOpen)}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;

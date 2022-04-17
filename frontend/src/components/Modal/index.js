import React, { useState, useEffect } from "react";

import ModalStyle from "../styled/ModalStyle";
import ModalContent from "../styled/ModalContent";
import ModalBody from "../styled/ModalBody";
import ModalHeader from "../styled/ModalHeader";
import ModalFooter from "../styled/ModalFooter";
import Button from "../styled/Button";

const Modal = ({ showModal, children, toggleModal, title }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    toggleModal(false);
  };

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  return (
    <ModalStyle visible={show}>
      <ModalContent sx={6} lg={6}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button primary onClick={handleClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalStyle>
  );
};

export default Modal;

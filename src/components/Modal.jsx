import React, { createContext, useContext, useEffect } from "react";
import { css, styled } from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      transition: transform 0.5s ease;
      transform: translateY(-100%);
      background-color: transparent;
    `};
`;

const ModalWrapper = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    margin: 25px auto;
    ${({ $isOpen }) => !$isOpen && css`
        transition: transform 0.5s ease;
        transform: translateY(-100%);
        background-color: transparent;
    `};
`;

const ModalContent = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    // height:90vh;
    width: 60%;
    min-width: 400px;

    ${({ $isOpen }) =>
        $isOpen
        ? css`
            transition: transform 0.5s ease;
            transform: translateY(0%);
            `
        : css`
            transition: transform 0.5s ease;
            transform: translateY(-100%);
            opacity: 0.5;
            `};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 0.3rem;
    ::-webkit-scrollbar {
        display: none;
    }

    margin: 0 15px;

    @media (max-width: 900px) {
        width: 100%;
        min-width: auto;
    }

`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 1rem;
`;

const ModalTitle = styled.h3`
  font-weight: 700;
  font-size: 25px;
  color: black;
`;

const ModalButton = styled.button`
  cursor: pointer;
  padding: 6px 12px;
  background-color: var(--primary-color);
  border: none;
  color: white;
  &:hover {
    background-color: var(--primary-color-hover);
  }
  font-size: 14px;
  font-weight: 400;
  border-radius: 4px;
`;

const ModalBody = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 1rem;
  min-height: 200px;
  max-height: 70vh;
  overflow: auto;
`;
const ModalFooter = styled.div`
  display:flex;
  justify-content:end;
  gap:8px;
  padding: 1rem;
`;

const CancelButton = styled.button`
  padding: 18px 35px;
  display:flex;
  justify-content:center;
  align-items:center;
  border: 1px solid;
  background-color: white; 
  // width:100%;
  height:30px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  color: black; 
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #dbdbdb; 
  }

  // &:focus {
  //   outline: none;
  //   box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.5); 
  // }

  &:disabled {
    background-color: #c6c6c6;
    cursor: auto;
  }
`

const ModalContext = createContext();

function Modal({ children, $isOpen, setOpenModal, onClose = () => {} }) {
  const onModalClose = () => {
    setOpenModal(false);
    onClose() && onClose();
  };

  useEffect(() => {
    if ($isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [$isOpen]);

  return (
    <ModalOverlay $isOpen={$isOpen} onClick={onModalClose}>
      <ModalWrapper $isOpen={$isOpen}>
        <ModalContent $isOpen={$isOpen} onClick={(e) => e.stopPropagation()}>
          <ModalContext.Provider value={onModalClose}>
            {children}
          </ModalContext.Provider>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
}

const Header = ({ children, setOpenModal }) => {
  return (
    <ModalHeader>
      <ModalTitle>{children}</ModalTitle>
      <ModalButton onClick={() => setOpenModal(false)}>X</ModalButton>
    </ModalHeader>
  );
};

const BodyModal = ({ children }) => {
  return <ModalBody>{children}</ModalBody>;
};

const Footer = ({ children, onClick }) => {
  return <ModalFooter>
          <CancelButton  onClick={onClick}>Cancel</CancelButton>
          {children}
        </ModalFooter>;
};

Modal.Header = Header;
Modal.Body = BodyModal;
Modal.Footer = Footer;

export default Modal;

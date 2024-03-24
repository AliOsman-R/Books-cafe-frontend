import React from 'react';
import styled from 'styled-components';

export const PrimaryButton = styled.button`
  padding: 6px 35px;
  display:flex;
  justify-content:center;
  align-items:center;
  border: none;
  background-color: var(--primary-color); 
  // width:100%;
  height:48px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #fff; 
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: var(--primary-color-hover); 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.5); 
  }

  &:disabled {
    background-color: #c6c6c6;
    cursor: auto;
  }
`;


export const SecondaryButton = styled.button`
  padding: 12px 20px;
  display:flex;
  justify-content:center;
  align-items:center;
  border: none;
  background-color: var(--secondary-color); 
  // width:100%;
  // height:48px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  color: black; 
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: var(--secondary-color-hover); 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.5); 
  }

  &:disabled {
    background-color: #c6c6c6;
    cursor: auto;
  }
`;


export const TertiaryButton = styled.button`
  padding: 6px 24px; 
  border: 2px solid var(--primary-color); 
  color: var(--primary-color); 
  background-color: transparent; 
  border-radius: 9999px; 
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 170px; 
  height: 43px; 
  transition: all 0.3s ease-in-out; 

  &:hover {
    background-color: var(--primary-color); 
    color: #ffffff;
  }

  &:disabled {
    background-color: #c6c6c6;
    border-color: #c6c6c6; 
    cursor: auto;
  }
`;

export const linkStyle = 'text-primaryColor font-semibold hover:text-primaryColorHover transition duration-200 ease-in-out'



const Buttons = () => {
  return (
    <div>
      <PrimaryButton>Button</PrimaryButton>
    </div>
  );
};

export default Buttons;
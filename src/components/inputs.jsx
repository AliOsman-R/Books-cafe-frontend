import React from "react";
import styled, { css } from "styled-components";

export const inputStyle =
  "py-[12px] px-[15px] bg-white border border-[#cacaca] rounded-[8px] text-[16px] disabled:bg-[#eee] text-black";

export const PrimaryInput = styled.input`
  padding: 12px 15px;
  background-color: #fff;
  border: 1px solid #cacaca;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    // border-color: #cd8c42;
    background-color: #fff;
    box-shadow: 0 0 0 2px #f59e0b;
  }

  &::placeholder {
    color: #6c757d;
  }

  &:disabled {
    background-color: #eee;
  }
`;

export const TextareaInput = styled.textarea`
  background-color: #fff;
  border: 1px solid #cacaca;
  padding: 12px 15px;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  &:focus {
    outline: none;
    // border-color: #cd8c42;
    background-color: #fff;
    box-shadow: 0 0 0 2px #f59e0b;
  }

  &::placeholder {
    color: #6c757d;
  }

  &:disabled {
    background-color: #eee;
  }
`;
//f5f5f5
const labelStyles = css`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #343a40;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const StyledLabel = styled.label`
  ${labelStyles}
`;

export const phoneInputStyle = {
  width: "100%",
  borderRadius: "8px",
  padding: "12px 50px",
};

export const Container = ({ children, labelName, ...restProps }) => {
  return (
    <InputContainer>
      <StyledLabel {...restProps}>{labelName}</StyledLabel>
      {children}
    </InputContainer>
  );
};

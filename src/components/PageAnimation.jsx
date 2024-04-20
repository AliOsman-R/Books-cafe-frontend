import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { keyframes, styled } from 'styled-components'
import { MdOutlineArrowBack } from 'react-icons/md'
import Header from '../layout/Header';

const slideInOut = keyframes`
  from {
      bottom: -100%;
      opacity: 1;
  }
  to {
      bottom: 0;
      opacity: 1;
  }
`

const PageAnimationStyle = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  animation: ${slideInOut} 0.4s ease-in-out;
  z-index: 1100;
  overflow-y: auto;
`

const PageButton = styled.span`
  position:absolute;
  z-index:1000;
  right:0;
  padding:8px 15px;
  margin:5px;
  color:white;
  font-weight:bold;
  cursor:pointer;
  border-radius:100px;
  background-color: black;
  border: 3px solid red; 
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &:hover {
    background-color: red; 
    color: #ffffff;
  }
`
const PageContent = styled.div`
  background-color: var(--primary-color);
  padding:5px;
  padding-left:10px;
`;
function PageAnimation({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <PageAnimationStyle >
      {/* <Header/> */}
      {/* <PageContent> */}
      <PageButton onClick={() => navigate(-1)}>X</PageButton>
      {/* </PageContent> */}
      {children}
    </PageAnimationStyle>
  )
}

export default PageAnimation
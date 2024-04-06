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
  animation: ${slideInOut} 0.6s ease-in-out;
  z-index: 1100;
  overflow-y: auto;
`

const PageButton = styled.span`
  position:absolute;
  z-index:1000;
  color:white;
  cursor:pointer;
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
      <PageButton onClick={() => navigate(-1)}><MdOutlineArrowBack size={35} /></PageButton>
      {/* </PageContent> */}
      {children}
    </PageAnimationStyle>
  )
}

export default PageAnimation
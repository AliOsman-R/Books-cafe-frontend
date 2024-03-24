import FadeLoader from 'react-spinners/FadeLoader' 
import PuffLoader from 'react-spinners/PuffLoader' 

export const AppLoader = () => {
    return  <FadeLoader color="#cd8c42" />
}


export const BtnLoader = ({colorBtn}) => {
    return  <PuffLoader  size={45} color={colorBtn? colorBtn : 'white'} />
}